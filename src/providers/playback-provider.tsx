import { useSettings } from "@/hooks/use-settings";
import {
  type PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface PlaybackContextType {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  digits: string;
  reset: () => void;
}

export const PlaybackContext = createContext<PlaybackContextType | null>(null);

interface PlaybackProviderProps extends PropsWithChildren {}

function* piGenerator(): IterableIterator<number> {
  let q = 1n; // quotient
  let r = 0n; // remainder
  let t = 1n; // denominator
  let k = 1n; // incremental value for the denominator
  let n = 3n; // current digit of π being computed
  let l = 3n; // index

  while (true) {
    if (q * 4n + r - t < n * t) {
      yield Number(n);
      const nr = (r - n * t) * 10n; // new reminder
      n = ((q * 3n + r) * 10n) / t - n * 10n;
      q *= 10n;
      r = nr;
    } else {
      const nr = (q * 2n + r) * l;
      const nn = (q * k * 7n + 2n + r * l) / (t * l); // new numerator
      q *= k;
      t *= l;
      l += 2n;
      k += 1n;
      n = nn;
      r = nr;
    }
  }
}

export default function PlaybackProvider({ children }: PlaybackProviderProps) {
  const [digits, setDigits] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalId = useRef(0);
  const generator = useRef(piGenerator());
  const { settings } = useSettings();

  const updateDigits = useCallback(() => {
    const nextDigit = generator.current.next().value;
    if (nextDigit !== undefined) {
      setDigits((prev) => prev + String(nextDigit));
    }
  }, []);

  const reset = () => {
    setDigits("");
    generator.current = piGenerator();
    if (isPlaying) {
      generator.current.next();
    }
  };

  useEffect(() => {
    // Skip the first digit
    generator.current.next();
    if (isPlaying) {
      intervalId.current = window.setInterval(updateDigits, settings.interval);
    } else {
      clearTimeout(intervalId.current);
    }
    return () => {
      clearInterval(intervalId.current); // Clear interval on component unmount
    };
  }, [updateDigits, isPlaying, settings.interval]);

  return (
    <PlaybackContext.Provider
      value={{ isPlaying, setIsPlaying, digits, reset }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}
