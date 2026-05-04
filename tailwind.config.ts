import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tahoma: ['Tahoma', 'Geneva', 'sans-serif'],
        comic: ['"Comic Sans MS"', '"Chalkboard SE"', 'cursive'],
        mono: ['"Lucida Console"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
