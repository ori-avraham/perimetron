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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SoundsSettingsForm() {
  const { soundsSettings, setSoundsSettings } = useSettings();

  return (
    <form name="sounds-settings-form" className="space-y-4">
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
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="oscillator"
              className="text-lg font-semibold flex gap-2"
            >
              Oscillator
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={soundsSettings.oscillator}
            onValueChange={(value) =>
              setSoundsSettings((prev) => ({
                ...prev,
                oscillator: value as OscillatorType,
              }))
            }
          >
            <SelectTrigger id="oscillator">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sine">Sine</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="sawtooth">Sawtooth</SelectItem>
              <SelectItem value="triangle">Triangle</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the oscillator value of the sound.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="filter"
              className="text-lg font-semibold flex gap-2"
            >
              Filter
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={soundsSettings.filter}
            onValueChange={(value) =>
              setSoundsSettings((prev) => ({
                ...prev,
                filter: value as BiquadFilterType,
              }))
            }
          >
            <SelectTrigger id="filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="lowpass">Sine</SelectItem>
              <SelectItem value="highpass">Highpass</SelectItem>
              <SelectItem value="bandpass">Bandpass</SelectItem>
              <SelectItem value="lowshelf">Lowshelf</SelectItem>
              <SelectItem value="highshelf">Highshelf </SelectItem>
              <SelectItem value="peaking">Peaking</SelectItem>
              <SelectItem value="notch">Notch</SelectItem>
              <SelectItem value="allpass">Allpass</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the oscillator value of the sound.
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
