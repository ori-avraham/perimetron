import ThemeSwitcher from "./theme-switcher";

export default function Header() {
  return (
    <header className="flex justify-between mb-6">
      <div className="flex items-center gap-2">
        <svg
          className="h-8 w-8 fill-current"
          viewBox="0 0 24 24"
          id="pi-square"
          data-name="Flat Color"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect id="primary" x="2" y="2" width="20" height="20" rx="2"></rect>
          <path
            id="secondary"
            d="M17,16a1,1,0,0,1-1-1V8.75a4.46,4.46,0,0,0,1.71-1,1,1,0,1,0-1.42-1.42,2.37,2.37,0,0,1-1.7.71H9.41A4.4,4.4,0,0,0,6.29,8.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0A2.31,2.31,0,0,1,9,9v5.28a2.81,2.81,0,0,1-.82,2,1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0A4.83,4.83,0,0,0,11,14.32V9h3v6a3,3,0,0,0,3,3,1,1,0,0,0,0-2Z"
            className="fill-cyan-400"
          ></path>
        </svg>
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Perimetron
        </span>
      </div>
      <ul className="flex flex-row items-center space-x-1 rounded-lg font-medium rtl:space-x-reverse dark:border-slate-700">
        <li>
          <a
            href="/"
            className="me-2 inline-flex items-center rounded-lg border border-cyan-700 p-2.5 text-center text-sm font-medium text-cyan-700 hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:bg-cyan-500 dark:hover:text-white dark:focus:ring-cyan-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32M200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.81 43.81 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.81 43.81 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.72 41.72 0 0 1 7 22.52Z"
              ></path>
            </svg>
            <span className="sr-only">Icon description</span>
          </a>
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>
    </header>
  );
}
