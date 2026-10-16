import { ExternalLink, Star } from "lucide-react";
import { site } from "@/content/site";
import {
  fetchPublicRepos,
  formatUpdatedAt,
  type GitHubRepo,
} from "@/lib/github";

const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C#": "#178600",
  CSS: "#663399",
  HTML: "#e34c26",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  Shell: "#89e051",
  Vue: "#41b883",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  "C++": "#f34b7d",
  C: "#555555",
};

const cardClassName =
  "rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 backdrop-blur-sm transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700";

function ProjectRow({ repo }: { repo: GitHubRepo }) {
  const languageColor = repo.language
    ? (languageColors[repo.language] ?? "#71717a")
    : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6 ${cardClassName}`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium text-foreground">{repo.name}</h3>
          <ExternalLink
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {repo.description ?? "Sin descripción"}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground sm:justify-end sm:pt-0.5">
        {repo.language && languageColor ? (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: languageColor }}
              aria-hidden
            />
            {repo.language}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1">
          <Star className="size-3" aria-hidden />
          {repo.stargazers_count}
        </span>
        <time dateTime={repo.updated_at}>
          {formatUpdatedAt(repo.updated_at)}
        </time>
      </div>
    </a>
  );
}

export async function Projects() {
  const result = await fetchPublicRepos();

  return (
    <section
      id="proyectos"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
              Proyectos
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Repositorios públicos de{" "}
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                github.com/{site.githubUser}
              </a>
              , ordenados por actividad reciente.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {result.status === "ok" ? (
            result.repos.map((repo) => (
              <ProjectRow key={repo.id} repo={repo} />
            ))
          ) : result.status === "empty" ? (
            <p className="py-10 text-sm text-muted-foreground">
              Aún no hay repositorios públicos para mostrar. Cuando publiques
              proyectos en GitHub, aparecerán aquí automáticamente.
            </p>
          ) : result.status === "rate_limited" ? (
            <p className="py-10 text-sm text-muted-foreground">
              {result.message}
            </p>
          ) : (
            <p className="py-10 text-sm text-muted-foreground">
              {result.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
