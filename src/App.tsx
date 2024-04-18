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
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Perimetron
              </span>{" "}
              Simulator
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
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
