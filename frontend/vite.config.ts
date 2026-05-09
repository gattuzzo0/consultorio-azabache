import path from "node:path";
import os from "node:os";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Fuera de OneDrive/`node_modules` para evitar EPERM al limpiar `.vite/deps` en Windows. */
const cacheDir = path.join(os.tmpdir(), "vite-cache-consultorio-azabache-frontend");

export default defineConfig({
  cacheDir,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  preview: { port: 4173, strictPort: true },
  appType: "spa",
});
