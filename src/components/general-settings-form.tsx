import { useSettings } from "@/hooks/use-settings";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

export default function GeneralSettingsForm() {
  const { generalSettings, setGeneralSettings } = useSettings();
  return (
    <form name="general-settings-form" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="presentation"
              className="text-lg font-semibold flex gap-2"
            >
              Presentation Mode
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={generalSettings.presentation}
            onValueChange={(value) =>
              setGeneralSettings((prev) => ({ ...prev, presentation: value }))
            }
          >
            <SelectTrigger>
              <SelectValue id="presentation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="digits">Digits</SelectItem>
              <SelectItem value="colors">Colors</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the presentation mode of the app.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="presentation"
              className="text-lg font-semibold flex gap-2"
            >
              Speed (Interval)
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            className="mt-6"
            min={50}
            step={10}
            max={1000}
            value={[generalSettings.interval]}
            onValueChange={(value) =>
              setGeneralSettings((prev) => ({
                ...prev,
                interval: Number(value),
              }))
            }
          />
          <Badge
            className="mt-6 inline-block px-4 py-2 rounded-md w-fit"
            variant="outline"
          >
            {generalSettings.interval}
          </Badge>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the speed of the digits generated (lower is faster).
          </p>
        </CardFooter>
      </Card>
      <Card className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-4">
          <Label className="text-base">Sound</Label>
          <p className="mb-3 max-w-xs text-sm text-muted-foreground">
            Select whether to enable sound playback for the generating of the
            digits.
          </p>
        </div>
        <Switch
          checked={generalSettings.sounds}
          onCheckedChange={(checked) => {
            setGeneralSettings((prev) => ({
              ...prev,
              sounds: checked,
            }));
          }}
        />
      </Card>
    </form>
  );
}
