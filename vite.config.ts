/// <reference types="vitest/config"/>
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'

export default defineConfig({
  base: '/dreams',
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-stats.html',
      open: true,
    }),
    checker({
      typescript: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/__tests__/setupTest.ts',
    coverage: {
      provider: 'v8',
    },
  },
})
