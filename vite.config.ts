import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@components": path.resolve(__dirname, "src/components")
    }
  }
})