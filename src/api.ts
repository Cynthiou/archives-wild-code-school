/**
 * Client de l'API Odyssey.
 *
 * On utilise exactement les mêmes adresses que l'application du site, avec le
 * jeton de session lu dans le navigateur. Rien n'est contourné : ce sont les
 * requêtes que ton navigateur ferait de toute façon en consultant tes cours.
 *
 * Le client reste poli : peu de requêtes à la fois, une pause entre chacune,
 * un nombre d'essais limité, et un abandon propre en cas d'erreur persistante.
 */

const BASE = "https://api.wildcodeschool.com/api/v3";

export interface Quete {
  id: number;
  titre: string;
  themeId: number;
  themeNom: string;
  themeSlug: string;
}

export interface Theme {
  id: number;
  slug: string;
  nom: string;
  description: string;
  nbQuetes: number;
  /** Couleur officielle du thème sur la plateforme (ex. "#F7A356"). */
  couleur: string;
  /** Icône du thème, hébergée par la plateforme : on la télécharge à l'archivage. */
  iconeUrl: string | null;
}

export interface Chapitre {
  id: number;
  type: string;
  langue: string;
  markdown: string;
  majLe: string | null;
}

export interface DetailQuete {
  id: number;
  titre: string;
  titres: Record<string, string>;
  theme: { id: number; slug: string; nom: string };
  creeLe: string;
  difficulte: string;
  dureeEstimee: number | null;
  modeValidation: string;
  chapitres: Chapitre[];
}

export interface RessourceQuete {
  link: string;
  description: string;
}

export interface Replay {
  id: number;
  titre: string;
  categorie: string;
  source: string;
  dureeMinutes: number;
  enregistreLe: string | null;
  description: string;
  urlTelechargement: string | null;
}

export class ApiOdyssey {
  constructor(
    private readonly jeton: string,
    private readonly options: { tentatives?: number; delaiMs?: number; timeoutMs?: number } = {},
  ) {}

  private async requete<T>(chemin: string): Promise<T> {
    const { tentatives = 3, timeoutMs = 25000 } = this.options;
    let derniere: unknown;

    for (let essai = 1; essai <= tentatives; essai++) {
      const ctrl = new AbortController();
      const minuteur = setTimeout(() => ctrl.abort(), timeoutMs);
      try {
        const r = await fetch(BASE + chemin, {
          signal: ctrl.signal,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${this.jeton}`,
          },
        });

        if (r.status === 401 || r.status === 403) {
          throw new Error(
            "Session expirée ou refusée par la plateforme. Relance la commande pour te reconnecter.",
          );
        }
        // 429 = trop de requêtes : on attend nettement plus longtemps.
        if (r.status === 429) {
          await pause(5000 * essai);
          throw new Error("HTTP 429 (trop de requêtes)");
        }
        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        return (await r.json()) as T;
      } catch (e) {
        derniere = e;
        if (e instanceof Error && e.message.startsWith("Session expirée")) throw e;
        if (essai < tentatives) await pause(400 * 2 ** (essai - 1));
      } finally {
        clearTimeout(minuteur);
      }
    }

    throw derniere instanceof Error ? derniere : new Error(String(derniere));
  }

  /** Vérifie que le jeton fonctionne et renvoie le prénom du compte. */
  async verifier(): Promise<string> {
    const p = await this.requete<{ firstname?: string; lastname?: string }>("/profile");
    return [p.firstname, p.lastname].filter(Boolean).join(" ") || "compte inconnu";
  }

  async themes(): Promise<Theme[]> {
    const bruts = await this.requete<
      {
        id: number;
        slug: string;
        name_translations: Record<string, string>;
        description_translations: Record<string, string> | null;
        quests_count: number;
        color: string | null;
        icon_url: string | null;
      }[]
    >("/topics");

    return bruts.map((t) => ({
      id: t.id,
      slug: t.slug,
      nom: t.name_translations?.fr || t.name_translations?.en || `Thème ${t.id}`,
      description: (t.description_translations?.fr || t.description_translations?.en || "")
        .replace(/\*\*/g, "")
        .trim(),
      nbQuetes: t.quests_count ?? 0,
      couleur: t.color && /^#[0-9a-f]{3,8}$/i.test(t.color) ? t.color : "#5b7080",
      iconeUrl: t.icon_url || null,
    }));
  }

  /** La totalité des quêtes accessibles au compte, en une seule requête. */
  async quetes(): Promise<Quete[]> {
    const r = await this.requete<{
      total: number;
      quests: {
        id: number;
        title_translations: Record<string, string>;
        topic: { id: number; slug: string; name_translations: Record<string, string> } | null;
      }[];
    }>("/quests?per_page=500");

    return r.quests.map((q) => ({
      id: q.id,
      titre: q.title_translations?.fr || q.title_translations?.en || `Quête ${q.id}`,
      themeId: q.topic?.id ?? 0,
      themeNom: q.topic?.name_translations?.fr || q.topic?.name_translations?.en || "Sans thème",
      themeSlug: q.topic?.slug ?? "sans-theme",
    }));
  }

  async detailQuete(id: number): Promise<DetailQuete> {
    const d = await this.requete<{
      id: number;
      title_translations: Record<string, string>;
      topic: { id: number; slug: string; name_translations: Record<string, string> };
      created_at: string;
      estimated_difficulty: string;
      estimated_time: number | null;
      validation_mode: string;
      chapters: {
        id: number;
        chapter_type: string;
        content_translations: Record<string, string> | null;
        updated_at: string;
      }[];
    }>(`/quests/${id}`);

    return {
      id: d.id,
      titre: d.title_translations?.fr || d.title_translations?.en || `Quête ${d.id}`,
      titres: d.title_translations ?? {},
      theme: {
        id: d.topic?.id ?? 0,
        slug: d.topic?.slug ?? "sans-theme",
        nom: d.topic?.name_translations?.fr || d.topic?.name_translations?.en || "Sans thème",
      },
      creeLe: d.created_at,
      difficulte: d.estimated_difficulty ?? "",
      dureeEstimee: d.estimated_time,
      modeValidation: d.validation_mode ?? "",
      chapitres: (d.chapters ?? []).map((c) => {
        const trads = c.content_translations ?? {};
        const langue = trads.fr ? "fr" : Object.keys(trads)[0] || "fr";
        return {
          id: c.id,
          type: c.chapter_type,
          langue,
          markdown: trads[langue] ?? "",
          majLe: c.updated_at ?? null,
        };
      }),
    };
  }

  async ressourcesQuete(id: number): Promise<RessourceQuete[]> {
    try {
      const r = await this.requete<{ link: string; description: string }[]>(`/quests/${id}/resources`);
      return (r ?? []).map((x) => ({ link: x.link, description: x.description ?? "" }));
    } catch {
      return []; // une quête sans ressource ne doit pas faire échouer l'archivage
    }
  }

  /**
   * Les replays vidéo. Les URLs de téléchargement fournies par la plateforme
   * sont signées et expirent au bout d'une heure : il faut donc les redemander
   * juste avant de télécharger, jamais les stocker pour plus tard.
   */
  async replays(): Promise<Replay[]> {
    const r = await this.requete<{
      total: number;
      videos: {
        id: number;
        title: string;
        category: string;
        source: string;
        duration: number;
        recorded_at: string | null;
        description: string;
        public_url: string | null;
      }[];
    }>("/videos?per_page=500");

    return r.videos.map((v) => ({
      id: v.id,
      titre: v.title,
      categorie: v.category,
      source: v.source,
      dureeMinutes: v.duration ?? 0,
      enregistreLe: v.recorded_at,
      description: v.description ?? "",
      urlTelechargement: v.public_url,
    }));
  }
}

export function pause(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
