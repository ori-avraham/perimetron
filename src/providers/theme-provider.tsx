import { useIsMount } from "@/hooks/use-is-mount";
import useLocalStorage from "@/hooks/use-local-storage";
import { type PropsWithChildren, createContext, useEffect } from "react";

const handleDefaultTheme = () => {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  } else {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    return theme;
  }
};

interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "",
  setTheme: () => {},
});

interface ThemeProviderProps extends PropsWithChildren {}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<string>(
    "theme",
    handleDefaultTheme()
  );
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      document.documentElement.className = theme;
    }
  }, [theme, isMount]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
