/**
 * Outils de nommage : transforme un texte quelconque en nom de fichier/dossier propre.
 * Exemple : "04.1 - Les bases de la modélisation : MCD" -> "04-1-les-bases-de-la-modelisation-mcd"
 */

/** Enlève les accents et remplace tout ce qui n'est pas alphanumérique par un tiret. */
export function slugify(texte: string, longueurMax = 60): string {
  const base = (texte || "")
    .normalize("NFD") // décompose les accents (é -> e + accent)
    .replace(/[̀-ͯ]/g, "") // supprime les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // tout le reste devient un tiret
    .replace(/^-+|-+$/g, "") // pas de tiret au début ni à la fin
    .replace(/-{2,}/g, "-"); // jamais deux tirets de suite

  if (!base) return "sans-titre";
  if (base.length <= longueurMax) return base;
  // On coupe proprement sur un tiret plutôt qu'au milieu d'un mot
  const coupe = base.slice(0, longueurMax);
  const dernierTiret = coupe.lastIndexOf("-");
  return dernierTiret > longueurMax * 0.6 ? coupe.slice(0, dernierTiret) : coupe;
}

/** Numérote sur 3 chiffres : 1 -> "001" */
export function numero(n: number): string {
  return String(n).padStart(3, "0");
}

/** Garantit un nom unique dans un ensemble déjà utilisé (ajoute -2, -3...). */
export function nomUnique(souhaite: string, dejaPris: Set<string>): string {
  if (!dejaPris.has(souhaite)) {
    dejaPris.add(souhaite);
    return souhaite;
  }
  let i = 2;
  const point = souhaite.lastIndexOf(".");
  const base = point > 0 ? souhaite.slice(0, point) : souhaite;
  const ext = point > 0 ? souhaite.slice(point) : "";
  while (dejaPris.has(`${base}-${i}${ext}`)) i++;
  const final = `${base}-${i}${ext}`;
  dejaPris.add(final);
  return final;
}
