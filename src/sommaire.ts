/**
 * Ancres et sommaire automatique.
 *
 * Les cours de la Wild contiennent un titre « ## Sommaire » suivi… de rien du
 * tout : c'est la plateforme qui y insère la table des matières au moment de
 * l'affichage. Sans ce traitement, l'archive garderait un titre vide et perdrait
 * un repère important pour se situer dans un long cours.
 *
 * On fait donc deux choses :
 *   1. donner une ancre (#identifiant) à chaque titre de section ;
 *   2. remplir le « Sommaire » avec la liste cliquable des sections qui suivent.
 *
 * Si le cours n'a pas de « Sommaire », on n'ajoute rien : on ne réécrit pas le
 * cours, on ne fait que rétablir ce que la plateforme affichait.
 */

import { slugify } from "./slug.js";

interface TitreTrouve {
  niveau: number;
  texte: string;
  id: string;
  position: number;
  balise: string;
}

/** Retire les balises d'un fragment HTML pour n'en garder que le texte. */
function texteSeul(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function ajouterAncresEtSommaire(html: string): { html: string; sommaire: boolean; titres: number } {
  const pris = new Set<string>();
  const titres: TitreTrouve[] = [];

  // On ne prend que les titres du fil du cours : ceux que nous générons pour
  // les étapes ou les onglets portent une classe, et sont donc ignorés.
  const motif = /<h([234])>([\s\S]*?)<\/h\1>/g;
  let m: RegExpExecArray | null;
  while ((m = motif.exec(html)) !== null) {
    const texte = texteSeul(m[2]);
    if (!texte) continue;
    let id = "t-" + slugify(texte, 60);
    let n = 2;
    while (pris.has(id)) id = `t-${slugify(texte, 55)}-${n++}`;
    pris.add(id);
    titres.push({ niveau: Number(m[1]), texte, id, position: m.index, balise: m[0] });
  }

  if (!titres.length) return { html, sommaire: false, titres: 0 };

  // 1. Ancres
  let resultat = html;
  for (const t of titres) {
    const avec = `<h${t.niveau} id="${t.id}">${t.balise.slice(`<h${t.niveau}>`.length, -`</h${t.niveau}>`.length)}</h${t.niveau}>`;
    resultat = resultat.replace(t.balise, avec);
  }

  // 2. Sommaire : on cherche le titre qui s'appelle « Sommaire »
  const indexSommaire = titres.findIndex((t) => /^sommaire$/i.test(t.texte));
  if (indexSommaire === -1) return { html: resultat, sommaire: false, titres: titres.length };

  const suivants = titres.slice(indexSommaire + 1).filter((t) => t.niveau <= 3);
  if (!suivants.length) return { html: resultat, sommaire: false, titres: titres.length };

  // Construction de la liste, avec un niveau d'imbrication pour les sous-sections
  let liste = "";
  let sousListeOuverte = false;
  for (const t of suivants) {
    if (t.niveau === 2) {
      if (sousListeOuverte) {
        liste += "</ul></li>";
        sousListeOuverte = false;
      } else if (liste) {
        liste += "</li>";
      }
      liste += `<li><a href="#${t.id}">${t.texte}</a>`;
    } else {
      if (!sousListeOuverte) {
        if (!liste) liste += "<li>";
        liste += "<ul>";
        sousListeOuverte = true;
      }
      liste += `<li><a href="#${t.id}">${t.texte}</a></li>`;
    }
  }
  if (sousListeOuverte) liste += "</ul>";
  if (liste) liste += "</li>";

  const bloc = `<nav class="sommaire" aria-label="Sommaire de la quête"><ol class="sommaire__liste">${liste}</ol></nav>`;
  const titreSommaire = titres[indexSommaire];
  const balisAvecId = `<h${titreSommaire.niveau} id="${titreSommaire.id}">`;
  const positionFin = resultat.indexOf(`</h${titreSommaire.niveau}>`, resultat.indexOf(balisAvecId));

  if (positionFin === -1) return { html: resultat, sommaire: false, titres: titres.length };

  const apres = positionFin + `</h${titreSommaire.niveau}>`.length;
  resultat = resultat.slice(0, apres) + "\n" + bloc + resultat.slice(apres);

  return { html: resultat, sommaire: true, titres: titres.length };
}
