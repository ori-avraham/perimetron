import { useTheme } from "@/hooks/use-theme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="me-2 inline-flex items-center rounded-lg border border-cyan-700 p-2.5 text-center text-sm font-medium text-cyan-700 hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:bg-cyan-500 dark:hover:text-white dark:focus:ring-cyan-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>

      <span className="sr-only">Switch Theme</span>
    </button>
  );
}
