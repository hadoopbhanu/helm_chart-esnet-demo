
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "neural-green": "#36FFB5",
        "neural-blue": "#00BFFF",
        "neural-pink": "#FF6CFF",
      },
      boxShadow: {
        neural: "0 0 15px rgba(54, 255, 181, 0.5)",
      },
      animation: {
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
