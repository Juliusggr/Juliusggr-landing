"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
] as const;

type SectionId = (typeof sections)[number]["id"];

export function SiteNav() {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let nextActive: SectionId | null = null;
        let bestRatio = 0;
        for (const section of sections) {
          const ratio = ratios.get(section.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextActive = section.id;
          }
        }
        setActiveId(nextActive);
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="mr-1 hidden items-center gap-1 sm:flex">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {section.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-2.5 -bottom-px h-px bg-foreground transition-opacity duration-150",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
