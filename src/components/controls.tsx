import { usePlayback } from "@/hooks/use-playback";
import SettingsModal from "./settings-modal";
import { PauseIcon, PlayIcon, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Controls() {
  const { isPlaying, setIsPlaying, reset, digits } = usePlayback();
  return (
    <div className="bg-clip-padding bg-background backdrop-filter backdrop-blur-sm dark:bg-opacity-80 bg-opacity-80 fixed bottom-0 left-0 z-50 flex justify-center w-full px-8 border-t">
      <div className="flex items-center w-full py-6">
        <div className="w-full">
          <div className="flex gap-3 items-center justify-center mx-auto mb-1">
            <SettingsModal />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    type="button"
                  >
                    {isPlaying ? (
                      <PauseIcon className="size-8" />
                    ) : (
                      <PlayIcon className="size-8" />
                    )}
                    <span className="sr-only">
                      {isPlaying ? "Pause" : "Play"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Pause" : "Play"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={reset}
                    type="button"
                  >
                    <RotateCcw className="size-5" />
                    <span className="sr-only">Restart generator</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Restart generator</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-medium">
              Digits Generated: {digits.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
