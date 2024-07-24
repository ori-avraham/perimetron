import Header from "@/components/header";
import ThemeProvider from "@/providers/theme-provider";
import Controls from "@/components/controls";
import Digits from "@/components/digits";
import PlaybackProvider from "@/providers/playback-provider";
import SettingsProvider from "./providers/settings-provider";

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <PlaybackProvider>
          <Header />
          <div className="text-center mt-6">
            <h1 className="mb-4 text-3xl font-extrabold text-primary md:text-5xl lg:text-6xl">
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r to-[#9d7cd8] dark:to-[#bb9af7] from-[#ff9e64] dark:from-[#ffc777]"
              >
                Perimetron
              </span>{" "}
              Simulator
            </h1>
            <p className="text-lg font-normal lg:text-xl text-muted-foreground">
              Infinite PI
            </p>
          </div>
          <Digits />
          <Controls />
        </PlaybackProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
