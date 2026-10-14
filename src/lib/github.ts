import { site } from "@/content/site";

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

export type ReposResult =
  | { status: "ok"; repos: GitHubRepo[] }
  | { status: "empty"; repos: [] }
  | { status: "rate_limited"; message: string }
  | { status: "error"; message: string };

const REPOS_URL = `https://api.github.com/users/${site.githubUser}/repos?sort=updated&per_page=100`;

export async function fetchPublicRepos(): Promise<ReposResult> {
  try {
    const response = await fetch(REPOS_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "juliusggr-landing",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 1800 },
    });

    if (response.status === 403 || response.status === 429) {
      return {
        status: "rate_limited",
        message:
          "GitHub limitó temporalmente las peticiones. Vuelve a intentarlo en unos minutos.",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        message: `No se pudieron cargar los proyectos (HTTP ${response.status}).`,
      };
    }

    const data = (await response.json()) as GitHubRepo[];
    const repos = data
      .filter((repo) => !repo.fork && !repo.archived)
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );

    if (repos.length === 0) {
      return { status: "empty", repos: [] };
    }

    return { status: "ok", repos };
  } catch {
    return {
      status: "error",
      message:
        "No se pudo conectar con GitHub. Comprueba tu conexión e inténtalo de nuevo.",
    };
  }
}

export function formatUpdatedAt(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
