import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures process.env is polyfilled for the browser if needed, 
    // though using import.meta.env is preferred in Vite.
    'process.env': {}
  }
});