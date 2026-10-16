import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Starfield } from "@/components/starfield";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import portrait from "../../img/vicefoto.jpg";

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
            <a
              href="#proyectos"
              data-slot="button"
              className={buttonVariants({ size: "lg" })}
            >
              Ver proyectos
              <ArrowRight data-icon="inline-end" className="size-4" />
            </a>
            <a
              href="#contacto"
              data-slot="button"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border border-zinc-200 bg-transparent transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-transparent dark:hover:bg-zinc-900",
              )}
            >
              Contactar
              <Mail data-icon="inline-end" className="size-4" />
            </a>
          </div>
        </div>
        <div className="animate-fade-up relative justify-self-start lg:order-2 lg:justify-self-end">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.28),rgba(96,165,250,0.2)_42%,transparent_70%)] opacity-0 blur-2xl dark:opacity-80"
          />
          <div className="relative aspect-square w-36 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/70 shadow-sm ring-1 ring-black/5 backdrop-blur-sm sm:w-52 lg:w-72 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:ring-white/10">
            <Image
              src={portrait}
              alt={`Retrato de ${site.name}`}
              fill
              preload
              quality={92}
              sizes="(min-width: 1024px) 288px, (min-width: 640px) 208px, 144px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
