import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      backgroundImage: {
        portfolio:
          "radial-gradient(circle at 20% 20%, rgba(193,216,255,0.8) 16%, rgba(210,227,255,0.59) 62%, rgba(218,232,255,0.15) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
