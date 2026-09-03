/**
 * Pré-calcul des diagrammes Mermaid en SVG, au moment de la génération du site.
 *
 * Pourquoi : embarquer Mermaid dans le site coûterait 3,2 Mo de JavaScript, et un
 * site qui dépend d'un script est un site qui peut cesser de fonctionner. En rendant
 * les diagrammes une bonne fois pour toutes, le site final ne contient plus que du
 * HTML, du CSS et des images : il s'ouvrira encore dans dix ans.
 *
 * Le navigateur n'est utilisé qu'ici, en local, sans aucun accès au réseau.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { chromium, type Browser } from "playwright-core";

export class RenduMermaid {
  private navigateur: Browser | null = null;
  private scriptMermaid = "";
  private readonly cache = new Map<string, string>();

  constructor(
    private readonly cheminMermaidJs: string,
    private readonly navigateurInstalle = true,
  ) {}

  private async demarrer() {
    if (this.navigateur) return;
    this.scriptMermaid = await fs.readFile(this.cheminMermaidJs, "utf8");
    // CHROMIUM_EXECUTABLE permet de pointer un navigateur déjà présent sur la machine
    // (utile en environnement contraint). Sinon, Playwright utilise le sien.
    const executablePath = process.env.CHROMIUM_EXECUTABLE || undefined;
    const canaux = executablePath ? [null] : this.navigateurInstalle ? ["chrome", "msedge"] : [null];
    let derniere: unknown;

    for (const canal of canaux) {
      try {
        this.navigateur = await chromium.launch({
          ...(executablePath ? { executablePath } : {}),
          ...(canal ? { channel: canal } : {}),
          args: ["--no-sandbox", "--disable-dev-shm-usage"],
        });
        return;
      } catch (e) {
        derniere = e;
      }
    }
    throw derniere instanceof Error ? derniere : new Error(String(derniere));
  }

  /** Rend un diagramme en SVG. Retourne null si le diagramme est invalide. */
  async rendre(source: string): Promise<string | null> {
    const cle = source.trim();
    if (this.cache.has(cle)) return this.cache.get(cle)!;

    await this.demarrer();
    const page = await this.navigateur!.newPage();
    try {
      await page.setContent("<!doctype html><html><body><div id='cible'></div></body></html>");
      await page.addScriptTag({ content: this.scriptMermaid });

      const svg = await page.evaluate(async (code) => {
        const m = (window as unknown as { mermaid: any }).mermaid;
        m.initialize({ startOnLoad: false, securityLevel: "loose", theme: "base" });
        try {
          const { svg } = await m.render("diagramme-" + Math.random().toString(36).slice(2), code);
          return svg;
        } catch {
          return null;
        }
      }, cle);

      if (svg) this.cache.set(cle, svg);
      return svg;
    } catch {
      return null;
    } finally {
      await page.close();
    }
  }

  async fermer() {
    await this.navigateur?.close();
    this.navigateur = null;
  }
}

/**
 * Remplace dans une page HTML tous les <pre class="mermaid">…</pre> par le SVG
 * correspondant. Les diagrammes qui échouent restent affichés sous forme de code
 * source lisible : on ne perd jamais l'information.
 */
export async function injecterDiagrammes(html: string, rendu: RenduMermaid): Promise<{ html: string; rendus: number; echecs: number }> {
  const motif = /<pre class="mermaid">([\s\S]*?)<\/pre>/g;
  const morceaux = [...html.matchAll(motif)];
  if (!morceaux.length) return { html, rendus: 0, echecs: 0 };

  let resultat = html;
  let rendus = 0;
  let echecs = 0;

  for (const m of morceaux) {
    const source = dechapper(m[1]);
    const svg = await rendu.rendre(source);
    if (svg) {
      resultat = resultat.replace(m[0], `<figure class="diagramme">${svg}</figure>`);
      rendus++;
    } else {
      resultat = resultat.replace(
        m[0],
        `<div class="bloc-code"><div class="bloc-code__langue">diagramme (mermaid)</div><pre><code>${m[1]}</code></pre></div>`,
      );
      echecs++;
    }
  }

  return { html: resultat, rendus, echecs };
}

function dechapper(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

export function cheminMermaidParDefaut(racine: string): string {
  return path.join(racine, "site-assets", "mermaid.min.js");
}
