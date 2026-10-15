import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Prefer source TypeScript over old compiler-emitted JavaScript copies.
  resolve: { extensions: ['.mjs', '.ts', '.mts', '.js', '.jsx', '.tsx', '.json'] },
})
