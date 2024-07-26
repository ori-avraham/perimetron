import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Soundfont, CacheStorage } from "smplr"; // needs to be a url

import { useSettings } from "@/hooks/use-settings";
import { useDigits } from "./digits-provider";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

interface SoundsContextType {
  playSound: (digit: string) => void;
}

const SoundsContext = createContext<SoundsContextType | null>(null);

export const SoundsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const audioContext = useRef<AudioContext | null>(null);
  const { generalSettings, soundsSettings } = useSettings();
  const { digits, isPlaying } = useDigits();
  const instrument = useRef<Soundfont | null>(null);

  const playNote = useCallback(
    (note: string, currentTime: number, duration: number) => {
      instrument.current?.start({
        note: note,
        time: currentTime,
        duration,
      });
    },
    []
  );

  const playSound = useCallback(
    (digit: string) => {
      if (
        generalSettings.sounds &&
        audioContext.current &&
        instrument.current
      ) {
        const note = soundsSettings.soundMap[parseInt(digit)];
        if (note) {
          const interval = generalSettings.interval / 1000;
          const currentTime = audioContext.current.currentTime;
          playNote(note, currentTime, interval);
        }
      }
    },
    [
      generalSettings.sounds,
      generalSettings.interval,
      soundsSettings.soundMap,
      playNote,
    ]
  );

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current =
        new window.AudioContext() || new window.webkitAudioContext();
    }
    return () => {
      audioContext.current?.close();
    };
  }, []);

  useEffect(() => {
    const loadInstrument = async () => {
      if (audioContext.current) {
        const storage = new CacheStorage();
        instrument.current = new Soundfont(audioContext.current, {
          instrument: soundsSettings.instrument,
          storage,
        });
      }
    };
    loadInstrument();
  }, [soundsSettings.instrument]);

  useEffect(() => {
    if (isPlaying && audioContext.current) {
      audioContext.current.resume();
    } else if (!isPlaying && audioContext.current?.state === "running") {
      audioContext.current.suspend();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && digits.length > 0) {
      playSound(digits[digits.length - 1]);
    }
  }, [digits, isPlaying, playSound]);

  return (
    <SoundsContext.Provider value={{ playSound }}>
      {children}
    </SoundsContext.Provider>
  );
};

export const useSounds = () => {
  const context = useContext(SoundsContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundsProvider");
  }
  return context;
};
