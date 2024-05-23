import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import dotenv from "dotenv";

// dotenv.config();

// const isProduction = process.env.ENVIRONMENT === "production";

export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    proxy: {
      "/api": {
        target: "https://technomedia-5gpn.onrender.com",
        // process.env.VITE_API_URL
        changeOrigin: true,
        secure: true,
        // isProduction
      },
    },
  },
});
