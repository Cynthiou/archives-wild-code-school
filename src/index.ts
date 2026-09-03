/**
 * Point d'entrée — c'est ce fichier qui s'exécute quand tu tapes `npm start`.
 *
 * Déroulé :
 *   1. ouverture d'un navigateur pour que tu te connectes toi-même ;
 *   2. lecture de la liste de tes quêtes ;
 *   3. extraction quête par quête (Markdown + images), avec reprise possible ;
 *   4. génération du site consultable hors ligne ;
 *   5. inventaire des replays vidéo.
 *
 * Options (facultatives) :
 *   npm start -- --site-seulement     régénère le site sans rien retélécharger
 *   npm start -- --limite=5           n'extrait que les 5 premières quêtes (test)
 *   npm start -- --forcer             réextrait même ce qui est déjà archivé
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { ouvrirSession } from "./auth.js";
import { ApiOdyssey } from "./api.js";
import { Journal, chargerManifeste, sauverManifeste } from "./journal.js";
import { emplacements, planifier, archiver } from "./archiver.js";
import { telechargerFichier } from "./media.js";
import { slugify } from "./slug.js";
import { genererSite } from "./generateur.js";

const RACINE_OUTIL = path.resolve(import.meta.dirname, "..");

/** Le dossier où tout est écrit : par défaut, celui qui contient l'outil. */
const BASE = process.env.DOSSIER_ARCHIVE
  ? path.resolve(process.env.DOSSIER_ARCHIVE)
  : RACINE_OUTIL;

function lireOption(nom: string): string | boolean | undefined {
  const arg = process.argv.slice(2).find((a) => a === `--${nom}` || a.startsWith(`--${nom}=`));
  if (!arg) return undefined;
  const eq = arg.indexOf("=");
  return eq === -1 ? true : arg.slice(eq + 1);
}

function duree(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  return `${m} min ${String(s % 60).padStart(2, "0")} s`;
}

async function main() {
  const debut = Date.now();
  const lieux = emplacements(BASE);
  const journal = new Journal(path.join(BASE, "logs", "archive.log"));

  const siteSeulement = Boolean(lireOption("site-seulement"));
  const forcer = Boolean(lireOption("forcer"));
  const limiteBrute = lireOption("limite");
  const limite = typeof limiteBrute === "string" ? parseInt(limiteBrute, 10) : undefined;

  console.log("");
  console.log("  ARCHIVAGE DES QUÊTES WILD CODE SCHOOL");
  console.log("  " + "─".repeat(52));
  console.log(`  Dossier : ${BASE}`);
  console.log("");

  await journal.info("=== Démarrage ===");

  // ---------------------------------------------------------------------
  // Mode « site seulement » : on régénère les pages depuis ce qui est déjà là.
  // ---------------------------------------------------------------------
  if (siteSeulement) {
    const manifeste = await chargerManifeste(lieux.manifeste, "");
    const nb = Object.keys(manifeste.quetes).length;
    if (!nb) {
      console.log("  Rien à générer : aucune quête n'a encore été extraite.");
      console.log("  Lance d'abord : npm start");
      return;
    }
    console.log(`  Régénération du site à partir de ${nb} quête(s) déjà archivée(s)...`);
    const r = await genererSite({ lieux, manifeste, journal, racineOutil: RACINE_OUTIL });
    await journal.vider();
    console.log(`\n  ${r.pages} pages générées, ${r.themes} thèmes, ${r.diagrammes} diagramme(s).`);
    console.log(`  Ouvre : ${path.join(lieux.site, "index.html")}\n`);
    return;
  }

  // ---------------------------------------------------------------------
  // 1. Connexion
  // ---------------------------------------------------------------------
  console.log("  1/5  Connexion");
  const session = await ouvrirSession({ dossierProfil: path.join(BASE, ".navigateur") });

  try {
    const api = new ApiOdyssey(session.jeton);
    const compte = await api.verifier();
    console.log(`       Connectée : ${compte}`);
    await journal.info(`Session ouverte pour ${compte}`);

    // -------------------------------------------------------------------
    // 2. Catalogue
    // -------------------------------------------------------------------
    console.log("\n  2/5  Lecture du catalogue");
    const [themes, quetes] = await Promise.all([api.themes(), api.quetes()]);
    console.log(`       ${quetes.length} quêtes réparties en ${themes.length} thèmes`);
    await journal.info(`Catalogue : ${quetes.length} quêtes, ${themes.length} thèmes`);

    // On récupère aussi l'icône de chaque thème : c'est ce qui donne au site
    // l'allure de la plateforme d'origine. Une icône manquante n'est pas grave.
    const dossierIcones = path.join(lieux.site, "assets", "themes");
    const fiches = [];
    let icones = 0;
    for (const t of themes) {
      let icone: string | null = null;
      if (t.iconeUrl) {
        icone = await telechargerFichier(t.iconeUrl, dossierIcones, slugify(t.nom));
        if (icone) icones++;
      }
      fiches.push({
        slug: t.slug,
        nom: t.nom,
        description: t.description,
        couleur: t.couleur,
        icone: icone ? `assets/themes/${icone}` : null,
      });
    }
    console.log(`       ${icones} icônes de thèmes récupérées`);

    await fs.mkdir(lieux.archive, { recursive: true });
    await fs.writeFile(path.join(lieux.archive, "themes.json"), JSON.stringify(fiches, null, 2), "utf8");

    let plan = planifier(quetes, themes);
    if (limite && limite > 0) {
      plan = plan.slice(0, limite);
      console.log(`       (limité aux ${plan.length} premières quêtes)`);
    }

    const manifeste = await chargerManifeste(lieux.manifeste, compte);

    // -------------------------------------------------------------------
    // 3. Extraction
    // -------------------------------------------------------------------
    const dejaFaites = Object.values(manifeste.quetes).filter((e) => e.statut === "ok").length;
    console.log(`\n  3/5  Extraction des quêtes${dejaFaites ? ` (${dejaFaites} déjà archivées, elles seront sautées)` : ""}`);
    console.log("");

    const bilan = await archiver({ api, plan, lieux, manifeste, journal, forcer });

    console.log("");
    console.log(`       ${bilan.traitees} extraites · ${bilan.sautees} déjà à jour · ${bilan.echecs} en échec`);

    // -------------------------------------------------------------------
    // 4. Inventaire des replays (sans téléchargement)
    // -------------------------------------------------------------------
    console.log("\n  4/5  Inventaire des replays vidéo");
    try {
      const replays = await api.replays();
      manifeste.replays.releveLe = new Date().toISOString();
      manifeste.replays.total = replays.length;
      await fs.writeFile(
        path.join(lieux.archive, "replays.json"),
        JSON.stringify(
          replays.map((v) => ({
            id: v.id,
            titre: v.titre,
            categorie: v.categorie,
            source: v.source,
            dureeMinutes: v.dureeMinutes,
            enregistreLe: v.enregistreLe,
            description: v.description,
            // On n'enregistre PAS l'URL : elle est signée et expire en une heure.
            telechargeable: v.source !== "youtube" && Boolean(v.urlTelechargement),
          })),
          null,
          2,
        ),
        "utf8",
      );
      const heures = Math.round(replays.reduce((s, v) => s + v.dureeMinutes, 0) / 60);
      const telechargeables = replays.filter((v) => v.source !== "youtube" && v.urlTelechargement).length;
      console.log(`       ${replays.length} replays inventoriés (~${heures} h), dont ${telechargeables} téléchargeables`);
      await journal.info(`Replays : ${replays.length} inventoriés, ${telechargeables} téléchargeables`);
    } catch (e) {
      console.log(`       inventaire impossible : ${e instanceof Error ? e.message : String(e)}`);
      await journal.alerte(`Inventaire des replays impossible : ${e}`);
    }

    await sauverManifeste(lieux.manifeste, manifeste);

    // -------------------------------------------------------------------
    // 5. Génération du site
    // -------------------------------------------------------------------
    console.log("\n  5/5  Génération du site");
    const r = await genererSite({ lieux, manifeste, journal, racineOutil: RACINE_OUTIL });
    console.log(`       ${r.pages} pages, ${r.themes} thèmes, ${r.diagrammes} diagramme(s) en SVG`);
    console.log(`       recherche locale indexée sur ${r.indexRecherche} quêtes`);
    console.log(`       ${r.sommaires} sommaires cliquables reconstitués`);

    // -------------------------------------------------------------------
    // Bilan
    // -------------------------------------------------------------------
    const entrees = Object.values(manifeste.quetes);
    const images = entrees.reduce((s, e) => s + e.nbImages, 0);
    const imagesRatees = entrees.reduce((s, e) => s + e.imagesEchouees.length, 0);
    const enEchec = entrees.filter((e) => e.statut === "echec");

    console.log("");
    console.log("  " + "─".repeat(52));
    console.log(`  Terminé en ${duree(Date.now() - debut)}`);
    console.log(`  ${entrees.filter((e) => e.statut !== "echec").length} quêtes archivées · ${images} images récupérées`);
    if (imagesRatees) console.log(`  ${imagesRatees} image(s) non récupérée(s) — détail dans logs/archive.log`);
    if (enEchec.length) {
      console.log(`  ${enEchec.length} quête(s) en échec — relance la commande pour réessayer :`);
      for (const e of enEchec.slice(0, 5)) console.log(`     · ${e.titre}`);
    }
    console.log("");
    console.log(`  Ouvre ton archive :  site\\index.html`);
    console.log("");

    await journal.info("=== Fin ===");
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
