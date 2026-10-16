import { CommandShortcut } from "@/components/command-palette";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a
          href="#inicio"
          className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 sm:text-xl"
        >
          {site.brand}
        </a>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principal">
          <SiteNav />
          <CommandShortcut />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
