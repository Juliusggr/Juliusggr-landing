import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";

const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

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
          <ul className="mr-1 hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
