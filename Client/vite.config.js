import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    origin: "http://localhost:5173",
    proxy: {
      "/v1": {
        target: "https://api.vultrinference.com",
        changeOrigin: true,
        secure: false, // ignore SSL for development
        rewrite: (path) => path.replace(/^\/v1/, "/v1"),
      },
    },
  },
});
