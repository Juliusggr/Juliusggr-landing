"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      return;
    } catch {
      // The Clipboard API can be blocked; fall back to a selection copy.
    }

    try {
      const field = document.createElement("textarea");
      field.value = site.email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      const didCopy = document.execCommand("copy");
      field.remove();
      setCopied(didCopy);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      aria-live="polite"
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "border border-zinc-200 bg-transparent transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-transparent dark:hover:bg-zinc-900",
      )}
    >
      {copied ? (
        <>
          <Check data-icon="inline-start" className="size-4" />
          ¡Copiado!
        </>
      ) : (
        <>
          <Copy data-icon="inline-start" className="size-4" />
          Copiar correo
        </>
      )}
    </button>
  );
}
