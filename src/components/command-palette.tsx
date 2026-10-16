"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { copyText } from "@/lib/clipboard";
import { runWithThemeTransition } from "@/lib/theme-transition";
import { cn } from "@/lib/utils";

type CommandAction = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(
  null,
);

function useCommandPalette() {
  const value = useContext(CommandPaletteContext);
  if (!value) {
    throw new Error("CommandPaletteProvider is required");
  }
  return value;
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function useIsMac() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
  }, []);

  return isMac;
}

export function CommandShortcut({ className }: { className?: string }) {
  const { setOpen } = useCommandPalette();
  const isMac = useIsMac();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-keyshortcuts="Control+K Meta+K"
      aria-label="Abrir paleta de comandos"
      className={cn(
        "rounded-md border border-zinc-200 bg-zinc-100/50 px-1.5 py-0.5 font-mono text-xs tracking-tight text-muted-foreground transition-colors duration-150 hover:border-zinc-300 hover:text-foreground dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700",
        className,
      )}
    >
      <span suppressHydrationWarning>{isMac ? "⌘K" : "Ctrl K"}</span>
    </button>
  );
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredRef = useRef<CommandAction[]>([]);
  const selectedRef = useRef(0);

  const actions = useMemo<CommandAction[]>(() => {
    function close() {
      setOpen(false);
    }

    function goTo(id: string) {
      close();
      const target = document.getElementById(id);
      if (!target) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", `#${id}`);
    }

    return [
      {
        id: "go-about",
        group: "Navegación",
        label: "Ir a Sobre mí",
        run: () => goTo("sobre-mi"),
      },
      {
        id: "go-projects",
        group: "Navegación",
        label: "Ir a Proyectos",
        run: () => goTo("proyectos"),
      },
      {
        id: "go-contact",
        group: "Navegación",
        label: "Ir a Contacto",
        run: () => goTo("contacto"),
      },
      {
        id: "copy-email",
        group: "Contacto",
        label: "Copiar correo",
        hint: site.email,
        run: () => {
          void copyText(site.email).then((didCopy) => {
            setNotice(didCopy ? "Correo copiado" : "No se pudo copiar el correo");
            close();
          });
        },
      },
      {
        id: "send-email",
        group: "Contacto",
        label: "Enviar correo directo",
        hint: site.email,
        run: () => {
          close();
          window.location.href = site.mailto;
        },
      },
      {
        id: "open-github",
        group: "Enlaces",
        label: "Abrir GitHub",
        hint: `@${site.githubUser}`,
        run: () => {
          close();
          window.open(site.socials.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "open-x",
        group: "Enlaces",
        label: "Abrir X / Twitter",
        hint: `@${site.brand}`,
        run: () => {
          close();
          window.open(site.socials.x, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "toggle-theme",
        group: "Preferencias",
        label: "Alternar tema claro / oscuro",
        hint: resolvedTheme === "dark" ? "Oscuro" : "Claro",
        run: () => {
          const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
          close();
          window.setTimeout(() => {
            runWithThemeTransition(() => setTheme(nextTheme));
          }, 40);
        },
      },
    ];
  }, [resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return actions;
    return actions.filter((action) => {
      const haystack = normalize(
        `${action.label} ${action.hint ?? ""} ${action.group}`,
      );
      return haystack.includes(needle);
    });
  }, [actions, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const frame = window.setTimeout(() => inputRef.current?.focus(), 30);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  filteredRef.current = filtered;
  selectedRef.current =
    filtered.length === 0 ? 0 : Math.min(activeIndex, filtered.length - 1);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      const items = filteredRef.current;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          items.length === 0 ? 0 : (current + 1) % items.length,
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          items.length === 0
            ? 0
            : (current - 1 + items.length) % items.length,
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        const index = Math.min(
          selectedRef.current,
          Math.max(items.length - 1, 0),
        );
        items[index]?.run();
      }
    }

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [open]);

  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(null), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectedIndex =
    filtered.length === 0
      ? 0
      : Math.min(activeIndex, filtered.length - 1);

  useEffect(() => {
    if (!open || filtered.length === 0) return;

    const action = filtered[selectedIndex];
    if (!action) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`command-option-${action.id}`)?.scrollIntoView({
        block: "nearest",
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, selectedIndex, filtered]);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open],
  );

  const groups = filtered.reduce<string[]>((list, action) => {
    if (!list.includes(action.group)) list.push(action.group);
    return list;
  }, []);

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-zinc-950/30 px-4 pt-[16vh] backdrop-blur-sm"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
            className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white/95 shadow-md backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 dark:shadow-sm"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar acciones…"
              aria-controls="command-list"
              aria-activedescendant={
                filtered[selectedIndex]
                  ? `command-option-${filtered[selectedIndex].id}`
                  : undefined
              }
              className="w-full border-b border-zinc-200 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground dark:border-zinc-800"
            />
            <ul
              id="command-list"
              role="listbox"
              aria-label="Acciones"
              className="max-h-80 overflow-y-auto p-2"
            >
              {filtered.length === 0 ? (
                <li className="px-2 py-6 text-center font-mono text-xs tracking-tight text-muted-foreground">
                  Sin resultados
                </li>
              ) : (
                groups.map((group) => (
                  <li key={group} className="mb-1 last:mb-0">
                    <p className="px-2 py-1.5 font-mono text-xs tracking-tight text-muted-foreground">
                      {group}
                    </p>
                    <ul>
                      {filtered.map((action, index) =>
                        action.group === group ? (
                          <li key={action.id}>
                            <button
                              id={`command-option-${action.id}`}
                              type="button"
                              role="option"
                              aria-selected={index === selectedIndex}
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={() => action.run()}
                              className={cn(
                                "flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors duration-150",
                                index === selectedIndex
                                  ? "bg-zinc-100 font-medium text-foreground ring-1 ring-zinc-300/80 dark:bg-zinc-800 dark:ring-zinc-700"
                                  : "text-foreground/90 hover:bg-zinc-50 dark:hover:bg-zinc-900/60",
                              )}
                            >
                              <span>{action.label}</span>
                              {action.hint ? (
                                <span
                                  className={cn(
                                    "truncate font-mono text-xs tracking-tight",
                                    index === selectedIndex
                                      ? "text-foreground/70 dark:text-muted-foreground"
                                      : "text-muted-foreground",
                                  )}
                                >
                                  {action.hint}
                                </span>
                              ) : null}
                            </button>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
      {notice ? (
        <p
          role="status"
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-md border border-zinc-200 bg-zinc-50/90 px-3 py-1.5 font-mono text-xs tracking-tight text-foreground shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90"
        >
          {notice}
        </p>
      ) : null}
    </CommandPaletteContext.Provider>
  );
}
