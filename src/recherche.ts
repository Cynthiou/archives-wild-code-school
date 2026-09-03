/**
 * Recherche locale dans toute l'archive.
 *
 * Contrainte : le site doit fonctionner en ouvrant un fichier depuis le disque
 * (file://). Or dans ce mode, un `fetch()` vers un fichier JSON est bloqué par
 * le navigateur. On écrit donc l'index dans un fichier .js qui se déclare lui-même
 * (`window.INDEX_RECHERCHE = [...]`), chargé par une balise <script> : ça, ça marche
 * aussi bien depuis le disque que depuis un hébergeur.
 *
 * L'index contient le texte complet des cours : chercher « JOIN » retrouve donc
 * les quêtes où le mot apparaît, y compris à l'intérieur des blocs de code.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

export interface EntreeIndex {
  /** titre */ t: string;
  /** thème */ h: string;
  /** url relative depuis la racine du site */ u: string;
  /** contenu du cours, tel quel : c'est lui qui s'affiche dans les extraits */ c: string;
}

/** Minuscules, sans accents : pour que « modélisation » réponde à « modelisation ». */
export function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Allège le Markdown sans perdre les mots : on garde le code, on jette le balisage. */
function texteCherchable(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/<[^>]+>/g, " ") // balises HTML
    .replace(/^!---.*$/gm, " ") // séparateurs d'onglets
    .replace(/```[a-zA-Z-]*\s*$/gm, " ") // lignes d'ouverture/fermeture de bloc
    .replace(/[#*_>`|]/g, " ") // ponctuation de balisage
    .replace(/\s+/g, " ")
    .trim();
}

export async function ecrireIndexRecherche(
  dossierSite: string,
  quetes: { titre: string; theme: string; dossier: string }[],
): Promise<{ entrees: number; octets: number }> {
  const index: EntreeIndex[] = [];

  for (const q of quetes) {
    let contenu = "";
    try {
      contenu = await fs.readFile(path.join(dossierSite, q.dossier, "cours.md"), "utf8");
    } catch {
      /* quête sans fichier : on l'indexe quand même sur son titre */
    }
    index.push({
      t: q.titre,
      h: q.theme,
      u: `${q.dossier}/index.html`,
      c: texteCherchable(contenu).slice(0, 40000),
    });
  }

  const contenuJs = `/* Index de recherche — généré automatiquement, ne pas modifier à la main. */\nwindow.INDEX_RECHERCHE = ${JSON.stringify(index)};\n`;

  const cible = path.join(dossierSite, "assets", "recherche-index.js");
  await fs.mkdir(path.dirname(cible), { recursive: true });
  await fs.writeFile(cible, contenuJs, "utf8");

  return { entrees: index.length, octets: Buffer.byteLength(contenuJs) };
}

/**
 * Le petit moteur côté page. Volontairement court et sans bibliothèque :
 * il filtre l'index et affiche les résultats avec un extrait autour du mot trouvé.
 */
export const SCRIPT_RECHERCHE = String.raw`
(function () {
  var champ = document.getElementById('recherche');
  var zone = document.getElementById('resultats');
  var grille = document.getElementById('grille-themes');
  var compteur = document.getElementById('compte-resultats');
  if (!champ || !zone || !window.INDEX_RECHERCHE) return;

  var MAX_AFFICHES = 50;

  function normaliser(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // Le texte des cours est conservé tel quel dans l'index (pour de beaux extraits).
  // On en calcule ici, une seule fois, une version sans accents pour la recherche.
  var NORM = window.INDEX_RECHERCHE.map(function (e) {
    return { t: normaliser(e.t), c: normaliser(e.c) };
  });

  champ.disabled = false;
  champ.placeholder = 'Rechercher dans les ' + window.INDEX_RECHERCHE.length + ' quêtes…';

  function echapper(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // "contenu" est le texte d'origine, "norme" sa version sans accents : les deux
  // ont la même longueur, la position trouvée dans l'un vaut pour l'autre.
  function extrait(contenu, norme, mot) {
    var i = norme.indexOf(mot);
    if (i === -1) return '';
    var debut = Math.max(0, i - 70);
    var fin = Math.min(contenu.length, i + mot.length + 110);
    var prefixe = debut > 0 ? '…' : '';
    var bout = prefixe + contenu.slice(debut, fin) + (fin < contenu.length ? '…' : '');
    var pos = i - debut + prefixe.length;
    return echapper(bout.slice(0, pos)) + '<mark>' + echapper(bout.slice(pos, pos + mot.length)) + '</mark>' + echapper(bout.slice(pos + mot.length));
  }

  var minuteur;
  champ.addEventListener('input', function () {
    clearTimeout(minuteur);
    minuteur = setTimeout(chercher, 120);
  });

  function chercher() {
    var requete = normaliser(champ.value.trim());

    if (requete.length < 2) {
      zone.innerHTML = '';
      zone.hidden = true;
      if (grille) grille.hidden = false;
      if (compteur) compteur.textContent = '';
      return;
    }

    var mots = requete.split(/\s+/).filter(Boolean);
    var trouves = [];

    for (var i = 0; i < window.INDEX_RECHERCHE.length; i++) {
      var n = NORM[i];
      var tous = true;
      for (var j = 0; j < mots.length; j++) {
        if (n.t.indexOf(mots[j]) === -1 && n.c.indexOf(mots[j]) === -1) { tous = false; break; }
      }
      if (!tous) continue;
      // Une correspondance dans le titre passe devant.
      var score = n.t.indexOf(mots[0]) !== -1 ? 0 : 1;
      trouves.push({ e: window.INDEX_RECHERCHE[i], n: n, score: score });
    }

    trouves.sort(function (a, b) { return a.score - b.score || a.e.t.localeCompare(b.e.t, 'fr'); });

    if (grille) grille.hidden = true;
    zone.hidden = false;

    if (!trouves.length) {
      zone.innerHTML = '<p class="aucun-resultat">Aucune quête ne contient « ' + echapper(champ.value.trim()) + ' ».</p>';
      if (compteur) compteur.textContent = '';
      return;
    }

    var affiches = Math.min(trouves.length, MAX_AFFICHES);
    if (compteur) {
      compteur.textContent =
        trouves.length + (trouves.length > 1 ? ' quêtes trouvées' : ' quête trouvée') +
        (trouves.length > affiches ? ' — les ' + affiches + ' plus pertinentes ci-dessous' : '');
    }

    var html = '<ul class="resultats">';
    for (var k = 0; k < affiches; k++) {
      var e = trouves[k].e;
      var ex = extrait(e.c, trouves[k].n.c, mots[0]);
      html += '<li class="resultat"><a href="' + e.u + '">' +
        '<span class="resultat__theme">' + echapper(e.h) + '</span>' +
        '<span class="resultat__titre">' + echapper(e.t) + '</span>' +
        (ex ? '<span class="resultat__extrait">' + ex + '</span>' : '') +
        '</a></li>';
    }
    zone.innerHTML = html + '</ul>';
  }

  // Raccourci : la touche « / » place le curseur dans la recherche.
  document.addEventListener('keydown', function (ev) {
    if (ev.key === '/' && document.activeElement !== champ) {
      ev.preventDefault();
      champ.focus();
    }
  });
})();
`;
