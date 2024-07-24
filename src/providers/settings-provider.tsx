import {
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  useState,
  createContext,
} from "react";

interface SettingsContextType {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  reset: () => void;
}

interface Settings {
  interval: number;
  spacing: number;
  fontSize: string;
  fontWeight: string;
  font: string;
}

const defaultSettings: Settings = {
  interval: 50,
  spacing: 8,
  fontSize: "text-base",
  fontWeight: "font-medium",
  font: "font-mono",
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

interface SettingsProviderProps extends PropsWithChildren {}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState(defaultSettings);

  const reset = () => {
    setSettings(defaultSettings);
  };
  
  return (
    <SettingsContext.Provider value={{ settings, setSettings, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}
