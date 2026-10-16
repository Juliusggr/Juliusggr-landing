type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => void;
};

export function runWithThemeTransition(update: () => void) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const startViewTransition = (document as ViewTransitionDocument)
    .startViewTransition;

  if (!reduceMotion && typeof startViewTransition === "function") {
    startViewTransition.call(document, update);
    return;
  }

  update();
}
