/**
 * Export "fichier unique" : replie une page du site (HTML + CSS + images) dans
 * un seul .html autonome, qu'on peut envoyer par mail, mettre sur une clé USB
 * ou ouvrir directement depuis le disque sans rien d'autre à côté.
 *
 * Utilisé pour l'aperçu, et disponible comme export pour n'importe quelle quête.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const TYPES_PAR_EXTENSION: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".ico": "image/x-icon",
};

/** Transforme un fichier local en URL de données (data:), intégrable dans le HTML. */
async function versDataUri(chemin: string): Promise<string | null> {
  try {
    const octets = await fs.readFile(chemin);
    const type = TYPES_PAR_EXTENSION[path.extname(chemin).toLowerCase()] ?? "application/octet-stream";
    return `data:${type};base64,${octets.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function replierEnFichierUnique(cheminPage: string): Promise<string> {
  const dossierPage = path.dirname(cheminPage);
  let html = await fs.readFile(cheminPage, "utf8");

  // 1. Feuille de style -> balise <style> intégrée
  const lien = html.match(/<link rel="stylesheet" href="([^"]+)">/);
  if (lien) {
    const cheminCss = path.resolve(dossierPage, lien[1]);
    try {
      const css = await fs.readFile(cheminCss, "utf8");
      html = html.replace(lien[0], `<style>\n${css}\n</style>`);
    } catch {
      /* on laisse le lien tel quel */
    }
  }

  // 2. Images locales -> data:
  const sources = [...html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"/g)].map((m) => m[1]);
  for (const src of [...new Set(sources)]) {
    if (/^(https?:|data:)/i.test(src)) continue; // déjà distante ou déjà intégrée
    const uri = await versDataUri(path.resolve(dossierPage, src));
    if (uri) html = html.split(`src="${src}"`).join(`src="${uri}"`);
  }

  // 3. Les liens de navigation interne n'ont plus de sens dans un fichier isolé
  html = html.replace(
    /<nav class="nav-quete">[\s\S]*?<\/nav>/,
    '<p class="muet" style="margin-top:3rem;text-align:center">Fichier autonome — la navigation entre quêtes est disponible dans le site complet.</p>',
  );

  return html;
}

// Utilisation directe : npx tsx src/single-file.ts <page.html> <sortie.html>
if (process.argv[1] && process.argv[1].endsWith("single-file.ts")) {
  const [, , entree, sortie] = process.argv;
  if (!entree || !sortie) {
    console.error("Usage : npx tsx src/single-file.ts <page.html> <sortie.html>");
    process.exit(1);
  }
  const html = await replierEnFichierUnique(path.resolve(entree));
  await fs.writeFile(path.resolve(sortie), html, "utf8");
  const taille = (await fs.stat(path.resolve(sortie))).size;
  console.log(`Fichier unique écrit : ${sortie} (${(taille / 1024).toFixed(0)} Ko)`);
}
