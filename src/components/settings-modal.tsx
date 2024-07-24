import { useSettings } from "@/hooks/use-settings";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, SettingsIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";

export default function SettingsModal() {
  const { settings, setSettings, reset } = useSettings();

  const decrementSpacing = () => {
    if (settings.spacing < 1) {
      return;
    }
    setSettings((prev) => ({
      ...prev,
      spacing: prev.spacing - 1,
    }));
  };

  const incrementSpacing = () => {
    if (settings.spacing >= 20) {
      return;
    }
    setSettings((prev) => ({
      ...prev,
      spacing: prev.spacing + 1,
    }));
  };

  return (
    <div>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={reset}
                  type="button"
                >
                  <SettingsIcon className="size-5" />
                  <span className="sr-only">Open settings</span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-2xl h-[600px] p-2">
          <ScrollArea>
            <div className="p-4 space-y-4">
              <DialogHeader>
                <DialogTitle>Perimetron Settings</DialogTitle>
                <DialogDescription>
                  Make changes to the settings here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6">
                <Card className="grid items-center gap-2">
                  <CardHeader>
                    <Label
                      className="text-lg font-semibold flex gap-2"
                      htmlFor="interval"
                    >
                      Interval
                    </Label>
                    <Badge className="w-fit">{settings.interval}</Badge>
                  </CardHeader>
                  <CardContent>
                    <Slider
                      className="w-full"
                      id="interval"
                      min={50}
                      step={50}
                      max={1000}
                      value={[settings.interval]}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          interval: Number(value),
                        }))
                      }
                    />
                  </CardContent>
                  <CardFooter>
                    <p className="mb-3 text-sm text-muted-foreground">
                      This controls the number of milliseconds between each
                      digit generated.
                    </p>
                  </CardFooter>
                </Card>
                <Card className="grid items-center gap-2">
                  <CardHeader>
                    <Label
                      className="text-lg font-semibold flex gap-2"
                      htmlFor="spacing"
                    >
                      Spacing
                    </Label>
                    <Badge className="w-fit">{settings.spacing}</Badge>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <Button
                      aria-label="Decrease spacing"
                      onClick={decrementSpacing}
                      variant="outline"
                      size="icon"
                    >
                      <MinusIcon className="size-5" />
                    </Button>
                    <input
                      id="spacing"
                      readOnly
                      className="bg-transparent w-10 text-center"
                      type="text"
                      value={settings.spacing}
                    />
                    <Button
                      aria-label="Increase spacing"
                      onClick={incrementSpacing}
                      variant="outline"
                      size="icon"
                    >
                      <PlusIcon className="size-5" />
                    </Button>
                  </CardContent>
                  <CardFooter>
                    <p className="mb-3 text-sm text-muted-foreground">
                      This will add a gap every N digits; setting it to 0 will
                      eliminate the spacing entirely.
                    </p>
                  </CardFooter>
                </Card>
                <Card className="grid items-center gap-2">
                  <CardHeader>
                    <Label
                      className="text-lg font-semibold flex gap-2"
                      htmlFor="font"
                    >
                      Font
                    </Label>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <Select
                      value={settings.font}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          font: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue id="font" placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="font-mono">Mono</SelectItem>
                        <SelectItem value="font-sans">Sans-Serif</SelectItem>
                        <SelectItem value="font-serif">Serif</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                  <CardFooter>
                    <p className="mb-3 text-sm text-muted-foreground">
                      This will change the font type of the digits.
                    </p>
                  </CardFooter>
                </Card>
                <Card className="grid items-center gap-2">
                  <CardHeader>
                    <Label
                      className="text-lg font-semibold flex gap-2"
                      htmlFor="fontSize"
                    >
                      Font Size
                    </Label>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <Select
                      value={settings.fontSize}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          fontSize: value,
                        }))
                      }
                    >
                      <SelectTrigger id="fontSize">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-xs">Extra Small</SelectItem>
                        <SelectItem value="text-sm">Small</SelectItem>
                        <SelectItem value="text-base">Medium</SelectItem>
                        <SelectItem value="text-lg">Large</SelectItem>
                        <SelectItem value="text-xl">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                  <CardFooter>
                    <p className="mb-3 text-sm text-muted-foreground">
                      This will change the font size of the digits.
                    </p>
                  </CardFooter>
                </Card>
                <Card className="grid items-center gap-2">
                  <CardHeader>
                    <Label
                      className="text-lg font-semibold flex gap-2"
                      htmlFor="fontWeight"
                    >
                      Font Weight
                    </Label>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <Select
                      value={settings.fontWeight}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          fontWeight: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          id="fontWeight"
                          placeholder="Select a fruit"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="font-thin">Thin</SelectItem>
                        <SelectItem value="font-extralight">
                          Extra Light
                        </SelectItem>
                        <SelectItem value="font-light">Light</SelectItem>
                        <SelectItem value="font-normal">Normal</SelectItem>
                        <SelectItem value="font-medium">Medium</SelectItem>
                        <SelectItem value="font-semibold">Semi-bold</SelectItem>
                        <SelectItem value="font-bold">Bold</SelectItem>
                        <SelectItem value="font-extrabold">
                          Extra Bold
                        </SelectItem>
                        <SelectItem value="font-black">Black</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                  <CardFooter>
                    <p className="mb-3 text-sm text-muted-foreground">
                      This will change the font weight of the digits.
                    </p>
                  </CardFooter>
                </Card>
              </div>
              <DialogFooter>
                <Button onClick={reset} variant="secondary">
                  Reset
                </Button>
                <DialogClose asChild>
                  <Button>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="overflow-y-auto overflow-x-hidden h-full bg-slate-950/50 fixed top-0 right-0 left-0 z-50 grid place-items-center w-full md:inset-0 max-h-full"
      >
        <Dialog.Panel className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <Dialog.Title className="flex items-center justify-between p-4 md:p-5 text-xl font-semibold text-gray-900 dark:text-white border-b rounded-t dark:border-gray-600">
              Settings
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </Dialog.Title>
            <Dialog.Description as="div" className="p-4 md:p-5 space-y-4">
              <p>Change the settings to customize your experience.</p>
              <form className="max-w-sm space-y-3">
                <label
                  htmlFor="interval"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Interval
                  <span className="bg-cyan-100 ms-2 text-cyan-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-cyan-900 dark:text-cyan-300">
                    {settings.interval}
                  </span>
                </label>
                <input
                  id="interval"
                  min="50"
                  step="50"
                  max="1000"
                  type="range"
                  value={settings.interval}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      interval: Number(event.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-900"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This controls the number of milliseconds between each digit
                  generated.
                </p>
                <label
                  htmlFor="spacing"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose spacing:
                </label>
                <div className="relative flex items-center max-w-[8rem]">
                  <button
                    type="button"
                    id="decrement"
                    onClick={decrementSpacing}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={settings.spacing}
                    id="spacing"
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                    readOnly
                  />
                  <button
                    type="button"
                    id="increment"
                    onClick={incrementSpacing}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This will add a gap every N digits; setting it to 0 will
                  eliminate the spacing entirely.
                </p>
                <label
                  htmlFor="font"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Font
                </label>
                <select
                  value={settings.font}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      font: event.currentTarget.value,
                    }))
                  }
                  id="font"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                >
                  <option value="font-mono">Mono</option>
                  <option value="font-sans">Sans-Serif</option>
                  <option value="font-serif">Serif</option>
                </select>
                <label
                  htmlFor="fontSize"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Font Size
                </label>
                <select
                  value={settings.fontSize}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      fontSize: event.currentTarget.value,
                    }))
                  }
                  id="fontSize"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                >
                  <option value="text-xs">Extra Small</option>
                  <option value="text-sm">Small</option>
                  <option value="text-base">Medium</option>
                  <option value="text-lg">Large</option>
                  <option value="text-xl">Extra Large</option>
                </select>
                <label
                  htmlFor="fontWeight"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Font Weight
                </label>
                <select
                  value={settings.fontWeight}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      fontWeight: event.currentTarget.value,
                    }))
                  }
                  id="fontWeight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                >
                  <option value="font-thin">Thin</option>
                  <option value="font-extralight">Extra Light</option>
                  <option value="font-light">Light</option>
                  <option value="font-normal">Normal</option>
                  <option value="font-medium">Medium</option>
                  <option value="font-semibold">Semi-bold</option>
                  <option value="font-bold">Bold</option>
                  <option value="font-extrabold">Extra Bold</option>
                  <option value="font-black">Black</option>
                </select>
              </form>
            </Dialog.Description>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Close
              </button>
              <button
                onClick={reset}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> */}
    </div>
  );
}
