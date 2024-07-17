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
        bgImg: "./img/bgImg.jpg",
      },
      height: {
        a4: "29.7cm",
        "17p": "17px",
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
        "word-25": "1.75rem",
        "word-20": "1.375rem",
        "word-18": "1.25rem",
        "word-16": "1.18rem",
        "word-11": ["0.84rem", "1.15"],
      },
      lineHeight: {
        "word-11": "1.15",
      },
    },
  },
  plugins: [],
};
export default config;
