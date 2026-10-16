"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
};

export function SpotlightLink({
  href,
  className,
  children,
  external = false,
}: SpotlightLinkProps) {
  function onMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`,
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("spotlight", className)}
      onMouseMove={onMouseMove}
    >
      {children}
    </a>
  );
}
