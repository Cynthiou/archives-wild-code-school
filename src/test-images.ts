/**
 * Test de la chaîne de téléchargement des images.
 *
 * On monte un petit serveur HTTP local qui imite les cas réels rencontrés dans
 * l'archive, puis on vérifie que le téléchargeur nomme, détecte et récupère
 * correctement. Aucun accès à Internet : ce test valide le code, pas le réseau.
 */

import http from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { releverImages } from "./markdown.js";
import { telechargerImages, nommerImages } from "./media.js";

// Fichiers minuscules mais authentiques (vraies signatures de format).
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);
const JPEG = Buffer.from(
  "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==",
  "base64",
);
const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

const ROUTES: Record<string, { corps: Buffer; type?: string; code?: number }> = {
  // Cas normal : extension dans l'URL + bon type MIME
  "/schema.png": { corps: PNG, type: "image/png" },
  // Cas fréquent dans l'archive : AUCUNE extension dans l'URL
  "/sans-extension": { corps: JPEG, type: "image/jpeg" },
  // Pire cas : ni extension, ni type MIME utilisable -> il faut lire la signature
  "/mystere": { corps: PNG, type: "application/octet-stream" },
  // .jpeg doit être normalisé en .jpg
  "/photo.jpeg": { corps: JPEG, type: "image/jpeg" },
  // Un GIF (57 dans l'archive réelle)
  "/anim.gif": { corps: GIF, type: "image/gif" },
  // Une image morte : doit être signalée sans faire échouer le reste
  "/disparue.png": { corps: Buffer.alloc(0), code: 404 },
};

async function main() {
  let requetes = 0;
  const serveur = http.createServer((req, res) => {
    requetes++;
    const route = ROUTES[(req.url || "").split("?")[0]];
    if (!route || route.code === 404) {
      res.writeHead(404).end("introuvable");
      return;
    }
    res.writeHead(200, route.type ? { "content-type": route.type } : {});
    res.end(route.corps);
  });

  await new Promise<void>((r) => serveur.listen(0, "127.0.0.1", r));
  const port = (serveur.address() as { port: number }).port;
  const base = `http://127.0.0.1:${port}`;

  // Un Markdown qui reproduit les situations réelles de l'archive.
  const markdown = `
## Installation de MySQL

![Schéma de l'architecture client-serveur](${base}/schema.png)

Une image sans texte alternatif, juste après un titre :

![](${base}/sans-extension)

### Configuration des variables d'environnement

![](${base}/mystere)

Une image en balise HTML brute, comme dans 64 cas de l'archive :

<img src="${base}/photo.jpeg" alt="Capture d'écran de l'installeur">

![Animation](${base}/anim.gif)

Une image morte (le service d'hébergement a fermé) :

![Chaton de test](${base}/disparue.png)

Et la toute première image, réutilisée une seconde fois :

![Schéma de l'architecture client-serveur](${base}/schema.png)
`;

  const images = releverImages(markdown);
  const dossier = await fs.mkdtemp(path.join(os.tmpdir(), "wcs-test-"));

  console.log("=== TEST DE LA CHAÎNE IMAGES ===\n");
  console.log(`Références relevées : ${images.length}`);
  console.log(`URLs uniques        : ${new Set(images.map((i) => i.urlOrigine)).size}\n`);

  console.log("Noms de fichiers calculés :");
  for (const [url, nom] of nommerImages(markdown, images)) {
    console.log(`  ${url.replace(base, "…")}  ->  ${nom}`);
  }

  const { resultats, correspondances } = await telechargerImages(
    images,
    markdown,
    path.join(dossier, "images"),
    { concurrence: 3, tentatives: 2, delaiMs: 10 },
  );

  const fichiers = (await fs.readdir(path.join(dossier, "images"))).sort();
  console.log("\nFichiers réellement écrits sur le disque :");
  for (const f of fichiers) {
    const taille = (await fs.stat(path.join(dossier, "images", f))).size;
    console.log(`  ${f}  (${taille} octets)`);
  }

  const echecs = resultats.filter((r) => r.erreur);
  console.log("\nÉchecs signalés :");
  for (const e of echecs) console.log(`  ${e.urlOrigine.replace(base, "…")} -> ${e.erreur}`);

  // --- Vérifications ------------------------------------------------------
  const verifs: [string, boolean, string][] = [
    [
      "Le texte alternatif sert de nom de fichier",
      fichiers.some((f) => f.includes("schema-de-l-architecture-client-serveur")),
      fichiers.find((f) => f.includes("schema")) ?? "absent",
    ],
    [
      "Sans texte alternatif, le titre de section prend le relais",
      fichiers.some((f) => f.includes("installation-de-mysql") || f.includes("configuration-des-variables")),
      fichiers.filter((f) => f.includes("installation") || f.includes("configuration")).join(", "),
    ],
    [
      "URL sans extension + type MIME -> .jpg",
      fichiers.some((f) => f.includes("installation-de-mysql") && f.endsWith(".jpg")),
      fichiers.find((f) => f.includes("installation-de-mysql")) ?? "absent",
    ],
    [
      "Ni extension ni type MIME -> détection par signature (.png)",
      fichiers.some((f) => f.includes("configuration-des-variables") && f.endsWith(".png")),
      fichiers.find((f) => f.includes("configuration-des-variables")) ?? "absent",
    ],
    [".jpeg est normalisé en .jpg", fichiers.some((f) => f.endsWith(".jpg") && f.includes("capture")), ""],
    ["Le GIF est conservé en .gif", fichiers.some((f) => f.endsWith(".gif")), ""],
    ["Balise HTML <img> bien captée", images.some((i) => i.alt === "Capture d'écran de l'installeur"), ""],
    ["Image en double téléchargée une seule fois", requetes <= 7, `${requetes} requêtes HTTP`],
    ["L'image morte est signalée sans tout casser", echecs.length === 1, `${echecs.length} échec`],
    ["Les images valides sont toutes récupérées", fichiers.length === 5, `${fichiers.length}/5`],
    [
      "L'image morte garde son URL d'origine dans le cours",
      !correspondances.has(`${base}/disparue.png`),
      "",
    ],
  ];

  console.log("\n=== RÉSULTATS ===");
  let ko = 0;
  for (const [libelle, ok, detail] of verifs) {
    if (!ok) ko++;
    console.log(`  ${ok ? "✓" : "✗"} ${libelle}${detail ? ` — ${detail}` : ""}`);
  }

  serveur.close();
  await fs.rm(dossier, { recursive: true, force: true });

  console.log(ko === 0 ? "\nTous les tests passent.\n" : `\n${ko} test(s) en échec.\n`);
  process.exit(ko === 0 ? 0 : 1);
}

main();
