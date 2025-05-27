import type { Config } from "tailwindcss";

const customColors = require('./colors.config')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: customColors,
      //  {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      // },
    },
    screens: {
      si: "320px",
      sj: "360px",
      sk: "480px",
      sl: "540px",
      sm: "640px",
      md: "768px",
      mdx: "860px",
      mc: "980px",
      lg: "1024px",
      lgs: "1180px",
      xl: "1280px",
      "2xl": "1320px",
      "2xlm": "1340px",
      "3xl": "1440px",  
      "4xl": "1480px",
    },
  },
  plugins: [],
};
export default config;
