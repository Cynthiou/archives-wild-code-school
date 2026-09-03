/**
 * Regroupement des thèmes en grandes familles, et couleur associée.
 *
 * La plateforme fournit 23 thèmes à plat. Les ranger en familles rend l'accueil
 * beaucoup plus lisible : on retrouve « le front », « le back », « les données »
 * au lieu d'une liste de 23 cartes sans hiérarchie.
 *
 * La couleur sert à distinguer les familles d'un coup d'œil, pas à décorer :
 * une seule teinte par famille, reprise en petit sur chaque carte.
 */

export interface Famille {
  cle: string;
  nom: string;
  couleur: string;
  /** Slugs de thèmes (issus du nom français) rattachés à cette famille. */
  themes: string[];
}

export const FAMILLES: Famille[] = [
  {
    cle: "fondations",
    nom: "Fondations",
    couleur: "#5b7080",
    themes: ["onboarding-students", "terminal", "outils", "git"],
  },
  {
    cle: "front",
    nom: "Front-end",
    couleur: "#4f46e5",
    themes: [
      "web-design",
      "html",
      "css",
      "ui-design",
      "javascript",
      "javascript-beyond-the-basics",
      "typescript",
      "react-bases",
      "react-intermediaire",
    ],
  },
  {
    cle: "back",
    nom: "Back-end",
    couleur: "#0d8a7d",
    themes: ["node-js", "express-js", "js-monorepo", "php", "php-oriente-objet", "php-avance"],
  },
  {
    cle: "donnees",
    nom: "Base de données",
    couleur: "#b06a12",
    themes: ["base-de-donnees"],
  },
  {
    cle: "methodes",
    nom: "Méthodes & IA",
    couleur: "#b5306b",
    themes: ["scrum", "ia-generative"],
  },
  {
    cle: "parcours",
    nom: "Parcours & projets",
    couleur: "#7c3aed",
    themes: ["developpement-web"],
  },
];

const INDEX_FAMILLE = new Map<string, Famille>();
for (const f of FAMILLES) for (const t of f.themes) INDEX_FAMILLE.set(t, f);

/** Famille d'accueil pour un thème que la plateforme ajouterait plus tard. */
export const FAMILLE_AUTRES: Famille = {
  cle: "autres",
  nom: "Autres",
  couleur: "#6b7280",
  themes: [],
};

export function familleDuTheme(slugTheme: string): Famille {
  return INDEX_FAMILLE.get(slugTheme) ?? FAMILLE_AUTRES;
}

/** Ordre d'affichage des familles, « Autres » toujours en dernier. */
export function famillesOrdonnees(slugsPresents: string[]): Famille[] {
  const presentes = FAMILLES.filter((f) => f.themes.some((t) => slugsPresents.includes(t)));
  const orphelins = slugsPresents.filter((s) => !INDEX_FAMILLE.has(s));
  return orphelins.length ? [...presentes, FAMILLE_AUTRES] : presentes;
}
