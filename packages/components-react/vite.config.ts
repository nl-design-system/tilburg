/* eslint-env node */
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Components React',
      formats: ['es', 'cjs'],
      // Emit `index.esm.js` + `index.cjs.js` to match package.json's
      // main/module fields.
      fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.cjs.js'),
    },
    rollupOptions: {
      // Keep React (including `react/jsx-runtime`, which the JSX compiles to), react-dom and the declared
      // dependency `clsx` out of the bundle: consumers bring their own copies. Bundling the JSX runtime ties the
      // package to the React version it was built with.
      external: [/^react($|\/)/, /^react-dom($|\/)/, 'clsx'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [react()],
});
