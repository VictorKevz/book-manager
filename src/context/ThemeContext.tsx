// src/context/ThemeContext.tsx

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { Theme, ThemeContextType } from "../types/settings";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const getInitialTheme = (): Theme => {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      if (saved === "dark" || saved === "light" || saved === "system") {
        return saved;
      }
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (value: "dark" | "light") => {
      if (value === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      applyTheme(systemPrefersDark.matches ? "dark" : "light");

      const listener = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light");
      };
      systemPrefersDark.addEventListener("change", listener);

      return () => systemPrefersDark.removeEventListener("change", listener);
    }

    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, onThemeUpdate: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
