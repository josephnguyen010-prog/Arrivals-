import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset paths so a build works wherever it is served from —
  // the root in dev, a sub-path when embedded in the portfolio.
  base: "./",
  plugins: [react()],
});
