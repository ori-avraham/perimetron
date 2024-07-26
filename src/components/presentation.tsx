import { useSettings } from "@/hooks/use-settings";
import Colors from "./colors";
import Digits from "./digits";

export default function Presentation() {
  const { generalSettings } = useSettings();
  switch (generalSettings.presentation) {
    case "digits":
      return <Digits />;
    case "colors":
      return <Colors />;
    default:
      return <Digits />;
  }
}
