type ScrollToSectionOptions = {
  behavior?: ScrollBehavior;
  updateHash?: boolean;
};

/** Desplaza suavemente hasta un ancla en la misma página. */
export function scrollToSection(
  id: string,
  { behavior = "smooth", updateHash = true }: ScrollToSectionOptions = {},
): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior, block: "start" });

  if (updateHash) {
    window.history.pushState(null, "", `#${id}`);
  }

  return true;
}
