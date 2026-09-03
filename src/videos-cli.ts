/**
 * Commande dédiée aux replays vidéo.
 *
 *   npm run videos                          → mesure : combien pèsent les replays ?
 *   npm run videos -- --telecharger         → télécharge dans videos/ à côté du site
 *   npm run videos -- --telecharger --dossier="D:\\Replays WCS"
 *   npm run videos -- --telecharger --categorie=Masterclass
 *   npm run videos -- --telecharger --max-go=15
 *
 * La mesure ne télécharge rien : elle demande simplement leur poids aux serveurs.
 * C'est ce qu'il faut lancer en premier pour décider où stocker et combien prendre.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { ouvrirSession } from "./auth.js";
import { ApiOdyssey } from "./api.js";
import { Journal } from "./journal.js";
import { classer, mesurer, telecharger, formaterOctets, libelleCategorie } from "./videos.js";

const RACINE = path.resolve(import.meta.dirname, "..");

function option(nom: string): string | boolean | undefined {
  const arg = process.argv.slice(2).find((a) => a === `--${nom}` || a.startsWith(`--${nom}=`));
  if (!arg) return undefined;
  const eq = arg.indexOf("=");
  return eq === -1 ? true : arg.slice(eq + 1);
}

async function main() {
  const doitTelecharger = Boolean(option("telecharger"));
  const dossierBrut = option("dossier");
  const categorieVoulue = option("categorie");
  const maxGo = option("max-go");

  const destination =
    typeof dossierBrut === "string" && dossierBrut ? path.resolve(dossierBrut) : path.join(RACINE, "videos");

  const journal = new Journal(path.join(RACINE, "logs", "videos.log"));

  console.log("");
  console.log("  REPLAYS VIDÉO — WILD CODE SCHOOL");
  console.log("  " + "─".repeat(54));
  console.log("");

  console.log("  Connexion");
  const session = await ouvrirSession({ dossierProfil: path.join(RACINE, ".navigateur") });

  try {
    const api = new ApiOdyssey(session.jeton);
    const compte = await api.verifier();
    console.log(`       Connectée : ${compte}\n`);

    const replays = await api.replays();
    let fiches = classer(replays);
    const surYoutube = replays.filter((v) => v.source === "youtube").length;

    // Répartition par catégorie, toujours utile à voir
    const parCategorie = new Map<string, number>();
    for (const f of fiches) parCategorie.set(f.categorie, (parCategorie.get(f.categorie) ?? 0) + 1);

    console.log(`  ${replays.length} replays au total, dont ${fiches.length} téléchargeables`);
    if (surYoutube) console.log(`  (${surYoutube} sur YouTube : conservé comme lien, non téléchargé)`);
    console.log("");
    for (const [cat, n] of [...parCategorie].sort((a, b) => b[1] - a[1])) {
      console.log(`     ${String(n).padStart(3)}  ${cat}`);
    }
    console.log("");

    if (typeof categorieVoulue === "string" && categorieVoulue) {
      const avant = fiches.length;
      const voulue = categorieVoulue.toLowerCase();
      fiches = fiches.filter((f) => f.categorie.toLowerCase() === voulue);
      console.log(`  Filtre « ${categorieVoulue} » : ${fiches.length} vidéos retenues sur ${avant}\n`);
      if (!fiches.length) {
        console.log("  Aucune vidéo dans cette catégorie. Catégories disponibles ci-dessus.\n");
        return;
      }
    }

    // ---------------------------------------------------------------------
    // MESURE (toujours faite : elle sert aussi à savoir quoi sauter ensuite)
    // ---------------------------------------------------------------------
    console.log("  Mesure du poids réel (aucun téléchargement)…");
    const { total, inconnues } = await mesurer(fiches, (fait, sur) => {
      if (fait % 10 === 0 || fait === sur) process.stdout.write(`\r     ${fait}/${sur}`);
    });
    console.log("\n");

    const heures = Math.round(fiches.reduce((s, f) => s + f.video.dureeMinutes, 0) / 60);
    console.log(`  Poids total   : ${formaterOctets(total)}${inconnues ? ` (+ ${inconnues} de taille inconnue)` : ""}`);
    console.log(`  Durée totale  : environ ${heures} heures`);
    console.log(`  Moyenne       : ${formaterOctets(total / Math.max(1, fiches.length - inconnues))} par vidéo`);
    console.log("");

    // Récapitulatif par catégorie, avec le poids : c'est ce qui permet de choisir
    const poidsParCategorie = new Map<string, { n: number; octets: number }>();
    for (const f of fiches) {
      const e = poidsParCategorie.get(f.categorie) ?? { n: 0, octets: 0 };
      e.n++;
      e.octets += f.octets ?? 0;
      poidsParCategorie.set(f.categorie, e);
    }
    console.log("  Par catégorie :");
    for (const [cat, e] of [...poidsParCategorie].sort((a, b) => b[1].octets - a[1].octets)) {
      console.log(`     ${cat.padEnd(14)} ${String(e.n).padStart(3)} vidéos   ${formaterOctets(e.octets).padStart(9)}`);
    }
    console.log("");

    // Inventaire écrit sur disque, consultable sans relancer la commande
    await fs.mkdir(path.join(RACINE, "archive"), { recursive: true });
    await fs.writeFile(
      path.join(RACINE, "archive", "replays-mesures.json"),
      JSON.stringify(
        {
          mesureLe: new Date().toISOString(),
          totalOctets: total,
          videos: fiches.map((f) => ({
            id: f.video.id,
            titre: f.video.titre,
            categorie: f.categorie,
            date: f.video.enregistreLe,
            dureeMinutes: f.video.dureeMinutes,
            octets: f.octets ?? null,
            fichier: f.cheminRelatif,
          })),
        },
        null,
        2,
      ),
      "utf8",
    );
    console.log("  Inventaire détaillé écrit dans archive\\replays-mesures.json");

    if (!doitTelecharger) {
      console.log("");
      console.log("  " + "─".repeat(54));
      console.log("  Rien n'a été téléchargé : c'était une mesure.");
      console.log("  Pour lancer le téléchargement :");
      console.log("     npm run videos -- --telecharger");
      console.log("  En choisissant la destination :");
      console.log('     npm run videos -- --telecharger --dossier="D:\\\\Replays WCS"');
      console.log("  En limitant le volume :");
      console.log("     npm run videos -- --telecharger --max-go=15");
      console.log("");
      await journal.info(`Mesure : ${fiches.length} vidéos, ${formaterOctets(total)}`);
      await journal.vider();
      return;
    }

    // ---------------------------------------------------------------------
    // TÉLÉCHARGEMENT
    // ---------------------------------------------------------------------
    const budget = typeof maxGo === "string" ? Number(maxGo) * 1024 ** 3 : undefined;

    console.log("");
    console.log(`  Destination : ${destination}`);
    if (budget) console.log(`  Budget      : ${formaterOctets(budget)}`);
    console.log("");
    console.log("  Téléchargement (une vidéo à la fois, reprise possible à tout moment)");
    console.log("");

    const bilan = await telecharger({
      api,
      fiches,
      dossierDestination: destination,
      budgetOctets: budget,
      surAvancement: (m) => console.log(m),
    });

    console.log("");
    console.log("  " + "─".repeat(54));
    console.log(`  ${bilan.telechargees} téléchargées · ${bilan.sautees} déjà présentes · ${bilan.echecs.length} en échec`);
    console.log(`  Volume récupéré : ${formaterOctets(bilan.octets)}`);
    if (bilan.echecs.length) {
      console.log("");
      console.log("  Échecs (relancer la commande les retentera) :");
      for (const e of bilan.echecs.slice(0, 10)) console.log(`     · ${e.titre.slice(0, 55)} — ${e.erreur}`);
    }
    console.log("");

    await journal.info(
      `Téléchargement : ${bilan.telechargees} vidéos, ${formaterOctets(bilan.octets)}, ${bilan.echecs.length} échec(s)`,
    );
    for (const e of bilan.echecs) await journal.erreur(`Vidéo « ${e.titre} » : ${e.erreur}`);
    await journal.vider();
  } finally {
    await session.fermer();
  }
}

main().catch(async (e) => {
  const message = e instanceof Error ? e.message : String(e);
  console.error("");
  console.error("  Le programme s'est arrêté.");
  console.error("");
  for (const ligne of message.split("\n")) console.error("  " + ligne);
  console.error("");
  console.error("  Rien n'est perdu : relancer la commande reprend là où ça s'est arrêté.");
  console.error("");
  process.exit(1);
});
