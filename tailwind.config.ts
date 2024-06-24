import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        a4: "29.7cm",
      },
      width: {
        a4: "21cm",
      },
      colors: {
        bws: "#be1e2d",
      },
      fontFamily: {
        aptos: ['"Aptos (body)"', "sans-serif"],
      },
      padding: {
        msmargin: "2.54cm",
      },
      fontSize: {
        "word-20": "26.7px",
      },
    },
  },
  plugins: [],
};
export default config;
