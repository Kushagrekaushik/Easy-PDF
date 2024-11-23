import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // host: '0.0.0.0',  // Make sure the app is accessible externally
    port: 5173,       // The port you want your app to run on
  },
});
