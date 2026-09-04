/**
 * Génération du site statique.
 *
 * Le site produit est totalement autonome : une fois généré, il ne dépend plus
 * d'odyssey.wildcodeschool.com ni d'api.wildcodeschool.com. Toutes les images sont
 * des fichiers locaux et la coloration du code est calculée à la génération.
 *
 * Le seul JavaScript du site est celui de la recherche, embarqué dans la page
 * d'accueil. Sans lui, la navigation par thèmes fonctionne toujours.
 */

import { familleDuTheme, famillesOrdonnees } from "./familles.js";
import { SCRIPT_RECHERCHE } from "./recherche.js";

export interface FicheQuete {
  id: number;
  titre: string;
  slugQuete: string;
  dossier: string; // chemin relatif depuis la racine du site
  categorieSlug: string;
  categorieNom: string;
  couleur: string;
  nbImages: number;
  urlOrigine: string;
  /** false = repérée dans le catalogue mais pas encore extraite */
  extraite?: boolean;
}

export interface FicheCategorie {
  slug: string;
  nom: string;
  description: string;
  /** Couleur officielle du thème sur la plateforme. */
  couleur: string;
  /** Chemin relatif de l'icône du thème, si elle a pu être récupérée. */
  icone?: string | null;
  quetes: FicheQuete[];
}

/** Échappement HTML minimal pour les textes insérés dans les gabarits. */
export function e(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Squelette commun à toutes les pages.
 * `racine` est le chemin relatif vers la racine du site ("./", "../", "../../")
 * pour que le site fonctionne aussi bien en local (file://) qu'hébergé.
 */
export function page(options: {
  titre: string;
  racine: string;
  corps: string;
  filAriane?: { libelle: string; lien?: string }[];
  couleur?: string;
  scripts?: string;
  classeCorps?: string;
}): string {
  const { titre, racine, corps, filAriane = [], couleur, scripts = "", classeCorps = "" } = options;

  const ariane = filAriane.length
    ? `<nav class="ariane">${filAriane
        .map((f, i) =>
          f.lien
            ? `<a href="${f.lien}">${e(f.libelle)}</a>`
            : `<span aria-current="${i === filAriane.length - 1 ? "page" : "false"}">${e(f.libelle)}</span>`,
        )
        .join('<span class="ariane__sep">›</span>')}</nav>`
    : "";

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(titre)}</title>
<link rel="stylesheet" href="${racine}assets/style.css">
</head>
<body${classeCorps ? ` class="${classeCorps}"` : ""}${couleur ? ` style="--teinte:${e(couleur)}"` : ""}>
<header class="entete">
  <a class="entete__marque" href="${racine}index.html">Archives Wild Code School</a>
</header>
<main class="contenu">
${ariane}
${corps}
</main>
<footer class="pied">
  <p>Archive personnelle des cours suivis à la Wild Code School. Copie hors ligne à usage strictement privé.</p>
</footer>
${scripts}
<script src="${racine}assets/copie-code.js"></script>
<script src="${racine}assets/progression.js"></script>
</body>
</html>`;
}

/** Page d'une quête : le cours rendu, avec navigation précédent/suivant. */
export function pageQuete(options: {
  quete: FicheQuete;
  contenuHtml: string;
  ressources: { link: string; description: string }[];
  precedente?: FicheQuete;
  suivante?: FicheQuete;
  avecMermaid?: boolean;
  positionDansCategorie: number;
  totalCategorie: number;
}): string {
  const { quete, contenuHtml, ressources, precedente, suivante, positionDansCategorie, totalCategorie } =
    options;
  const racine = "../../";
  const famille = familleDuTheme(quete.categorieSlug);
  const teinte = quete.couleur || famille.couleur;

  const navBas = `
<nav class="nav-quete">
  ${
    precedente
      ? `<a class="nav-quete__lien nav-quete__lien--prec" href="${racine}${precedente.dossier}/index.html">
           <span class="nav-quete__sens">← Précédent</span>
           <span class="nav-quete__titre">${e(precedente.titre)}</span>
         </a>`
      : `<span class="nav-quete__lien nav-quete__lien--vide"></span>`
  }
  ${
    suivante
      ? `<a class="nav-quete__lien nav-quete__lien--suiv" href="${racine}${suivante.dossier}/index.html">
           <span class="nav-quete__sens">Suivant →</span>
           <span class="nav-quete__titre">${e(suivante.titre)}</span>
         </a>`
      : `<span class="nav-quete__lien nav-quete__lien--vide"></span>`
  }
</nav>`;

  const blocRessources = ressources.length
    ? `<section class="ressources-quete">
  <h2>Ressources partagées sur cette quête</h2>
  <ul class="ressources-liste">
    ${ressources
      .map(
        (r) =>
          `<li><a href="${e(r.link)}" target="_blank" rel="noopener noreferrer">${e(r.description || r.link)}</a>${r.description ? `<span class="ressources-liste__url">${e(r.link)}</span>` : ""}</li>`,
      )
      .join("\n    ")}
  </ul>
</section>`
    : "";

  const corps = `
<article class="quete">
  <header class="quete__entete">
    <a class="pastille pastille--teintee" href="${racine}${quete.categorieSlug}/index.html">${e(quete.categorieNom)}</a>
    <h1>${e(quete.titre)}</h1>
    <p class="quete__meta">Quête ${positionDansCategorie} sur ${totalCategorie}${quete.nbImages ? ` · ${quete.nbImages} image${quete.nbImages > 1 ? "s" : ""} archivée${quete.nbImages > 1 ? "s" : ""}` : ""}</p>
  </header>
  <div class="cours">
${contenuHtml}
  </div>
  ${blocRessources}
</article>
${navBas}`;

  return page({
    titre: `${quete.titre} — Archives WCS`,
    racine,
    corps,
    couleur: teinte,
    filAriane: [
      { libelle: "Accueil", lien: `${racine}index.html` },
      { libelle: quete.categorieNom, lien: `${racine}${quete.categorieSlug}/index.html` },
      { libelle: quete.titre },
    ],
  });
}

/** Page d'une catégorie : ses quêtes en grille de cartes. */
export function pageCategorie(categorie: FicheCategorie): string {
  const racine = "../";
  const famille = familleDuTheme(categorie.slug);
  const teinte = categorie.couleur || famille.couleur;
  const icone = categorie.icone
    ? `<img class="ic" src="${racine}${e(categorie.icone)}" alt="" width="22" height="22">`
    : "";

  const items = categorie.quetes
    .map((q) =>
      q.extraite === false
        ? `
    <li class="carte-quete carte-quete--attente">
      <span class="carte-quete__haut">${icone}<span class="carte-quete__titre">${e(q.titre)}</span></span>
      <span class="carte-quete__pied">à extraire</span>
    </li>`
        : `
    <li class="carte-quete">
      <a href="${racine}${q.dossier}/index.html">
        <span class="carte-quete__haut">${icone}<span class="carte-quete__titre">${e(q.titre)}</span></span>
        <span class="carte-quete__pied">${q.nbImages ? `${q.nbImages} image${q.nbImages > 1 ? "s" : ""}` : "&nbsp;"}</span>
      </a>
    </li>`,
    )
    .join("");

  const corps = `
<header class="titre-section">
  <span class="pastille pastille--teintee">${e(famille.nom)}</span>
  <h1>${icone}${e(categorie.nom)}</h1>
  ${categorie.description ? `<p class="titre-section__desc">${e(categorie.description)}</p>` : ""}
  <p class="titre-section__nb">${categorie.quetes.length} quête${categorie.quetes.length > 1 ? "s" : ""}</p>
</header>
<ul class="grille-quetes">${items}
</ul>`;

  return page({
    titre: `${categorie.nom} — Archives WCS`,
    racine,
    corps,
    couleur: teinte,
    filAriane: [{ libelle: "Accueil", lien: `${racine}index.html` }, { libelle: categorie.nom }],
  });
}

/** Page d'accueil : recherche, puis les thèmes regroupés par famille. */
export function pageAccueil(
  categories: FicheCategorie[],
  stats: { quetes: number; images: number },
): string {
  const slugsPresents = categories.map((c) => c.slug);
  const familles = famillesOrdonnees(slugsPresents);

  const sections = familles
    .map((f) => {
      const themes = categories.filter((c) => familleDuTheme(c.slug).cle === f.cle);
      if (!themes.length) return "";
      const nbQuetes = themes.reduce((s, c) => s + c.quetes.length, 0);

      const cartes = themes
        .map(
          (c) => `
      <li class="carte-cat" style="--teinte:${e(c.couleur || f.couleur)}">
        <a href="${c.slug}/index.html">
          <span class="carte-cat__bande">${c.icone ? `<img src="${e(c.icone)}" alt="" width="26" height="26">` : ""}</span>
          <span class="carte-cat__corps">
            <span class="carte-cat__titre">${e(c.nom)}</span>
            ${c.description ? `<span class="carte-cat__desc">${e(c.description)}</span>` : ""}
            <span class="carte-cat__nb">${c.quetes.length} quête${c.quetes.length > 1 ? "s" : ""}</span>
          </span>
        </a>
      </li>`,
        )
        .join("");

      return `
  <section class="famille">
    <h2 class="famille__titre">
      <span class="famille__nom">${e(f.nom)}</span>
      <span class="famille__compte">${themes.length} thème${themes.length > 1 ? "s" : ""} · ${nbQuetes} quête${nbQuetes > 1 ? "s" : ""}</span>
    </h2>
    <ul class="grille-cat">${cartes}
    </ul>
  </section>`;
    })
    .join("");

  const corps = `
<section class="hero">
  <h1>Mes cours de la Wild&nbsp;Code&nbsp;School</h1>
  <div class="recherche">
    <svg class="recherche__loupe" viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="6"/><line x1="13.5" y1="13.5" x2="18" y2="18"/></svg>
    <input id="recherche" type="search" autocomplete="off" spellcheck="false"
           placeholder="Rechercher dans tous les cours…" disabled>
  </div>
  <p class="recherche__compte" id="compte-resultats"></p>
</section>

<div id="resultats" hidden></div>

<div id="grille-themes">${sections}
</div>`;

  return page({
    titre: "Archives Wild Code School",
    racine: "./",
    corps,
    classeCorps: "page-accueil",
    scripts: `<script src="./assets/recherche-index.js"></script>\n<script>${SCRIPT_RECHERCHE}</script>`,
  });
}
