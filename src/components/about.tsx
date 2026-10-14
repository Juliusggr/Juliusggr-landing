import { site } from "@/content/site";

export function About() {
  return (
    <section
      id="sobre-mi"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
          Sobre mí
        </h2>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="grid gap-5 border-t border-border/60 pt-6 sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-6">
            {site.focus.map((item) => (
              <li key={item.label}>
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
