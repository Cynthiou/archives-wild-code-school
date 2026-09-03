/**
 * Phase 2 — Génération du site.
 *
 * Lit ce qui a été archivé et fabrique les pages HTML : accueil, une page par
 * thème, une page par quête, avec navigation précédent/suivant.
 *
 * Cette phase ne touche pas au réseau : elle peut être relancée autant de fois
 * qu'on veut (par exemple après avoir modifié le style) sans rien retélécharger.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { creerRendu } from "./markdown.js";
import { pageQuete, pageCategorie, pageAccueil, type FicheQuete, type FicheCategorie } from "./site.js";
import { RenduMermaid, injecterDiagrammes, cheminMermaidParDefaut } from "./mermaid-prerender.js";
import type { Emplacements } from "./archiver.js";
import type { Manifeste } from "./journal.js";
import type { Journal } from "./journal.js";
import { slugify } from "./slug.js";
import { ecrireIndexRecherche } from "./recherche.js";
import { ajouterAncresEtSommaire } from "./sommaire.js";

export async function genererSite(options: {
  lieux: Emplacements;
  manifeste: Manifeste;
  journal: Journal;
  racineOutil: string;
  navigateurInstalle?: boolean;
}): Promise<{ pages: number; themes: number; diagrammes: number; indexRecherche: number; sommaires: number }> {
  const { lieux, manifeste, journal, racineOutil, navigateurInstalle = true } = options;

  // --- Regroupement par thème, dans l'ordre des dossiers ------------------
  const entrees = Object.values(manifeste.quetes).filter((e) => e.statut !== "echec");

  const parTheme = new Map<string, FicheQuete[]>();
  const nomTheme = new Map<string, string>();

  for (const e of entrees) {
    const slugTheme = e.dossier.split("/")[0];
    nomTheme.set(slugTheme, e.theme);
    const liste = parTheme.get(slugTheme) ?? [];
    liste.push({
      id: e.id,
      titre: e.titre,
      slugQuete: e.dossier.split("/")[1] ?? "",
      dossier: e.dossier,
      categorieSlug: slugTheme,
      categorieNom: e.theme,
      couleur: "",
      nbImages: e.nbImages,
      urlOrigine: e.urlOrigine,
      extraite: true,
    });
    parTheme.set(slugTheme, liste);
  }

  const categories: FicheCategorie[] = [...parTheme.entries()]
    .map(([slug, quetes]) => ({
      slug,
      nom: nomTheme.get(slug) ?? slug,
      description: "",
      couleur: "",
      quetes: quetes.sort((a, b) => a.dossier.localeCompare(b.dossier, "fr")),
    }))
    .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));

  // Description, couleur officielle et icône de chaque thème, relevées à l'extraction.
  try {
    const themes: {
      slug: string; nom: string; description: string; couleur?: string; icone?: string | null;
    }[] = JSON.parse(await fs.readFile(path.join(lieux.archive, "themes.json"), "utf8"));
    for (const t of themes) {
      const c = categories.find((c) => c.slug === slugify(t.nom));
      if (!c) continue;
      c.description = t.description;
      if (t.couleur) c.couleur = t.couleur;
      if (t.icone) c.icone = t.icone;
    }
  } catch {
    /* pas grave : le site s'affiche sans les descriptions ni les icônes */
  }

  // La couleur du thème descend sur chacune de ses quêtes.
  for (const c of categories) for (const q of c.quetes) q.couleur = c.couleur;

  // --- Index global pour les renvois entre quêtes -------------------------
  const parId = new Map<number, FicheQuete>();
  for (const c of categories) for (const q of c.quetes) parId.set(q.id, q);

  // --- Pages de quêtes ----------------------------------------------------
  const rendu = new RenduMermaid(cheminMermaidParDefaut(racineOutil), navigateurInstalle);
  let diagrammes = 0;
  let pages = 0;
  let sommaires = 0;

  for (const categorie of categories) {
    for (const [i, quete] of categorie.quetes.entries()) {
      try {
        const dossierQuete = path.join(lieux.site, quete.dossier);
        const markdownLocal = await fs.readFile(path.join(dossierQuete, "cours.md"), "utf8");

        const meta = JSON.parse(
          await fs.readFile(path.join(lieux.archive, "quests", String(quete.id), "quest.json"), "utf8"),
        );

        const md = creerRendu({
          lienVersQuete: (id) => {
            const cible = parId.get(id);
            return cible ? `../../${cible.dossier}/index.html` : null;
          },
        });

        let contenu = md.render(markdownLocal);

        // Ancres sur les titres + sommaire cliquable, comme le faisait la plateforme.
        const avecSommaire = ajouterAncresEtSommaire(contenu);
        contenu = avecSommaire.html;
        if (avecSommaire.sommaire) sommaires++;

        const diag = await injecterDiagrammes(contenu, rendu);
        contenu = diag.html;
        diagrammes += diag.rendus;
        if (diag.echecs) {
          await journal.alerte(`Quête ${quete.id} : ${diag.echecs} diagramme(s) non rendus, code conservé`);
        }

        await fs.writeFile(
          path.join(dossierQuete, "index.html"),
          pageQuete({
            quete,
            contenuHtml: contenu,
            ressources: meta.ressources ?? [],
            precedente: categorie.quetes[i - 1],
            suivante: categorie.quetes[i + 1],
            positionDansCategorie: i + 1,
            totalCategorie: categorie.quetes.length,
          }),
          "utf8",
        );
        pages++;
      } catch (e) {
        await journal.erreur(
          `Génération de la page de la quête ${quete.id} : ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  }

  await rendu.fermer();

  // --- Pages de thèmes et accueil ----------------------------------------
  for (const c of categories) {
    await fs.mkdir(path.join(lieux.site, c.slug), { recursive: true });
    await fs.writeFile(path.join(lieux.site, c.slug, "index.html"), pageCategorie(c), "utf8");
    pages++;
  }

  const totalImages = entrees.reduce((s, e) => s + e.nbImages, 0);
  await fs.writeFile(
    path.join(lieux.site, "index.html"),
    pageAccueil(categories, { quetes: entrees.length, images: totalImages }),
    "utf8",
  );
  pages++;

  // --- Index de recherche ---------------------------------------------------
  const toutesLesQuetes = categories.flatMap((c) =>
    c.quetes.map((q) => ({ titre: q.titre, theme: c.nom, dossier: q.dossier })),
  );
  const idx = await ecrireIndexRecherche(lieux.site, toutesLesQuetes);
  await journal.info(
    `Index de recherche : ${idx.entrees} quêtes, ${Math.round(idx.octets / 1024)} Ko`,
  );

  // --- Feuille de style -----------------------------------------------------
  await fs.mkdir(path.join(lieux.site, "assets"), { recursive: true });
  await fs.copyFile(
    path.join(racineOutil, "site-assets", "style.css"),
    path.join(lieux.site, "assets", "style.css"),
  );

  return { pages, themes: categories.length, diagrammes, indexRecherche: idx.entrees, sommaires };
}
