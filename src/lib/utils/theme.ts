const THEME_STORAGE_KEY = "cf-theme";

export const syncThemeFromSettings = (): void => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  } catch {
    // ignore
  }
};
