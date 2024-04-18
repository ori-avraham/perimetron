import { ThemeContext } from "@/providers/theme-provider";
import { useContext } from "react";

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useTheme has to be used within <ThemeContext.Provider>");
  }

  return themeContext;
};
