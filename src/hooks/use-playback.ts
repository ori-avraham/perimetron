import { PlaybackContext } from "@/providers/playback-provider";
import { useContext } from "react";

export const usePlayback = () => {
  const playbackContext = useContext(PlaybackContext);

  if (!playbackContext) {
    throw new Error(
      "usePlayback has to be used within <PlaybackContext.Provider>"
    );
  }

  return playbackContext;
};
