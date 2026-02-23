import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Force Vite to recognize the root correctly for path resolution
  root: process.cwd(), 
  
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  build: {
    // Explicitly define the output directory to avoid clashing with source folders
    outDir: 'dist',
    // Ensures the old dist is cleared before a new build
    emptyOutDir: true, 
    // Directory for static assets inside dist
    assetsDir: 'assets', 
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
})