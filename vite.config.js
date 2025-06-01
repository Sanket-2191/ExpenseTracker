import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/domain': 'https://expensetracker-server-2k1m.onrender.com'
    }
  },
  plugins: [tailwindcss(), react()],
})
