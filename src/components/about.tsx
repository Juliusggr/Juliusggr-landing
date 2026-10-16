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
          <ul className="grid gap-6 border-t border-border/60 pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-6">
            {site.focus.map((item) => (
              <li key={item.label}>
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-zinc-200 bg-zinc-100/50 px-2.5 py-0.5 font-mono text-xs tracking-tight text-muted-foreground dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
