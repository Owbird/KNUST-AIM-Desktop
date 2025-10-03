import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@go": path.resolve(__dirname, "./wailsjs/go/"),
    },
  },
})
