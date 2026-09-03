/**
 * Téléchargement des images d'un cours, avec renommage compréhensible.
 *
 * Objectifs :
 *  - donner des noms lisibles ("03-page-telechargement-mysql.jpeg") plutôt que
 *    les noms opaques d'origine ("JV89MvvRzn2yLAfF0GEiekL2JB7aBtkn.jpeg") ;
 *  - deviner l'extension réelle quand l'URL n'en donne aucune (30 cas dans l'archive) ;
 *  - ne jamais télécharger deux fois la même image ;
 *  - rester poli avec les serveurs : peu de requêtes en parallèle, des tentatives limitées ;
 *  - ne jamais faire échouer une quête entière à cause d'une image morte.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { slugify, numero, nomUnique } from "./slug.js";
import type { ImageTrouvee } from "./markdown.js";

export interface ResultatImage {
  urlOrigine: string;
  cheminRelatif?: string; // "images/01-schema.png" si le téléchargement a réussi
  octets?: number;
  erreur?: string;
}

export interface OptionsTelechargement {
  concurrence?: number;
  tentatives?: number;
  delaiMs?: number; // pause entre deux requêtes d'un même worker
  timeoutMs?: number;
}

/** Extensions acceptées, et le type MIME correspondant. */
const TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
  "image/bmp": ".bmp",
  "image/x-icon": ".ico",
};

/** Devine l'extension à partir des tout premiers octets du fichier (signature). */
function extensionDepuisSignature(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return ".jpg";
  if (buf.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") return ".png";
  if (buf.subarray(0, 3).toString("ascii") === "GIF") return ".gif";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP")
    return ".webp";
  const debut = buf.subarray(0, 200).toString("utf8").trimStart();
  if (debut.startsWith("<svg") || debut.startsWith("<?xml")) return ".svg";
  return null;
}

/**
 * Construit un nom de fichier lisible pour chaque image.
 * Priorité : texte alternatif > titre de section juste au-dessus > numéro seul.
 */
export function nommerImages(markdown: string, images: ImageTrouvee[]): Map<string, string> {
  const contexte = analyserContexte(markdown);

  const noms = new Map<string, string>(); // url -> nom de base (sans extension)
  const pris = new Set<string>();
  let index = 0;

  for (const img of images) {
    if (noms.has(img.urlOrigine)) continue; // même URL = même fichier
    index++;

    // Priorité 1 : le texte alternatif écrit par l'auteur du cours.
    let libelle = img.alt;

    // Priorité 2 : le titre de section qui précède, complété par le nom de l'onglet
    // quand l'image est dans un bloc à onglets (Ubuntu / Mac OS / Windows).
    if (!libelle) {
      const ctx = contexte.get(img.urlOrigine);
      if (ctx) libelle = [ctx.titre, ctx.onglet].filter(Boolean).join(" ");
    }

    const base = `${numero(index)}-${slugify(libelle || "image", 48)}`;
    noms.set(img.urlOrigine, nomUnique(base, pris));
  }

  return noms;
}

/**
 * Parcourt le Markdown ligne par ligne pour savoir, à l'endroit de chaque image,
 * quel est le dernier titre de section et le dernier onglet ouvert.
 *
 * Le point important : on ignore tout ce qui se trouve DANS un bloc de code.
 * Sans cela, un bloc ```resource contenant "# Digital Ocean - ..." serait pris
 * pour un titre de section et donnerait son nom aux images qui le suivent.
 */
function analyserContexte(markdown: string): Map<string, { titre: string; onglet: string }> {
  const resultat = new Map<string, { titre: string; onglet: string }>();
  const lignes = markdown.split("\n");

  let titreCourant = "";
  const pileFences: number[] = []; // longueur des clôtures ouvertes (3, 4, ...)
  let ongletCourant = "";
  let profondeurOngletOuvert = -1;

  for (const ligne of lignes) {
    const fence = ligne.match(/^\s*(`{3,})(.*)$/);
    if (fence) {
      const longueur = fence[1].length;
      const infos = fence[2].trim();
      const dernier = pileFences[pileFences.length - 1];
      if (dernier !== undefined && longueur >= dernier && infos === "") {
        // Clôture du bloc courant
        pileFences.pop();
        if (pileFences.length <= profondeurOngletOuvert) {
          ongletCourant = "";
          profondeurOngletOuvert = -1;
        }
      } else {
        pileFences.push(longueur);
        if (/^(tabs|columns)\b/.test(infos)) profondeurOngletOuvert = pileFences.length - 1;
      }
      continue;
    }

    const dansCode = pileFences.length > 0;

    // Séparateur d'onglet : "!--- Mac OS"
    const sep = ligne.match(/^!---\s*(.*)$/);
    if (sep && profondeurOngletOuvert >= 0) {
      ongletCourant = sep[1].trim();
      continue;
    }

    // Titre de section, uniquement hors bloc de code
    const titre = !dansCode && ligne.match(/^#{1,4}\s+(.+?)\s*$/);
    if (titre) {
      titreCourant = titre[1];
      continue;
    }

    // Images présentes sur cette ligne
    for (const m of ligne.matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)/g)) {
      if (!resultat.has(m[1])) resultat.set(m[1], { titre: titreCourant, onglet: ongletCourant });
    }
    for (const m of ligne.matchAll(/<img\b[^>]*?\bsrc=(["'])(.*?)\1/gi)) {
      if (!resultat.has(m[2])) resultat.set(m[2], { titre: titreCourant, onglet: ongletCourant });
    }
  }

  return resultat;
}

async function telechargerUne(
  url: string,
  timeoutMs: number,
): Promise<{ corps: Buffer; typeMime: string }> {
  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), timeoutMs);
  try {
    const reponse = await fetch(url, {
      signal: controleur.signal,
      redirect: "follow",
      headers: {
        // On s'annonce comme un navigateur : certains hébergeurs refusent les clients anonymes.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/png,image/jpeg,image/*,*/*;q=0.8",
      },
    });
    if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
    const corps = Buffer.from(await reponse.arrayBuffer());
    if (corps.length === 0) throw new Error("fichier vide");
    return { corps, typeMime: (reponse.headers.get("content-type") || "").split(";")[0].trim() };
  } finally {
    clearTimeout(minuteur);
  }
}

export async function telechargerImages(
  images: ImageTrouvee[],
  markdown: string,
  dossierImages: string,
  options: OptionsTelechargement = {},
): Promise<{ resultats: ResultatImage[]; correspondances: Map<string, string> }> {
  const { concurrence = 4, tentatives = 3, delaiMs = 120, timeoutMs = 20000 } = options;

  const noms = nommerImages(markdown, images);
  const urlsUniques = [...noms.keys()];
  const resultats: ResultatImage[] = [];
  const correspondances = new Map<string, string>(); // url distante -> chemin local relatif

  await fs.mkdir(dossierImages, { recursive: true });

  let curseur = 0;
  const worker = async () => {
    while (curseur < urlsUniques.length) {
      const url = urlsUniques[curseur++];
      const base = noms.get(url)!;
      let derniereErreur = "";

      for (let essai = 1; essai <= tentatives; essai++) {
        try {
          const { corps, typeMime } = await telechargerUne(url, timeoutMs);

          // Extension : d'abord le type MIME annoncé, sinon la signature du fichier,
          // sinon l'extension présente dans l'URL, sinon .bin.
          let ext = TYPES[typeMime] || extensionDepuisSignature(corps) || "";
          if (!ext) {
            const dansUrl = new URL(url).pathname.match(/\.([a-z0-9]{2,5})$/i);
            ext = dansUrl ? "." + dansUrl[1].toLowerCase() : ".bin";
          }
          if (ext === ".jpeg") ext = ".jpg";

          const nomFichier = base + ext;
          await fs.writeFile(path.join(dossierImages, nomFichier), corps);

          const relatif = `images/${nomFichier}`;
          correspondances.set(url, relatif);
          resultats.push({ urlOrigine: url, cheminRelatif: relatif, octets: corps.length });
          derniereErreur = "";
          break;
        } catch (e: unknown) {
          derniereErreur = e instanceof Error ? e.message : String(e);
          // Petite attente croissante avant de réessayer (200ms, 400ms, 800ms...)
          if (essai < tentatives) await pause(200 * 2 ** (essai - 1));
        }
      }

      if (derniereErreur) {
        // On garde l'URL d'origine dans le cours : mieux vaut un lien distant qu'une image absente.
        resultats.push({ urlOrigine: url, erreur: derniereErreur });
      }
      await pause(delaiMs);
    }
  };

  await Promise.all(Array.from({ length: concurrence }, worker));
  return { resultats, correspondances };
}

export function pause(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Télécharge un fichier unique (utilisé pour les icônes de thèmes).
 * Retourne le nom du fichier écrit, ou null en cas d'échec — jamais d'exception :
 * une icône manquante ne doit pas empêcher le site de se construire.
 */
export async function telechargerFichier(
  url: string,
  dossier: string,
  nomSansExtension: string,
): Promise<string | null> {
  try {
    const { corps, typeMime } = await telechargerUne(url, 15000);
    let ext = TYPES[typeMime] || extensionDepuisSignature(corps) || "";
    if (!ext) {
      const dansUrl = new URL(url).pathname.match(/\.([a-z0-9]{2,5})$/i);
      ext = dansUrl ? "." + dansUrl[1].toLowerCase() : ".png";
    }
    if (ext === ".jpeg") ext = ".jpg";
    await fs.mkdir(dossier, { recursive: true });
    const nom = nomSansExtension + ext;
    await fs.writeFile(path.join(dossier, nom), corps);
    return nom;
  } catch {
    return null;
  }
}
