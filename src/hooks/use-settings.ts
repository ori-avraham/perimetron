import { SettingsContext } from "@/providers/settings-provider";
import { useContext } from "react";

export const useSettings = () => {
  const settingsContext = useContext(SettingsContext);

  if (!settingsContext) {
    throw new Error(
      "useSettings has to be used within <SettingsContext.Provider>"
    );
  }

  return settingsContext;
};
