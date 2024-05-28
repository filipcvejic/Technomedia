import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("ENVIRONMENT:", import.meta.env.VITE_ENVIRONMENT);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,

        secure: import.meta.env.ENVIRONMENT === "production",
      },
    },
  },
});
