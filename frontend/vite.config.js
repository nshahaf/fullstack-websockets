import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public/', // Adjust the path to your backend folder
    emptyOutDir: true, // Clears the output directory before each build
  },
})
