import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import dotenv from "dotenv";

// dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://technomedia-5gpn.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
