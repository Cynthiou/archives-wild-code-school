/**
 * Connexion à Odyssey.
 *
 * Principe, volontairement simple et sûr :
 *   1. le programme ouvre un vrai navigateur ;
 *   2. TU te connectes toi-même, normalement ;
 *   3. le programme lit le jeton de session que le site a déposé dans un cookie,
 *      exactement celui que l'application Odyssey utilise elle-même ;
 *   4. dès qu'il l'a, il referme la fenêtre tout seul.
 *
 * Aucun mot de passe n'est jamais demandé, lu, ni stocké par ce programme.
 * Le profil du navigateur est conservé dans .navigateur/ : à partir de la
 * deuxième exécution, la connexion est reconnue immédiatement et la fenêtre
 * se referme aussitôt.
 */

import path from "node:path";
import { chromium, type BrowserContext } from "playwright-core";

const DOMAINE_APP = "https://odyssey.wildcodeschool.com";
const NOM_COOKIE = "_odyssey_api";

export interface Session {
  jeton: string;
  fermer: () => Promise<void>;
}

/** Erreur volontairement parlante, destinée à être affichée telle quelle. */
export class FenetreFermee extends Error {
  constructor() {
    super(
      "La fenêtre du navigateur a été fermée avant que la connexion soit détectée.\n" +
        "  Relance la commande, connecte-toi, puis LAISSE LA FENÊTRE OUVERTE :\n" +
        "  le programme la referme tout seul dès qu'il a ce qu'il lui faut.",
    );
    this.name = "FenetreFermee";
  }
}

export async function ouvrirSession(options: {
  dossierProfil: string;
  attenteMaxMinutes?: number;
  navigateurInstalle?: boolean;
}): Promise<Session> {
  const { dossierProfil, attenteMaxMinutes = 15, navigateurInstalle = true } = options;

  // On réutilise un navigateur DÉJÀ installé sur la machine : rien de lourd à télécharger.
  // Chrome d'abord, puis Edge (présent sur tout Windows) si Chrome est absent.
  const canaux = navigateurInstalle ? ["chrome", "msedge"] : [];
  let contexte: BrowserContext | null = null;
  let derniereErreur: unknown;

  for (const canal of canaux.length ? canaux : [null]) {
    try {
      contexte = await chromium.launchPersistentContext(path.resolve(dossierProfil), {
        headless: false,
        ...(canal ? { channel: canal } : {}),
        ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}),
        viewport: { width: 1280, height: 900 },
        args: ["--disable-blink-features=AutomationControlled"],
      });
      break;
    } catch (e) {
      derniereErreur = e;
    }
  }

  if (!contexte) {
    throw new Error(
      "Impossible d'ouvrir un navigateur. Chrome ou Edge doit être installé sur la machine.\n" +
        `  Détail : ${derniereErreur instanceof Error ? derniereErreur.message : derniereErreur}`,
    );
  }

  // On sait à tout moment si la fenêtre a été fermée, pour ne pas planter dessus.
  let fenetreFermee = false;
  contexte.on("close", () => {
    fenetreFermee = true;
  });

  /** Lit le jeton sans jamais lever d'exception si la fenêtre vient de se fermer. */
  const lireJeton = async (): Promise<string | null> => {
    if (fenetreFermee) return null;
    try {
      const cookies = await contexte!.cookies();
      const c = cookies.find((k) => k.name === NOM_COOKIE && k.value);
      return c ? c.value : null;
    } catch {
      fenetreFermee = true;
      return null;
    }
  };

  const fermerContexte = async () => {
    if (!fenetreFermee) await contexte!.close().catch(() => {});
    fenetreFermee = true;
  };

  try {
    const page = contexte.pages()[0] ?? (await contexte.newPage());
    await page.goto(`${DOMAINE_APP}/quests`, { waitUntil: "domcontentloaded" }).catch(() => {});
  } catch {
    /* si la page ne s'ouvre pas, l'attente ci-dessous s'en chargera */
  }

  // Peut-être la session est-elle déjà valide (profil conservé d'une fois sur l'autre).
  let jeton = await lireJeton();

  if (!jeton && !fenetreFermee) {
    console.log("");
    console.log("  ┌──────────────────────────────────────────────────────────────┐");
    console.log("  │  Une fenêtre de navigateur vient de s'ouvrir.                 │");
    console.log("  │                                                              │");
    console.log("  │  1. Connecte-toi à Odyssey comme d'habitude.                  │");
    console.log("  │  2. NE FERME PAS la fenêtre : le programme s'en charge.       │");
    console.log("  │                                                              │");
    console.log("  │  Il reprend tout seul dans les secondes qui suivent.          │");
    console.log("  └──────────────────────────────────────────────────────────────┘");
    console.log("");
    process.stdout.write("  En attente de ta connexion");
  }

  const limite = Date.now() + attenteMaxMinutes * 60_000;
  let tics = 0;

  while (!jeton && !fenetreFermee && Date.now() < limite) {
    await new Promise((r) => setTimeout(r, 1500));
    jeton = await lireJeton();
    if (++tics % 8 === 0) process.stdout.write("."); // un point toutes les 12 s
  }

  if (jeton) {
    // On a ce qu'il faut : la fenêtre n'a plus aucune raison de rester ouverte.
    await fermerContexte();
    console.log("\n       Connexion détectée, fenêtre refermée.");
    return { jeton, fermer: async () => {} };
  }

  if (fenetreFermee) throw new FenetreFermee();

  await fermerContexte();
  throw new Error(
    `Connexion non détectée après ${attenteMaxMinutes} minutes.\n` +
      "  Relance la commande et connecte-toi dans la fenêtre qui s'ouvre.",
  );
}
