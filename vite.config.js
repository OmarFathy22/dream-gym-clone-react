import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [
    react(),
    compression({
      ext: '.gz',
    }),
  ],
});


