/**
 * Moteur de rendu Markdown -> HTML pour les quêtes Wild Code School.
 *
 * Les cours utilisent du Markdown standard PLUS des blocs maison de la Wild :
 *   ```story            -> encadré narratif
 *   ```alert-info       -> encadré bleu       (variantes : alert-warning, alert-error,
 *                                              "alert", et la coquille "alert error")
 *   ```xtext callout    -> encadré neutre     (variante : xtext arrow)
 *   ```tabs os          -> onglets, séparés par des lignes "!--- NomOnglet"
 *   ```stepper          -> étapes, séparées par des titres "# Titre d'étape"
 *   ```columns          -> colonnes, séparées par "!---"
 *   ```resource         -> carte lien : URL en 1re ligne, "# Titre", puis description
 *   ```youtube          -> carte vidéo YouTube
 *   ```quests           -> renvois vers d'autres quêtes (liste d'identifiants)
 *   ```solution         -> réponse repliable
 *   ```mermaid          -> diagramme
 *
 * Point délicat : ces blocs CONTIENNENT eux-mêmes du Markdown et d'autres blocs de code.
 * La Wild les clôture alors avec 4 backticks au lieu de 3. markdown-it gère nativement
 * cette imbrication, à condition de rendre le contenu interne de façon récursive.
 */

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

/** Une image trouvée dans le cours, et où elle doit pointer en local. */
export interface ImageTrouvee {
  urlOrigine: string;
  alt: string;
  /** Rempli plus tard par le téléchargeur : "images/01-schema.png" */
  cheminLocal?: string;
}

export interface OptionsRendu {
  /** Table de correspondance URL distante -> chemin local, remplie par le téléchargeur. */
  imagesLocales?: Map<string, string>;
  /** Pour transformer les renvois ```quests en liens locaux : id -> chemin relatif. */
  lienVersQuete?: (id: number) => string | null;
}

/** Échappe le HTML pour l'insérer sans risque dans la page. */
function echapper(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Coloration syntaxique côté build : aucun JavaScript nécessaire dans la page finale. */
function colorer(code: string, langue: string): string {
  const alias: Record<string, string> = {
    sh: "bash",
    shell: "bash",
    console: "bash",
    jsx: "javascript",
    tsx: "typescript",
    js: "javascript",
    ts: "typescript",
    yml: "yaml",
    "": "plaintext",
  };
  const lang = alias[langue] ?? langue;
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
    } catch {
      /* on retombe sur le texte brut */
    }
  }
  return echapper(code);
}

/** Découpe le contenu d'un bloc ```tabs / ```columns sur les lignes "!--- Label". */
function decouperParSeparateur(contenu: string): { label: string; corps: string }[] {
  const lignes = contenu.split("\n");
  const parties: { label: string; corps: string[] }[] = [];
  let courante: { label: string; corps: string[] } | null = null;

  for (const ligne of lignes) {
    const sep = ligne.match(/^!---\s*(.*)$/);
    if (sep) {
      courante = { label: sep[1].trim(), corps: [] };
      parties.push(courante);
    } else if (courante) {
      courante.corps.push(ligne);
    } else if (ligne.trim()) {
      // Du texte avant le premier séparateur : on lui crée une partie sans titre.
      courante = { label: "", corps: [ligne] };
      parties.push(courante);
    }
  }
  return parties.map((p) => ({ label: p.label, corps: p.corps.join("\n").trim() }));
}

/** Découpe le contenu d'un ```stepper sur les titres "# Étape ...". */
function decouperParEtapes(contenu: string): { label: string; corps: string }[] {
  const lignes = contenu.split("\n");
  const parties: { label: string; corps: string[] }[] = [];
  let courante: { label: string; corps: string[] } | null = null;
  let dansBlocCode = false;

  for (const ligne of lignes) {
    // On ignore les titres situés à l'intérieur d'un bloc de code
    if (/^\s*```/.test(ligne)) dansBlocCode = !dansBlocCode;
    const titre = !dansBlocCode && ligne.match(/^#\s+(.*)$/);
    if (titre) {
      courante = { label: titre[1].trim(), corps: [] };
      parties.push(courante);
    } else if (courante) {
      courante.corps.push(ligne);
    } else if (ligne.trim()) {
      courante = { label: "", corps: [ligne] };
      parties.push(courante);
    }
  }
  return parties.map((p) => ({ label: p.label, corps: p.corps.join("\n").trim() }));
}

let compteurOnglets = 0;

export function creerRendu(options: OptionsRendu = {}) {
  const md = new MarkdownIt({
    html: true, // les cours contiennent de vraies balises <img>, <br>, <details>...
    linkify: true, // les URLs écrites en clair deviennent cliquables
    breaks: false,
    typographer: false,
  });

  /** Rend du Markdown imbriqué (contenu d'un encadré, d'un onglet, d'une étape). */
  const rendreInterne = (contenu: string): string => md.render(contenu);

  /** Remplace l'URL distante d'une image par son chemin local si on l'a téléchargée. */
  const resoudreImage = (url: string): string => options.imagesLocales?.get(url) ?? url;

  // --- Images en syntaxe Markdown : ![alt](url) ---
  const imageDefaut =
    md.renderer.rules.image ??
    ((tokens, idx, opts, _env, self) => self.renderToken(tokens, idx, opts));
  md.renderer.rules.image = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");
    if (srcIndex >= 0) {
      const url = String(token.attrs![srcIndex][1]);
      token.attrs![srcIndex][1] = resoudreImage(url);
    }
    token.attrSet("loading", "lazy");
    return imageDefaut(tokens, idx, opts, env, self);
  };

  // --- Images écrites en HTML brut : <img src="..."> (64 cas dans l'archive) ---
  // Attention : l'attribut peut être délimité par " ou ' et CONTENIR l'autre caractère
  // (ex. alt="Capture d'écran"). On capture le délimiteur pour ne s'arrêter que sur lui.
  const reecrireImgHtml = (html: string): string =>
    html.replace(/(<img\b[^>]*?\bsrc=)(["'])(.*?)\2/gi, (_m, avant, guillemet, url) => {
      return avant + guillemet + resoudreImage(url) + guillemet;
    });
  const htmlBlockDefaut =
    md.renderer.rules.html_block ?? ((tokens, idx) => tokens[idx].content);
  md.renderer.rules.html_block = (tokens, idx, o, e, s) =>
    reecrireImgHtml(htmlBlockDefaut(tokens, idx, o, e, s));
  const htmlInlineDefaut =
    md.renderer.rules.html_inline ?? ((tokens, idx) => tokens[idx].content);
  md.renderer.rules.html_inline = (tokens, idx, o, e, s) =>
    reecrireImgHtml(htmlInlineDefaut(tokens, idx, o, e, s));

  // --- Liens : les liens externes s'ouvrent dans un nouvel onglet ---
  const lienDefaut =
    md.renderer.rules.link_open ??
    ((tokens, idx, opts, _env, self) => self.renderToken(tokens, idx, opts));
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const href = String(tokens[idx].attrGet("href") ?? "");
    if (/^https?:\/\//i.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer");
    }
    return lienDefaut(tokens, idx, opts, env, self);
  };

  // --- Tableaux : encapsulés pour pouvoir défiler horizontalement sur mobile ---
  md.renderer.rules.table_open = () => '<div class="table-wrap"><table>';
  md.renderer.rules.table_close = () => "</table></div>";

  // --- Le cœur : tous les blocs ``` (standards ET maison) ---
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const info = (token.info || "").trim();
    const [motCle = "", ...reste] = info.split(/\s+/);
    const modificateur = reste.join(" ");
    const contenu = token.content;
    const type = motCle.toLowerCase();

    // Encadrés d'alerte. On accepte "alert-error" et la coquille "alert error".
    const niveauAlerte =
      type === "alert"
        ? modificateur.toLowerCase() || "info"
        : type.startsWith("alert-")
          ? type.slice("alert-".length)
          : null;

    if (niveauAlerte !== null) {
      const niveau = ["info", "warning", "error", "success"].includes(niveauAlerte)
        ? niveauAlerte
        : "info";
      const etiquette = { info: "Info", warning: "Attention", error: "Important", success: "Bravo" }[
        niveau as "info" | "warning" | "error" | "success"
      ];
      return `<div class="encadre encadre--${niveau}"><div class="encadre__titre">${etiquette}</div><div class="encadre__corps">${rendreInterne(contenu)}</div></div>\n`;
    }

    switch (type) {
      case "story":
        return `<div class="encadre encadre--story"><div class="encadre__titre">Le récit</div><div class="encadre__corps">${rendreInterne(contenu)}</div></div>\n`;

      case "xtext":
        return `<div class="encadre encadre--note encadre--${modificateur ? slugSimple(modificateur) : "note"}"><div class="encadre__corps">${rendreInterne(contenu)}</div></div>\n`;

      case "solution":
        return `<details class="solution"><summary>Voir la solution</summary><div class="solution__corps">${rendreInterne(contenu)}</div></details>\n`;

      case "tabs":
      case "columns": {
        const parties = decouperParSeparateur(contenu);
        if (parties.length === 0) return rendreInterne(contenu);

        if (type === "columns") {
          const cols = parties
            .map((p) => `<div class="colonne">${rendreInterne(p.corps)}</div>`)
            .join("");
          return `<div class="colonnes">${cols}</div>\n`;
        }

        // Onglets : pilotés en CSS pur (input radio + label), donc sans JavaScript.
        const groupe = `onglets-${++compteurOnglets}`;
        const radios = parties
          .map(
            (p, i) =>
              `<input type="radio" name="${groupe}" id="${groupe}-${i}" class="onglets__radio"${i === 0 ? " checked" : ""}>`,
          )
          .join("");
        const labels = parties
          .map(
            (p, i) =>
              `<label class="onglets__label" for="${groupe}-${i}">${echapper(p.label || `Onglet ${i + 1}`)}</label>`,
          )
          .join("");
        const panneaux = parties
          .map((p) => `<div class="onglets__panneau">${rendreInterne(p.corps)}</div>`)
          .join("");
        return `<div class="onglets" data-onglets="${parties.length}">${radios}<div class="onglets__barre">${labels}</div><div class="onglets__panneaux">${panneaux}</div></div>\n`;
      }

      case "stepper": {
        const etapes = decouperParEtapes(contenu);
        if (etapes.length === 0) return rendreInterne(contenu);
        const items = etapes
          .map(
            (e, i) =>
              `<li class="etape"><div class="etape__puce">${i + 1}</div><div class="etape__contenu">${e.label ? `<h4 class="etape__titre">${echapper(e.label)}</h4>` : ""}${rendreInterne(e.corps)}</div></li>`,
          )
          .join("");
        return `<ol class="etapes">${items}</ol>\n`;
      }

      case "resource":
      case "ressource": {
        // Format : URL en 1re ligne, puis éventuellement "# Titre", puis la description.
        const lignes = contenu.split("\n");
        const url = (lignes.shift() ?? "").trim();
        let titre = "";
        while (lignes.length && !lignes[0].trim()) lignes.shift();
        if (lignes.length && lignes[0].startsWith("# ")) {
          titre = lignes.shift()!.slice(2).trim();
        }
        const description = lignes.join("\n").trim();
        let hote = "";
        try {
          hote = new URL(url).hostname.replace(/^www\./, "");
        } catch {
          hote = "";
        }
        return `<a class="ressource" href="${echapper(url)}" target="_blank" rel="noopener noreferrer">
  <div class="ressource__icone">↗</div>
  <div class="ressource__texte">
    <div class="ressource__titre">${echapper(titre || url)}</div>
    ${description ? `<div class="ressource__desc">${rendreInterne(description)}</div>` : ""}
    ${hote ? `<div class="ressource__hote">${echapper(hote)}</div>` : ""}
  </div>
</a>\n`;
      }

      case "youtube": {
        const url = contenu.trim().split("\n")[0].trim();
        const id = extraireIdYoutube(url);
        return `<a class="video-lien" href="${echapper(url)}" target="_blank" rel="noopener noreferrer">
  <div class="video-lien__play">▶</div>
  <div class="video-lien__texte">
    <div class="video-lien__titre">Vidéo YouTube${id ? "" : ""}</div>
    <div class="video-lien__url">${echapper(url)}</div>
  </div>
</a>\n`;
      }

      case "quests": {
        // Renvois vers d'autres quêtes : une liste d'identifiants séparés par des virgules.
        const ids = contenu
          .split(/[\s,]+/)
          .map((x) => parseInt(x, 10))
          .filter((n) => Number.isFinite(n));
        const items = ids
          .map((id) => {
            const lien = options.lienVersQuete?.(id);
            return lien
              ? `<li><a href="${lien}">Quête ${id}</a></li>`
              : `<li>Quête ${id} <span class="muet">(hors archive)</span></li>`;
          })
          .join("");
        return `<div class="renvois"><div class="renvois__titre">Quêtes liées</div><ul>${items}</ul></div>\n`;
      }

      case "mermaid":
        // Rendu par mermaid.js, embarqué localement dans le site (aucun CDN).
        return `<pre class="mermaid">${echapper(contenu)}</pre>\n`;

      default: {
        // Bloc de code classique.
        const langue = type;
        const etiquette = langue && langue !== "plaintext" ? langue : "";
        return `<div class="bloc-code">${etiquette ? `<div class="bloc-code__langue">${echapper(etiquette)}</div>` : ""}<pre><code class="hljs language-${echapper(langue || "plaintext")}">${colorer(contenu, langue)}</code></pre></div>\n`;
      }
    }
  };

  return md;
}

function slugSimple(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function extraireIdYoutube(url: string): string | null {
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/embed\/([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

/**
 * Relève toutes les images d'un cours, qu'elles soient en syntaxe Markdown ![](...)
 * ou en balise HTML <img src="...">. Conserve le texte alternatif quand il existe :
 * c'est lui qui servira à donner un nom de fichier compréhensible.
 */
export function releverImages(markdown: string): ImageTrouvee[] {
  const trouvees: ImageTrouvee[] = [];
  const vues = new Set<string>();

  const ajouter = (url: string, alt: string) => {
    const propre = url.trim().replace(/^<|>$/g, "");
    if (!propre || propre.startsWith("data:")) return;
    const cle = propre + "|" + alt;
    if (vues.has(cle)) return;
    vues.add(cle);
    trouvees.push({ urlOrigine: propre, alt: (alt || "").trim() });
  };

  // ![alt](url "titre optionnel")
  for (const m of markdown.matchAll(/!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g)) {
    ajouter(m[2], m[1]);
  }
  // <img src="..." alt="...">
  // Le délimiteur est capturé puis réutilisé (\1) : un attribut entre guillemets
  // doubles peut contenir une apostrophe, comme alt="Capture d'écran de l'installeur".
  for (const m of markdown.matchAll(/<img\b[^>]*>/gi)) {
    const balise = m[0];
    const src = balise.match(/\bsrc=(["'])(.*?)\1/i);
    const alt = balise.match(/\balt=(["'])(.*?)\1/i);
    if (src) ajouter(src[2], alt ? alt[2] : "");
  }

  return trouvees;
}
