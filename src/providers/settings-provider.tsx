import {
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  useState,
  createContext,
} from "react";

interface SettingsContextType {
  generalSettings: GeneralSettings;
  setGeneralSettings: Dispatch<SetStateAction<GeneralSettings>>;
  digitsSettings: DigitsSettings;
  setDigitsSettings: Dispatch<SetStateAction<DigitsSettings>>;
  colorsSettings: ColorsSettings;
  setColorsSettings: Dispatch<SetStateAction<ColorsSettings>>;
  soundsSettings: SoundsSettings;
  setSoundsSettings: Dispatch<SetStateAction<SoundsSettings>>;
  resetGeneralSettings: () => void;
  resetDigitsSettings: () => void;
  resetColorsSettings: () => void;
  resetSoundsSettings: () => void;
}

interface GeneralSettings {
  presentation: string;
  interval: number;
  sounds: boolean;
}

interface DigitsSettings {
  spacing: number;
  font: string;
  fontSize: string;
  fontWeight: string;
}

type ColorMap = Record<string, string>;

interface ColorsSettings {
  colorMap: ColorMap;
  size: number;
}

type SoundMap = Record<string, string>;

interface SoundsSettings {
  soundMap: SoundMap;
  instrument: string;
}

const defaultGeneralSettings: GeneralSettings = {
  presentation: "digits",
  interval: 200,
  sounds: false,
};

const defaultDigitsSettings: DigitsSettings = {
  spacing: 8,
  font: "font-mono",
  fontSize: "text-base",
  fontWeight: "font-normal",
};

const defaultColorsSettings: ColorsSettings = {
  colorMap: {
    0: "#c0caf5",
    1: "#7dcfff",
    2: "#9d7cd8",
    3: "#ff9e64",
    4: "#c53b53",
    5: "#c3e88d",
    6: "#4fd6be",
    7: "#41a6b5",
    8: "#ff757f",
    9: "#c53b53",
  },
  size: 20,
};

const defaultSoundsSettings: SoundsSettings = {
  soundMap: {
    0: "C4",
    1: "D4",
    2: "E4",
    3: "F4",
    4: "G4",
    5: "A4",
    6: "B4",
    7: "C5",
    8: "D5",
    9: "E5",
  },
  instrument: "accordion",
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

interface SettingsProviderProps extends PropsWithChildren {}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [generalSettings, setGeneralSettings] = useState(
    defaultGeneralSettings
  );
  const [digitsSettings, setDigitsSettings] = useState(defaultDigitsSettings);
  const [colorsSettings, setColorsSettings] = useState(defaultColorsSettings);
  const [soundsSettings, setSoundsSettings] = useState(defaultSoundsSettings);

  const resetGeneralSettings = () => {
    setGeneralSettings(defaultGeneralSettings);
  };

  const resetDigitsSettings = () => {
    setDigitsSettings(defaultDigitsSettings);
  };

  const resetColorsSettings = () => {
    setColorsSettings(defaultColorsSettings);
  };

  const resetSoundsSettings = () => {
    setSoundsSettings(defaultSoundsSettings);
  };
  return (
    <SettingsContext.Provider
      value={{
        generalSettings,
        setGeneralSettings,
        digitsSettings,
        setDigitsSettings,
        colorsSettings,
        setColorsSettings,
        soundsSettings,
        setSoundsSettings,
        resetGeneralSettings,
        resetDigitsSettings,
        resetColorsSettings,
        resetSoundsSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
