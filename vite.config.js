import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Vuetify into its own chunk (it's a large library)
          'vuetify': ['vuetify'],
          // Split Vue core libraries
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // Split form validation libraries
          'validation': ['vee-validate', 'yup'],
          // Split other utilities
          'utils': ['axios'],
        },
      },
    },
    // Increase chunk size warning limit to 1000 kB (optional)
    chunkSizeWarningLimit: 1000,
  },
})

