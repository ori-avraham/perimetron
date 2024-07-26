import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useSettings } from "@/hooks/use-settings";

interface DigitsContextType {
  digits: string;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}

const DigitsContext = createContext<DigitsContextType | null>(null);

function* piGenerator(): IterableIterator<number> {
  let q = 1n,
    r = 0n,
    t = 1n,
    k = 1n,
    n = 3n,
    l = 3n;
  while (true) {
    if (q * 4n + r - t < n * t) {
      yield Number(n);
      const nr = (r - n * t) * 10n;
      n = ((q * 3n + r) * 10n) / t - n * 10n;
      q *= 10n;
      r = nr;
    } else {
      const nr = (q * 2n + r) * l;
      const nn = (q * k * 7n + 2n + r * l) / (t * l);
      q *= k;
      t *= l;
      l += 2n;
      k += 1n;
      n = nn;
      r = nr;
    }
  }
}

export const DigitsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [digits, setDigits] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const generator = useRef(piGenerator());
  const intervalId = useRef<number>(0);
  const { generalSettings } = useSettings();

  const updateDigits = useCallback(() => {
    const nextDigit = generator.current.next().value;
    if (nextDigit !== undefined) {
      setDigits((prev) => prev + String(nextDigit));
    }
  }, []);

  const reset = useCallback(() => {
    setDigits("");
    generator.current = piGenerator();
    if (isPlaying) {
      generator.current.next(); // Skip first digit
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = window.setInterval(
        updateDigits,
        generalSettings.interval
      );
    } else {
      clearInterval(intervalId.current);
    }
    return () => clearInterval(intervalId.current);
  }, [isPlaying, updateDigits, generalSettings.interval]);

  return (
    <DigitsContext.Provider value={{ digits, isPlaying, setIsPlaying, reset }}>
      {children}
    </DigitsContext.Provider>
  );
};

export const useDigits = () => {
  const context = useContext(DigitsContext);
  if (!context) {
    throw new Error("useDigits must be used within a DigitsProvider");
  }
  return context;
};
