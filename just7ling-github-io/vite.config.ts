import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/JUST7LING.github.io/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "../docs",
  },
});

