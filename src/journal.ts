/**
 * Journal (logs/archive.log) et manifeste (archive/manifest.json).
 *
 * Le manifeste est ce qui permet d'arrêter le programme et de le relancer sans
 * tout recommencer : chaque quête terminée y est inscrite. Au redémarrage, les
 * quêtes déjà inscrites sont simplement sautées.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

export interface EntreeQuete {
  id: number;
  titre: string;
  theme: string;
  dossier: string;
  urlOrigine: string;
  archiveLe: string;
  statut: "ok" | "partiel" | "echec";
  nbImages: number;
  imagesEchouees: { url: string; erreur: string }[];
  erreur?: string;
}

export interface Manifeste {
  version: number;
  creeLe: string;
  majLe: string;
  compte: string;
  quetes: Record<string, EntreeQuete>;
  replays: {
    releveLe: string;
    total: number;
    telecharges: Record<string, { titre: string; fichier: string; octets: number }>;
  };
}

export class Journal {
  private flux: string[] = [];

  constructor(private readonly cheminLog: string) {}

  private async ecrire(niveau: string, message: string) {
    const ligne = `${new Date().toISOString()}  ${niveau.padEnd(7)}  ${message}`;
    this.flux.push(ligne);
    if (this.flux.length >= 20) await this.vider();
  }

  async vider() {
    if (!this.flux.length) return;
    await fs.mkdir(path.dirname(this.cheminLog), { recursive: true });
    await fs.appendFile(this.cheminLog, this.flux.join("\n") + "\n", "utf8");
    this.flux = [];
  }

  info(m: string) { return this.ecrire("INFO", m); }
  succes(m: string) { return this.ecrire("OK", m); }
  alerte(m: string) { return this.ecrire("ALERTE", m); }
  erreur(m: string) { return this.ecrire("ERREUR", m); }

  /** Affiche à l'écran ET consigne dans le journal. */
  async dire(m: string, niveau: "INFO" | "OK" | "ALERTE" | "ERREUR" = "INFO") {
    console.log(m);
    await this.ecrire(niveau, m.replace(/\s+/g, " ").trim());
  }
}

export async function chargerManifeste(chemin: string, compte: string): Promise<Manifeste> {
  try {
    const brut = JSON.parse(await fs.readFile(chemin, "utf8")) as Manifeste;
    if (brut && brut.quetes) {
      brut.compte = compte || brut.compte;
      return brut;
    }
  } catch {
    /* premier lancement : on part d'un manifeste vierge */
  }
  const maintenant = new Date().toISOString();
  return {
    version: 1,
    creeLe: maintenant,
    majLe: maintenant,
    compte,
    quetes: {},
    replays: { releveLe: "", total: 0, telecharges: {} },
  };
}

export async function sauverManifeste(chemin: string, m: Manifeste): Promise<void> {
  m.majLe = new Date().toISOString();
  await fs.mkdir(path.dirname(chemin), { recursive: true });
  // Écriture en deux temps : on n'abîme jamais le manifeste existant si le
  // programme est interrompu pile au mauvais moment.
  const temporaire = chemin + ".tmp";
  await fs.writeFile(temporaire, JSON.stringify(m, null, 2), "utf8");
  await fs.rename(temporaire, chemin);
}
