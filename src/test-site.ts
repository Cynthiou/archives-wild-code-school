/**
 * Test de la génération du site sur un jeu de données couvrant tous les thèmes.
 * Vérifie le regroupement en familles, les couleurs, et l'index de recherche.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { genererSite } from "./generateur.js";
import { emplacements } from "./archiver.js";
import { Journal, type Manifeste } from "./journal.js";
import { slugify, numero } from "./slug.js";
import { familleDuTheme, FAMILLES } from "./familles.js";

// Couleurs réelles des thèmes sur la plateforme, pour un rendu représentatif.
const COULEURS: Record<string, string> = {
  "Onboarding students": "#05604e", "Terminal": "#3b3003", "Outils": "#3B424E", "Git": "#F44F3D",
  "Développement Web": "#000000", "Web Design": "#4d4e4d", "HTML": "#a03737", "CSS": "#1b62b1",
  "UI Design": "#0b7771", "JavaScript": "#856400", "JavaScript - Beyond the Basics": "#854200",
  "Typescript": "#2079B1", "React - Bases": "#4DC4DE", "React - Intermédiaire": "#5B76DF",
  "Node.js": "#333333", "Express.js": "#545454", "JS Monorepo": "#000000", "Base de données": "#F7A356",
  "PHP": "#5F83B2", "PHP Orienté Objet": "#464985", "PHP Avancé": "#745089", "Scrum": "#17B481",
  "IA Générative": "#220f2a",
};

const THEMES: [string, number][] = [
  ["Onboarding students", 6], ["Terminal", 1], ["Outils", 1], ["Git", 6],
  ["Développement Web", 11], ["Web Design", 1], ["HTML", 9], ["CSS", 10],
  ["UI Design", 2], ["JavaScript", 11], ["JavaScript - Beyond the Basics", 8],
  ["Typescript", 1], ["React - Bases", 10], ["React - Intermédiaire", 4],
  ["Node.js", 5], ["Express.js", 1], ["JS Monorepo", 9], ["Base de données", 9],
  ["PHP", 14], ["PHP Orienté Objet", 11], ["PHP Avancé", 11], ["Scrum", 2],
  ["IA Générative", 3],
];

const EXTRAITS = [
  "Une jointure permet de combiner les lignes de deux tables. Le mot-clé JOIN associe les enregistrements.",
  "La propriété display: flex active le modèle flexbox et transforme le comportement des enfants.",
  "Le hook useEffect s'exécute après le rendu du composant et permet de déclencher un effet de bord.",
  "SELECT nom, prenom FROM wizard WHERE school_id = 2 ORDER BY nom ASC;",
  "Une clé étrangère garantit l'intégrité référentielle entre deux tables liées.",
];

async function main() {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), "wcs-site-"));
  const lieux = emplacements(base);
  const journal = new Journal(path.join(base, "logs", "test.log"));

  // --- Vérification 1 : chaque thème tombe dans une vraie famille ---------
  console.log("=== RATTACHEMENT DES THÈMES AUX FAMILLES ===\n");
  const orphelins: string[] = [];
  for (const [nom] of THEMES) {
    const f = familleDuTheme(slugify(nom));
    if (f.cle === "autres") orphelins.push(nom);
    console.log(`  ${f.nom.padEnd(18)} ← ${nom}`);
  }

  // --- Fabrication d'un jeu de données complet ---------------------------
  const manifeste: Manifeste = {
    version: 1, creeLe: "", majLe: "", compte: "Test",
    quetes: {}, replays: { releveLe: "", total: 0, telecharges: {} },
  };

  let id = 1;
  for (const [nomTheme, nb] of THEMES) {
    const slugTheme = slugify(nomTheme);
    for (let i = 1; i <= nb; i++) {
      const titre = `${String(i).padStart(2, "0")} - ${nomTheme} : chapitre ${i}`;
      const dossier = `${slugTheme}/${numero(i)}-${slugify(titre)}`;
      const dossierComplet = path.join(lieux.site, dossier);
      await fs.mkdir(dossierComplet, { recursive: true });
      await fs.writeFile(
        path.join(dossierComplet, "cours.md"),
        `## Objectifs\n\n- Comprendre ${nomTheme}\n\n## Contenu\n\n${EXTRAITS[id % EXTRAITS.length]}\n\n\`\`\`sql\nSELECT * FROM table JOIN autre ON table.id = autre.table_id;\n\`\`\`\n`,
        "utf8",
      );
      await fs.mkdir(path.join(lieux.archive, "quests", String(id)), { recursive: true });
      await fs.writeFile(
        path.join(lieux.archive, "quests", String(id), "quest.json"),
        JSON.stringify({ id, titre, ressources: [] }),
        "utf8",
      );
      manifeste.quetes[String(id)] = {
        id, titre, theme: nomTheme, dossier,
        urlOrigine: `https://odyssey.wildcodeschool.com/quests/${id}`,
        archiveLe: new Date().toISOString(), statut: "ok",
        nbImages: (id % 7) + 1, imagesEchouees: [],
      };
      id++;
    }
  }

  await fs.mkdir(lieux.archive, { recursive: true });
  await fs.writeFile(
    path.join(lieux.archive, "themes.json"),
    JSON.stringify(THEMES.map(([nom]) => ({ slug: slugify(nom), nom, description: `Description du thème ${nom}.`, couleur: COULEURS[nom], icone: null }))),
    "utf8",
  );

  // --- Génération ---------------------------------------------------------
  const r = await genererSite({ lieux, manifeste, journal, racineOutil: path.resolve(import.meta.dirname, "..") });
  await journal.vider();

  const accueil = await fs.readFile(path.join(lieux.site, "index.html"), "utf8");
  const indexJs = await fs.readFile(path.join(lieux.site, "assets", "recherche-index.js"), "utf8");

  console.log("\n=== VÉRIFICATIONS ===");
  const verifs: [string, boolean, string][] = [
    ["Tous les thèmes sont rattachés à une famille", orphelins.length === 0, orphelins.join(", ")],
    ["Toutes les familles définies sont utilisées", FAMILLES.every((f) => accueil.includes(`>${f.nom.replace(/&/g, "&amp;")}<`)), ""],
    ["L'accueil affiche les sections de familles", (accueil.match(/class="famille"/g) || []).length === FAMILLES.length, `${(accueil.match(/class="famille"/g) || []).length}/${FAMILLES.length}`],
    ["Chaque famille porte sa couleur", (accueil.match(/--teinte:#/g) || []).length >= FAMILLES.length, ""],
    ["Le champ de recherche est présent", accueil.includes('id="recherche"'), ""],
    ["L'index de recherche est chargé par balise script", accueil.includes("recherche-index.js"), ""],
    ["L'index contient toutes les quêtes", r.indexRecherche === id - 1, `${r.indexRecherche}/${id - 1}`],
    ["Le mot JOIN est bien indexé", indexJs.toLowerCase().includes("join"), ""],
    ["L'index conserve les accents (extraits lisibles)", /[éèêàç]/.test(indexJs), ""],
    ["Les résultats affichés sont plafonnés", /MAX_AFFICHES = 50/.test(await fs.readFile(path.join(lieux.site, "index.html"), "utf8")), ""],
    ["Pages générées = quêtes + thèmes + accueil", r.pages === id - 1 + THEMES.length + 1, `${r.pages}`],
    ["Aucune ressource distante dans l'accueil", !/https?:\/\//.test(accueil.replace(/https:\/\/odyssey[^"']*/g, "")), ""],
  ];

  let ko = 0;
  for (const [libelle, ok, detail] of verifs) {
    if (!ok) ko++;
    console.log(`  ${ok ? "✓" : "✗"} ${libelle}${detail ? ` — ${detail}` : ""}`);
  }

  console.log(`\n  Site de test : ${lieux.site}`);
  console.log(`  ${r.pages} pages · ${r.themes} thèmes · index sur ${r.indexRecherche} quêtes`);
  console.log(ko === 0 ? "\nTous les tests passent.\n" : `\n${ko} test(s) en échec.\n`);
  console.log(base);
}

main();
