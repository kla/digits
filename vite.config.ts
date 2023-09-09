import { resolve } from 'path'
import { defineConfig } from 'vite'
import { dependencies } from './package.json'
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
      name: 'digits',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: Object.keys(dependencies),
      output: {
        globals: { vue: 'vue' },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css')
            return 'digits.css';
          return assetInfo.name;
        }
      }
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
