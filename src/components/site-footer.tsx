import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © 2026 {site.brand} · {site.name}
        </p>
        <p>Web y desktop · Hecho con Next.js</p>
      </div>
    </footer>
  );
}
