import { usePlayback } from "@/hooks/use-playback";
import { useSettings } from "@/hooks/use-settings";

function addSpaceEveryN(str: string, n: number) {
  const regex = new RegExp(`(.{${n}})`, "g");
  return str.replace(regex, "$1 ");
}

export default function Digits() {
  const { digits } = usePlayback();
  const { settings } = useSettings();
  return (
    <div
      className={`pb-[120px] px-4 max-w-7xl mx-auto text-center md:text-start break-words ${settings.fontSize} ${settings.font} ${settings.fontWeight}`}
    >
      <div>π = 3.</div>
      <div className="break-words">
        {settings.spacing < 1
          ? digits
          : addSpaceEveryN(digits, settings.spacing)}
      </div>
    </div>
  );
}
