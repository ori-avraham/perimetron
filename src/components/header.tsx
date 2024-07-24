import { GithubIcon, PiIcon } from "lucide-react";
import ThemeSwitcher from "./theme-switcher";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="sticky bg-background top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
      <nav className="gap-6 text-lg font-medium flex flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <PiIcon className="size-6" />
          <span>Perimetron</span>
        </a>
      </nav>
      <div className="flex w-full items-center gap-4 md:ms-auto md:gap-2 lg:gap-4">
        <div className="ms-auto space-x-2">
          <ThemeSwitcher />
          <a
            target="_blank"
            href="https://github.com/ori-avraham/perimetron"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <GithubIcon className="size-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
