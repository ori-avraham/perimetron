import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { useSettings } from "@/hooks/use-settings";
import NoteSelect from "./note-select";
import InstrumentSelect from "./instrument-select";

export default function SoundsSettingsForm() {
  const { soundsSettings, setSoundsSettings } = useSettings();

  return (
    <form name="sounds-settings-form" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="instrument"
              className="text-lg font-semibold flex gap-2"
            >
              Instrument
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InstrumentSelect
            id="instrument"
            value={soundsSettings.instrument}
            setValue={(value) =>
              setSoundsSettings((prev) => ({ ...prev, instrument: value }))
            }
          />
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Select an instrument to produce the sound.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex gap-2">
            Sound Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(soundsSettings.soundMap).map((digit) => (
            <div key={`${digit}-key`} className="flex items-center gap-4">
              <Label htmlFor={`${digit}-sound`} className="text-lg">
                {digit}
              </Label>
              <NoteSelect
                id={`${digit}-sound`}
                value={soundsSettings.soundMap[digit]}
                setValue={(value) =>
                  setSoundsSettings((prev) => ({
                    ...prev,
                    soundMap: { ...prev.soundMap, [digit]: value },
                  }))
                }
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the sound (note) assigned to each of the digits.
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
