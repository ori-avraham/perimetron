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
import { useSettings } from "@/hooks/use-settings";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";

export default function DigitsSettingsForm() {
  const { digitsSettings, setDigitsSettings } = useSettings();

  return (
    <form name="digits-settings-form" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="spacing"
              className="text-lg font-semibold flex gap-2"
            >
              Spacing
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            id="spacing"
            min={0}
            step={1}
            max={20}
            value={[digitsSettings.spacing]}
            onValueChange={(value) =>
              setDigitsSettings((prev) => ({
                ...prev,
                spacing: Number(value),
              }))
            }
          />
          <Badge
            className="mt-6 inline-block px-4 py-2 rounded-md w-fit"
            variant="outline"
          >
            {digitsSettings.spacing}
          </Badge>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Changing the spacing determines how many digits are grouped
            together; 0 indicates no grouping at all.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Label htmlFor="font" className="text-lg font-semibold flex gap-2">
              Font
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={digitsSettings.font}
            onValueChange={(value) =>
              setDigitsSettings((prev) => ({ ...prev, font: value }))
            }
          >
            <SelectTrigger>
              <SelectValue id="font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="font-sans">Sans-serif</SelectItem>
              <SelectItem value="font-serif">Serif</SelectItem>
              <SelectItem value="font-mono">Monospace</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the font family of the digits.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="fontSize"
              className="text-lg font-semibold flex gap-2"
            >
              Font Size
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={digitsSettings.fontSize}
            onValueChange={(value) =>
              setDigitsSettings((prev) => ({ ...prev, fontSize: value }))
            }
          >
            <SelectTrigger>
              <SelectValue id="fontSize" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-xs">Extra small</SelectItem>
              <SelectItem value="text-sm">Small</SelectItem>
              <SelectItem value="text-base">Base</SelectItem>
              <SelectItem value="text-lg">Large</SelectItem>
              <SelectItem value="text-xl">Extra large</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the font size of the digits.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Label
              htmlFor="fontWeight"
              className="text-lg font-semibold flex gap-2"
            >
              Font Weight
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={digitsSettings.fontWeight}
            onValueChange={(value) =>
              setDigitsSettings((prev) => ({ ...prev, fontWeight: value }))
            }
          >
            <SelectTrigger>
              <SelectValue id="fontWeight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="font-thin">Thin</SelectItem>
              <SelectItem value="font-extralight">Extra light</SelectItem>
              <SelectItem value="font-light">Light</SelectItem>
              <SelectItem value="font-normal">Normal</SelectItem>
              <SelectItem value="font-medium">Medium</SelectItem>
              <SelectItem value="font-semibold">Semibold</SelectItem>
              <SelectItem value="font-bold">Bold</SelectItem>
              <SelectItem value="font-extrabold">Extra bold</SelectItem>
              <SelectItem value="font-black">Black</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the font weight of the digits.
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
