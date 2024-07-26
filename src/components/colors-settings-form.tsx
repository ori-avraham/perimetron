import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { useSettings } from "@/hooks/use-settings";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { SwatchBookIcon } from "lucide-react";

export default function ColorsSettingsForm() {
  const { colorsSettings, setColorsSettings } = useSettings();

  return (
    <form name="colors-settings-form" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <Label htmlFor="size" className="text-lg font-semibold flex gap-2">
              Size
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            id="size"
            min={10}
            step={1}
            max={50}
            value={[colorsSettings.size]}
            onValueChange={(value) =>
              setColorsSettings((prev) => ({
                ...prev,
                size: Number(value),
              }))
            }
          />
          <Badge
            className="mt-6 inline-block px-4 py-2 rounded-md w-fit"
            variant="outline"
          >
            {colorsSettings.size}
          </Badge>
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Changing the size of the squares representing the digits of PI.
          </p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex gap-2">
            Color Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.keys(colorsSettings.colorMap).map((digit) => (
            <div key={`${digit}-key`} className="flex items-center gap-4">
              <Label htmlFor={`${digit}-color`} className="text-lg">
                {digit}
              </Label>
              <Input
                id={`${digit}-color-text`}
                name={`${digit}-color-text`}
                type="text"
                value={colorsSettings.colorMap[digit]}
                onChange={(event) =>
                  setColorsSettings((prev) => ({
                    ...prev,
                    colorMap: { ...prev.colorMap, [digit]: event.target.value },
                  }))
                }
              />
              <Label
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" })
                )}
              >
                <SwatchBookIcon
                  color={colorsSettings.colorMap[digit]}
                  className="size-4"
                />
                <input
                  className="size-0 invisible"
                  type="color"
                  name={`${digit}-color`}
                  id={`${digit}-color`}
                  onChange={(event) =>
                    setColorsSettings((prev) => ({
                      ...prev,
                      colorMap: {
                        ...prev.colorMap,
                        [digit]: event.target.value,
                      },
                    }))
                  }
                />
              </Label>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <p className="mb-3 text-sm text-muted-foreground">
            Change the colors assigned to each of the digits.
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
