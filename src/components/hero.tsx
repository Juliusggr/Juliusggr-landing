import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/starfield";
import { site } from "@/content/site";
import portrait from "../../img/vice.png";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-24"
    >
      <Starfield />
      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="order-2 lg:order-1">
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
            <Button
              nativeButton={false}
              render={<a href="#proyectos" />}
              size="lg"
            >
              Ver proyectos
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#contacto" />}
              variant="outline"
              size="lg"
            >
              Contactar
              <Mail data-icon="inline-end" className="size-4" />
            </Button>
          </div>
        </div>
        <div className="animate-fade-up relative aspect-[4/5] w-36 justify-self-start overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-sm sm:w-52 lg:order-2 lg:w-72 lg:justify-self-end">
          <Image
            src={portrait}
            alt={`Retrato de ${site.name}`}
            fill
            preload
            sizes="(min-width: 1024px) 1280px, (min-width: 640px) 900px, 640px"
            className="object-cover object-[58%_42%]"
          />
        </div>
      </div>
    </section>
  );
}
