import { useSettings } from "@/hooks/use-settings";
import { useDigits } from "@/providers/digits-provider";

function addSpaceEveryN(str: string, n: number) {
  const regex = new RegExp(`(.{${n}})`, "g");
  return str.replace(regex, "$1 ");
}

export default function Digits() {
  const { digits } = useDigits();
  const { digitsSettings } = useSettings();
  return (
    <div
      className={`pb-[120px] px-4 max-w-7xl mx-auto text-center md:text-start break-words ${digitsSettings.fontSize} ${digitsSettings.font} ${digitsSettings.fontWeight}`}
    >
      <div>π = 3.</div>
      <div className="break-words">
        {digitsSettings.spacing < 1
          ? digits
          : addSpaceEveryN(digits, digitsSettings.spacing)}
      </div>
    </div>
  );
}
