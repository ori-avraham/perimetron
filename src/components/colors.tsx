import { useSettings } from "@/hooks/use-settings";
import { useDigits } from "@/providers/digits-provider";

export default function Colors() {
  const { digits } = useDigits();
  const { colorsSettings } = useSettings();
  return (
    <div
      className={`pb-[120px] px-4 max-w-7xl mx-auto text-center md:text-start break-words`}
    >
      <div>π = 3.</div>
      <div className="flex flex-wrap">
        {digits.split("").map((d, i) => (
          <svg
            key={i + d}
            width={colorsSettings.size}
            height={colorsSettings.size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width={colorsSettings.size} height={colorsSettings.size} fill={colorsSettings.colorMap[d]} />
          </svg>
        ))}
      </div>
    </div>
  );
}
