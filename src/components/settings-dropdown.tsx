import {
  AudioLinesIcon,
  HashIcon,
  PaletteIcon,
  Settings2,
  SettingsIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSettings } from "@/hooks/use-settings";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ScrollArea } from "./ui/scroll-area";
import GeneralSettingsForm from "./general-settings-form";
import DigitsSettingsForm from "./digits-settings-form";
import ColorsSettingsForm from "./colors-settings-form";
import SoundsSettingsForm from "./sounds-settings-form";

export default function SettingsDropdown() {
  const { generalSettings, setGeneralSettings } = useSettings();
  const [isGeneralDialogOpen, setIsGeneralDialogOpen] = useState(false);
  const [isDigitsDialogOpen, setIsDigitsDialogOpen] = useState(false);
  const [isColorsDialogOpen, setIsColorsDialogOpen] = useState(false);
  const [isSoundsDialogOpen, setIsSoundsDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" type="button">
            <SettingsIcon className="size-5" />
            <span className="sr-only">Open settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Quick Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={generalSettings.sounds}
              onCheckedChange={(checked) =>
                setGeneralSettings((prev) => ({ ...prev, sounds: checked }))
              }
            >
              Enable sound
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={generalSettings.presentation}
            onValueChange={(value) =>
              setGeneralSettings((prev) => ({ ...prev, presentation: value }))
            }
          >
            <DropdownMenuRadioItem value="digits">
              Digits Mode
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="colors">
              Colors Mode
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Configurations</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsGeneralDialogOpen(true)}>
              <Settings2 className="me-2 size-4" />
              <span>General settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDigitsDialogOpen(true)}>
              <HashIcon className="me-2 size-4" />
              <span>Digits settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsColorsDialogOpen(true)}>
              <PaletteIcon className="me-2 size-4" />
              <span>Color settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsSoundsDialogOpen(true)}>
              <AudioLinesIcon className="me-2 size-4" />
              <span>Sound settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <GeneralDialog
        isOpen={isGeneralDialogOpen}
        setIsOpen={setIsGeneralDialogOpen}
      />
      <DigitsDialog
        isOpen={isDigitsDialogOpen}
        setIsOpen={setIsDigitsDialogOpen}
      />
      <ColorsDialog
        isOpen={isColorsDialogOpen}
        setIsOpen={setIsColorsDialogOpen}
      />
      <SoundsDialog
        isOpen={isSoundsDialogOpen}
        setIsOpen={setIsSoundsDialogOpen}
      />
    </>
  );
}

interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function GeneralDialog({ isOpen, setIsOpen }: DialogProps) {
  const { resetGeneralSettings } = useSettings();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 p-0">
        <ScrollArea className="max-h-[600px] p-2">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold">
                General settings
              </DialogTitle>
              <DialogDescription>
                Control the speed and presentation mode of the digits generated.
              </DialogDescription>
            </DialogHeader>
            <GeneralSettingsForm />
            <DialogFooter className="mt-6 gap-2">
              <Button onClick={resetGeneralSettings} variant="secondary">
                Reset to default
              </Button>
              <DialogClose asChild>
                <Button>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function DigitsDialog({ isOpen, setIsOpen }: DialogProps) {
  const { resetDigitsSettings } = useSettings();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 p-0">
        <ScrollArea className="max-h-[600px] p-2">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold">
                Digits settings
              </DialogTitle>
              <DialogDescription>
                Control the style of the digits generated.
              </DialogDescription>
            </DialogHeader>
            <DigitsSettingsForm />
            <DialogFooter className="mt-6 gap-2">
              <Button onClick={resetDigitsSettings} variant="secondary">
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
  );
}

function ColorsDialog({ isOpen, setIsOpen }: DialogProps) {
  const { resetColorsSettings } = useSettings();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 p-0">
        <ScrollArea className="max-h-[600px] p-2">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold">
                Colors settings
              </DialogTitle>
              <DialogDescription>
                Control the style of the colors squares generated.
              </DialogDescription>
            </DialogHeader>
            <ColorsSettingsForm />
            <DialogFooter className="mt-6 gap-2">
              <Button onClick={resetColorsSettings} variant="secondary">
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
  );
}

function SoundsDialog({ isOpen, setIsOpen }: DialogProps) {
  const { resetColorsSettings } = useSettings();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 p-0">
        <ScrollArea className="max-h-[600px] p-2">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold">
                Sound settings
              </DialogTitle>
              <DialogDescription>
                Control the sound that plays when a digit is generated.
              </DialogDescription>
            </DialogHeader>
            <SoundsSettingsForm />
            <DialogFooter className="mt-6 gap-2">
              <Button onClick={resetColorsSettings} variant="secondary">
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
  );
}
