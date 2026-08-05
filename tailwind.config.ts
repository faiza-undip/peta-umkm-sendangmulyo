import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12181A",       // near-black slate, base background
        plate: "#182428",     // signage plate surface, slightly lighter
        paper: "#F4F1E6",     // warm off-white for text/light surfaces
        gold: "#E3A234",      // wayfinding gold — halal certified accent
        teal: "#2F8F7C",      // route/teal — hygiene & map accent
        clay: "#C4562F",      // alert/priority accent, used sparingly
        line: "#2A3538",      // hairline / grid rule
      },
      fontFamily: {
        "avenir": ["Avenir"],
      },
    },
  },
  plugins: [],
};

export default config;
