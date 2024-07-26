import { notes } from "@/constants/notes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Virtualizer, type VirtualizerHandle } from "virtua";

interface NoteSelectProps {
  id: string;
  value: string;
  setValue: (value: string) => void;
}

export default function NoteSelect({ id, value, setValue }: NoteSelectProps) {
  const notesList = useMemo(() => Object.keys(notes), []);
  const [open, setOpen] = useState(false);
  const ref = useRef<VirtualizerHandle>(null);
  const index = useMemo(
    () => notesList.findIndex((note) => note === value),
    [notesList, value]
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
          {notesList.find((note) => note === value) ?? ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <Virtualizer
          ref={ref}
          count={notesList.length}
          keepMounted={index !== -1 ? [index] : undefined}
          overscan={2 /* overscan for keyboard */}
        >
          {notesList.map((note) => (
            <SelectItem className="SelectItem" key={note} value={note}>
              {note}
            </SelectItem>
          ))}
        </Virtualizer>
      </SelectContent>
    </Select>
  );
}
