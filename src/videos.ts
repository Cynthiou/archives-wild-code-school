/**
 * Replays vidéo : inventaire, mesure, téléchargement, classement et renommage.
 *
 * Deux points de vigilance propres à ces fichiers :
 *
 *  1. Les adresses de téléchargement fournies par la plateforme sont SIGNÉES et
 *     expirent au bout d'une heure environ. On ne peut donc pas les stocker :
 *     il faut redemander la liste juste avant de télécharger, et la redemander
 *     encore si le téléchargement dure longtemps.
 *
 *  2. Ce sont de gros fichiers. On écrit donc directement sur le disque au fur
 *     et à mesure (jamais tout en mémoire), on n'en télécharge qu'un à la fois,
 *     et on peut s'arrêter puis reprendre : un fichier déjà présent et complet
 *     est sauté.
 */

import { promises as fs, createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import type { ApiOdyssey, Replay } from "./api.js";

/** Libellés lisibles pour les catégories de la plateforme. */
const CATEGORIES: Record<string, string> = {
  masterclass: "Masterclass",
  live_coding: "Live coding",
  lesson: "Cours",
  career: "Carriere",
  workshop: "Atelier",
  support: "Support",
  various: "Divers",
};

export function libelleCategorie(cle: string): string {
  return CATEGORIES[cle] ?? "Divers";
}

/** Caractères interdits dans un nom de fichier Windows. */
function nettoyerNom(texte: string): string {
  return texte
    .replace(/[\\/:*?"<>|]/g, " ")
    .replace(/[\u0000-\u001f]/g, "") // caracteres de controle
    .replace(/\s+/g, " ")
    .replace(/[. ]+$/, "")
    .trim()
    .slice(0, 120);
}

/**
 * Nom de fichier final : la date d'abord, pour que le tri alphabétique du
 * dossier corresponde à l'ordre chronologique.
 *   "2026-08-31 - TuneLab - On reprend les bases.mp4"
 */
export function nommerVideo(v: Replay): string {
  const date = v.enregistreLe ? v.enregistreLe.slice(0, 10) : "0000-00-00";
  const titre = nettoyerNom(v.titre) || `replay-${v.id}`;
  return `${date} - ${titre}.mp4`;
}

export interface FicheVideo {
  video: Replay;
  categorie: string;
  nomFichier: string;
  cheminRelatif: string;
  octets?: number;
  dejaLa?: boolean;
}

/** Prépare le classement : un dossier par catégorie, un nom de fichier par vidéo. */
export function classer(videos: Replay[]): FicheVideo[] {
  return videos
    .filter((v) => v.source !== "youtube" && v.urlTelechargement)
    .map((v) => {
      const categorie = libelleCategorie(v.categorie);
      const nomFichier = nommerVideo(v);
      return { video: v, categorie, nomFichier, cheminRelatif: `${categorie}/${nomFichier}` };
    });
}

/** Demande la taille d'un fichier sans le télécharger. */
async function tailleDistante(url: string, timeoutMs = 20000): Promise<number | null> {
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { method: "HEAD", signal: ctrl.signal, redirect: "follow" });
    if (!r.ok) return null;
    const taille = r.headers.get("content-length");
    return taille ? Number(taille) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(minuteur);
  }
}

export function formaterOctets(octets: number): string {
  if (octets >= 1024 ** 3) return `${(octets / 1024 ** 3).toFixed(1)} Go`;
  if (octets >= 1024 ** 2) return `${Math.round(octets / 1024 ** 2)} Mo`;
  return `${Math.round(octets / 1024)} Ko`;
}

/**
 * MESURE — interroge chaque vidéo pour connaître son poids, sans rien télécharger.
 * C'est ce qui permet de décider en connaissance de cause (place disque, forfait,
 * capacité d'un espace de stockage en ligne).
 */
export async function mesurer(
  fiches: FicheVideo[],
  surAvancement: (fait: number, total: number) => void,
): Promise<{ fiches: FicheVideo[]; total: number; inconnues: number }> {
  let total = 0;
  let inconnues = 0;

  for (const [i, f] of fiches.entries()) {
    const taille = await tailleDistante(f.video.urlTelechargement!);
    if (taille) {
      f.octets = taille;
      total += taille;
    } else {
      inconnues++;
    }
    surAvancement(i + 1, fiches.length);
    await new Promise((r) => setTimeout(r, 60)); // on reste poli
  }

  return { fiches, total, inconnues };
}

/**
 * TÉLÉCHARGEMENT — un fichier à la fois, écrit en flux sur le disque.
 * Reprend sans rien refaire : un fichier déjà présent avec la bonne taille est sauté.
 */
export async function telecharger(options: {
  api: ApiOdyssey;
  fiches: FicheVideo[];
  dossierDestination: string;
  surAvancement: (message: string) => void;
  budgetOctets?: number;
}): Promise<{ telechargees: number; sautees: number; echecs: { titre: string; erreur: string }[]; octets: number }> {
  const { api, fiches, dossierDestination, surAvancement, budgetOctets } = options;

  let telechargees = 0;
  let sautees = 0;
  let octets = 0;
  const echecs: { titre: string; erreur: string }[] = [];

  // Les adresses signées expirant vite, on garde une liste fraîche et on la
  // renouvelle dès qu'elle a plus de 40 minutes.
  let urlsFraiches = new Map(fiches.map((f) => [f.video.id, f.video.urlTelechargement!]));
  let obtenuesLe = Date.now();

  const rafraichirSiNecessaire = async () => {
    if (Date.now() - obtenuesLe < 40 * 60_000) return;
    surAvancement("  (renouvellement des adresses de téléchargement)");
    const recentes = await api.replays();
    urlsFraiches = new Map(
      recentes.filter((v) => v.urlTelechargement).map((v) => [v.id, v.urlTelechargement!]),
    );
    obtenuesLe = Date.now();
  };

  for (const f of fiches) {
    if (budgetOctets && octets >= budgetOctets) {
      surAvancement(`\n  Budget de ${formaterOctets(budgetOctets)} atteint, on s'arrête ici.`);
      break;
    }

    const dossier = path.join(dossierDestination, f.categorie);
    const cible = path.join(dossier, f.nomFichier);

    // Déjà téléchargée et complète ? on passe.
    try {
      const stat = await fs.stat(cible);
      if (stat.size > 0 && (!f.octets || Math.abs(stat.size - f.octets) < 1024)) {
        sautees++;
        continue;
      }
    } catch {
      /* le fichier n'existe pas encore */
    }

    await fs.mkdir(dossier, { recursive: true });
    await rafraichirSiNecessaire();

    const url = urlsFraiches.get(f.video.id);
    if (!url) {
      echecs.push({ titre: f.video.titre, erreur: "adresse de téléchargement indisponible" });
      continue;
    }

    const partiel = cible + ".part";
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      if (!r.body) throw new Error("réponse vide");

      surAvancement(
        `  ${f.categorie.padEnd(12)} ${f.nomFichier.slice(0, 58).padEnd(58)} ${f.octets ? formaterOctets(f.octets).padStart(8) : ""}`,
      );

      await pipeline(Readable.fromWeb(r.body as never), createWriteStream(partiel));
      const stat = await fs.stat(partiel);
      if (stat.size === 0) throw new Error("fichier vide");

      await fs.rename(partiel, cible);
      telechargees++;
      octets += stat.size;
    } catch (e) {
      await fs.rm(partiel, { force: true }).catch(() => {});
      echecs.push({ titre: f.video.titre, erreur: e instanceof Error ? e.message : String(e) });
      surAvancement(`  ÉCHEC  ${f.video.titre.slice(0, 50)} — ${e instanceof Error ? e.message : e}`);
    }
  }

  return { telechargees, sautees, echecs, octets };
}
