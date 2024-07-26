import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useSettings } from "@/hooks/use-settings";
import { notes } from "@/constants/notes";
import { useDigits } from "./digits-provider";

interface SoundsContextType {
  playSound: (digit: string) => void;
}

const SoundsContext = createContext<SoundsContextType | null>(null);

const noteToFrequency = (note: string) => notes[note] || 0;

export const SoundsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const audioContext = useRef<AudioContext | null>(null);
  const { generalSettings, soundsSettings } = useSettings();
  const { digits, isPlaying } = useDigits();

  const playNote = useCallback(
    (
      audioContext: AudioContext,
      note: string,
      startTime: number,
      duration: number
    ) => {
      const frequency = noteToFrequency(note);
      if (
        !frequency ||
        !Number.isFinite(startTime) ||
        !Number.isFinite(duration)
      ) {
        console.error("Invalid parameters:", {
          note,
          frequency,
          startTime,
          duration,
        });
        return;
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = soundsSettings.oscillator;
      oscillator.frequency.setValueAtTime(frequency, startTime);
      gainNode.gain.setValueAtTime(1, startTime);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
      if (soundsSettings.filter !== "none") {
        filter.type = soundsSettings.filter;
        filter.frequency.setValueAtTime(1500, startTime);
      }

      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    },
    [soundsSettings]
  );

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new window.AudioContext();
    }
    return () => {
      audioContext.current?.close();
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioContext.current?.state === "suspended") {
      audioContext.current.resume();
    } else if (!isPlaying && audioContext.current?.state === "running") {
      audioContext.current.suspend();
    }
  }, [isPlaying]);

  const playSound = useCallback(
    (digit: string) => {
      if (generalSettings.sounds && audioContext.current) {
        const note = soundsSettings.soundMap[parseInt(digit)];
        if (note) {
          const interval = generalSettings.interval / 1000;
          const currentTime = audioContext.current.currentTime;
          playNote(audioContext.current, note, currentTime, interval);
        }
      }
    },
    [generalSettings.sounds, generalSettings.interval]
  );

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
