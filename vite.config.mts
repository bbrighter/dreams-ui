import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/dreams',
    plugins: [
        react(),
        visualizer({
            filename: 'bundle-stats.html',
            open: true, // Opens the file automatically
        }),
    ],
    build: {
        rollupOptions: {
            treeshake: true,
        },
    },
})
