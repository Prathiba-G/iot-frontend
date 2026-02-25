import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React vendor chunk
          'vendor-react': ['react', 'react-dom'],
          // Animation libraries chunk
          'vendor-animation': ['framer-motion', 'gsap'],
          // 3D libraries chunk (heavy)
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
