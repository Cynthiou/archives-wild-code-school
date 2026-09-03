/**
 * Phase 1 — Extraction.
 *
 * Parcourt les quêtes une par une, enregistre le Markdown d'origine et les
 * métadonnées dans archive/, télécharge les images dans site/, et inscrit
 * chaque quête terminée dans le manifeste.
 *
 * Règles de conduite :
 *  - une erreur sur une quête n'interrompt jamais les suivantes ;
 *  - une quête déjà inscrite au manifeste est sautée (reprise après arrêt) ;
 *  - on reste poli avec le serveur : une pause entre chaque quête.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { ApiOdyssey, pause, type Quete, type Theme } from "./api.js";
import { releverImages } from "./markdown.js";
import { telechargerImages } from "./media.js";
import { slugify, numero } from "./slug.js";
import { Journal, sauverManifeste, type Manifeste, type EntreeQuete } from "./journal.js";

export interface Emplacements {
  base: string;
  archive: string;
  site: string;
  manifeste: string;
}

export function emplacements(base: string): Emplacements {
  return {
    base,
    archive: path.join(base, "archive"),
    site: path.join(base, "site"),
    manifeste: path.join(base, "archive", "manifest.json"),
  };
}

/** Ordonne les quêtes d'un thème : les numérotées d'abord, dans l'ordre. */
export function trierQuetes(a: Quete, b: Quete): number {
  const num = (s: string) => {
    const m = s.replace(/^[^\p{L}\p{N}]+/u, "").match(/^(\d+)(?:\.(\d+))?/);
    return m ? parseFloat(`${m[1]}.${m[2] ?? 0}`) : Number.POSITIVE_INFINITY;
  };
  const na = num(a.titre);
  const nb = num(b.titre);
  if (na !== nb) return na - nb;
  return a.titre.localeCompare(b.titre, "fr");
}

export interface PlanQuete extends Quete {
  rang: number;
  slugTheme: string;
  slugQuete: string;
  dossierRelatif: string;
}

/** Décide de l'organisation en dossiers, une fois pour toutes. */
export function planifier(quetes: Quete[], themes: Theme[]): PlanQuete[] {
  const nomTheme = new Map(themes.map((t) => [t.id, t.nom]));
  const parTheme = new Map<number, Quete[]>();
  for (const q of quetes) {
    const liste = parTheme.get(q.themeId) ?? [];
    liste.push(q);
    parTheme.set(q.themeId, liste);
  }

  const plan: PlanQuete[] = [];
  for (const [themeId, liste] of parTheme) {
    const slugTheme = slugify(nomTheme.get(themeId) ?? liste[0]?.themeNom ?? "sans-theme");
    liste.sort(trierQuetes).forEach((q, i) => {
      const slugQuete = `${numero(i + 1)}-${slugify(q.titre)}`;
      plan.push({
        ...q,
        rang: i + 1,
        slugTheme,
        slugQuete,
        dossierRelatif: `${slugTheme}/${slugQuete}`,
      });
    });
  }
  return plan;
}

export async function archiver(options: {
  api: ApiOdyssey;
  plan: PlanQuete[];
  lieux: Emplacements;
  manifeste: Manifeste;
  journal: Journal;
  pauseEntreQuetesMs?: number;
  concurrenceImages?: number;
  forcer?: boolean;
}): Promise<{ traitees: number; sautees: number; echecs: number }> {
  const {
    api,
    plan,
    lieux,
    manifeste,
    journal,
    pauseEntreQuetesMs = 350,
    concurrenceImages = 4,
    forcer = false,
  } = options;

  let traitees = 0;
  let sautees = 0;
  let echecs = 0;

  for (const [index, q] of plan.entries()) {
    const cle = String(q.id);
    const dejaFait = manifeste.quetes[cle];

    if (dejaFait && dejaFait.statut === "ok" && !forcer) {
      sautees++;
      continue;
    }

    const position = `${String(index + 1).padStart(3, " ")}/${plan.length}`;
    process.stdout.write(`  ${position}  ${q.titre.slice(0, 58).padEnd(58)} `);

    try {
      // --- Contenu de la quête ------------------------------------------
      const detail = await api.detailQuete(q.id);
      const ressources = await api.ressourcesQuete(q.id);
      const markdown = detail.chapitres
        .filter((c) => c.markdown.trim())
        .map((c) => c.markdown)
        .join("\n\n");

      // --- Archive brute (le Markdown d'origine, intact) -----------------
      const dossierArchive = path.join(lieux.archive, "quests", cle);
      await fs.mkdir(dossierArchive, { recursive: true });
      await fs.writeFile(path.join(dossierArchive, "cours.md"), markdown, "utf8");
      await fs.writeFile(
        path.join(dossierArchive, "quest.json"),
        JSON.stringify(
          {
            id: detail.id,
            titre: detail.titre,
            titres: detail.titres,
            theme: detail.theme,
            creeLe: detail.creeLe,
            difficulte: detail.difficulte,
            dureeEstimee: detail.dureeEstimee,
            modeValidation: detail.modeValidation,
            chapitres: detail.chapitres.map((c) => ({
              id: c.id,
              type: c.type,
              langue: c.langue,
              majLe: c.majLe,
              caracteres: c.markdown.length,
            })),
            ressources,
            urlOrigine: `https://odyssey.wildcodeschool.com/quests/${detail.id}`,
            archiveLe: new Date().toISOString(),
          },
          null,
          2,
        ),
        "utf8",
      );

      // --- Images -------------------------------------------------------
      const dossierQuete = path.join(lieux.site, q.dossierRelatif);
      await fs.mkdir(dossierQuete, { recursive: true });

      const images = releverImages(markdown);
      const { resultats, correspondances } = await telechargerImages(
        images,
        markdown,
        path.join(dossierQuete, "images"),
        { concurrence: concurrenceImages, tentatives: 3, delaiMs: 120 },
      );

      const imagesEchouees = resultats
        .filter((r) => r.erreur)
        .map((r) => ({ url: r.urlOrigine, erreur: r.erreur! }));

      // --- Markdown réécrit vers les images locales ---------------------
      let markdownLocal = markdown;
      for (const [url, chemin] of correspondances) {
        markdownLocal = markdownLocal.split(url).join(chemin);
      }
      await fs.writeFile(path.join(dossierQuete, "cours.md"), markdownLocal, "utf8");

      const entree: EntreeQuete = {
        id: q.id,
        titre: q.titre,
        theme: q.themeNom,
        dossier: q.dossierRelatif,
        urlOrigine: `https://odyssey.wildcodeschool.com/quests/${q.id}`,
        archiveLe: new Date().toISOString(),
        statut: imagesEchouees.length ? "partiel" : "ok",
        nbImages: correspondances.size,
        imagesEchouees,
      };
      manifeste.quetes[cle] = entree;
      await sauverManifeste(lieux.manifeste, manifeste);

      traitees++;
      const marque = imagesEchouees.length ? "~" : "ok";
      console.log(`${marque}  ${correspondances.size} img`);
      await journal.succes(
        `Quête ${q.id} « ${q.titre} » — ${correspondances.size} image(s)` +
          (imagesEchouees.length ? `, ${imagesEchouees.length} échec(s)` : ""),
      );
      for (const im of imagesEchouees) {
        await journal.alerte(`  image non récupérée (quête ${q.id}) : ${im.url} → ${im.erreur}`);
      }
    } catch (e) {
      echecs++;
      const message = e instanceof Error ? e.message : String(e);
      console.log(`ÉCHEC  ${message.slice(0, 40)}`);
      await journal.erreur(`Quête ${q.id} « ${q.titre} » : ${message}`);

      manifeste.quetes[cle] = {
        id: q.id,
        titre: q.titre,
        theme: q.themeNom,
        dossier: q.dossierRelatif,
        urlOrigine: `https://odyssey.wildcodeschool.com/quests/${q.id}`,
        archiveLe: new Date().toISOString(),
        statut: "echec",
        nbImages: 0,
        imagesEchouees: [],
        erreur: message,
      };
      await sauverManifeste(lieux.manifeste, manifeste);

      // Une session expirée ne se répare pas en insistant : on s'arrête proprement.
      if (message.startsWith("Session expirée")) throw e;
    }

    await pause(pauseEntreQuetesMs);
  }

  await journal.vider();
  return { traitees, sautees, echecs };
}
