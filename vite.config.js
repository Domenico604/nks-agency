import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Это предотвратит ошибку "unintended external module"
      external: [],
    },
  },
  optimizeDeps: {
    // Явно включаем эти библиотеки в оптимизацию
    include: ['recharts', 'framer-motion'],
  },
})
