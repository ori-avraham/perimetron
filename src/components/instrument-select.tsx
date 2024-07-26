import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Virtualizer, type VirtualizerHandle } from "virtua";
import { instruments } from "@/constants/instruments";

function formatString(input: string): string {
  return input
    .split("_") // Split the string by underscores
    .map((word, index) =>
      index === 0 // Capitalize the first word
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(" "); // Join the words with spaces
}

interface InstrumentSelectProps {
  id: string;
  value: string;
  setValue: (value: string) => void;
}

export default function InstrumentSelect({
  id,
  value,
  setValue,
}: InstrumentSelectProps) {
  const instrumentList = useMemo(() => instruments, []);
  const [open, setOpen] = useState(false);
  const ref = useRef<VirtualizerHandle>(null);
  const index = useMemo(
    () => instrumentList.findIndex((instrument) => instrument === value),
    [instrumentList, value]
  );

  useLayoutEffect(() => {
    if (!open || !value) return;
    if (index === -1) return;
    // immitate scroll
    ref.current?.scrollToIndex(index);

    // recover focus
    setTimeout(() => {
      (
        document.querySelector(".SelectItem[data-state=checked]") as HTMLElement
      )?.focus({
        preventScroll: true,
      });
    });
  }, [open]);

  return (
    <Select
      value={value}
      onValueChange={setValue}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger id={id} aria-label="Select note">
        <SelectValue>
          {formatString(instrumentList.find((instrument) => instrument === value) ?? "")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <Virtualizer
          ref={ref}
          count={instrumentList.length}
          keepMounted={index !== -1 ? [index] : undefined}
          overscan={2 /* overscan for keyboard */}
        >
          {instrumentList.map((instrument) => (
            <SelectItem
              className="SelectItem"
              key={instrument}
              value={instrument}
            >
              {formatString(instrument)}
            </SelectItem>
          ))}
        </Virtualizer>
      </SelectContent>
    </Select>
  );
}
