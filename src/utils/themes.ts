const themes = ['abyss', 'silk'] as const;
type Theme = (typeof themes)[number];

/**
 * Sets the theme of the application by updating the data-theme attribute on the document's root element.
 * @param theme - The theme to set (as defined in the Theme type).
 */
export function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Toggles the current theme (depends on the Theme type).
 */
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === themes[0] ? themes[1] : themes[0];
  setTheme(newTheme as Theme);
}
