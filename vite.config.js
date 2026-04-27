import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',           // ← Это самое важное для GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})