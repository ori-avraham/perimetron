import { usePlayback } from "@/hooks/use-playback";
import SettingsModal from "./settings-modal";

export default function Controls() {
  const { isPlaying, setIsPlaying, reset, digits } = usePlayback();
  return (
    <div className="bg-slate-200 dark:bg-slate-800 bg-clip-padding backdrop-filter backdrop-blur-sm dark:bg-opacity-80 bg-opacity-80 fixed bottom-0 left-0 z-50 flex justify-center w-full h-24 px-8 border-t border-gray-400 dark:border-gray-200">
      <div className="flex items-center w-full">
        <div className="w-full">
          <div className="flex gap-3 items-center justify-center mx-auto mb-1">
            <SettingsModal />
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              type="button"
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              {isPlaying ? (
                <svg
                  className="w-8 h-8 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </button>
            <button
              onClick={reset}
              data-tooltip-target="tooltip-restart"
              type="button"
              className="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
                />
              </svg>
              <span className="sr-only">Restart video</span>
            </button>
          </div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-medium">
              Digits Generated: {digits.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
