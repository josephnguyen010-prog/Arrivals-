import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const KEY = "postmark.theme";

function systemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Follows the OS until the user picks a side, then remembers the choice.
 * The chosen theme is stamped on the root element, which the tokens honour
 * over the media query in both directions.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => stored() ?? systemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        // Preference just won't survive the tab.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
