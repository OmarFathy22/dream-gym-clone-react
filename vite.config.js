/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser';

export default defineConfig({
  plugins: [
    react(),
    // use the following for production build
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: true,
    }),
    terser()
  ],
});


