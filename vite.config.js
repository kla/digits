import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  esbuild: {
    minify: true,
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueNumber',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css')
            return 'fomo.css';
          return assetInfo.name;
        }
      }
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
