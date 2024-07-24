import { useTheme } from "@/hooks/use-theme";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="size-5 hidden dark:inline-block" />
      <MoonIcon className="size-5 dark:hidden" />

      <span className="sr-only">Switch Theme</span>
    </Button>
  );
}
