import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "@unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/tds-strat-db/",
  plugins: [react(), UnoCSS()],
  server: { host: "0.0.0.0", port: 5173 },
});
