
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  allowedHosts: [
    'edf49a65-25a9-4200-8027-d505b1450c1a-00-1nkryvdbzq7yo.sisko.replit.dev',
    '337ab5a7-c6df-461e-86e1-22ffc8fb245e-00-3ana08belj2ke.pike.replit.dev'
  ]
})
