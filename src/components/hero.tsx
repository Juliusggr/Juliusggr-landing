import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/starfield";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-24"
    >
      <Starfield />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <p className="mb-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground animate-fade-up sm:text-6xl md:text-7xl">
          {site.brand}
        </p>
        <h1 className="max-w-2xl text-balance text-xl font-medium leading-snug tracking-tight text-foreground/90 animate-fade-up-delay sm:text-2xl md:text-3xl">
          {site.headline}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base text-muted-foreground animate-fade-up-delay-2 sm:text-lg">
          {site.tagline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up-delay-2">
          <Button render={<a href="#proyectos" />} size="lg">
            Ver proyectos
            <ArrowRight data-icon="inline-end" className="size-4" />
          </Button>
          <Button render={<a href="#contacto" />} variant="outline" size="lg">
            Contactar
            <Mail data-icon="inline-end" className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
