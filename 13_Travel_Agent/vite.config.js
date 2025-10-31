import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'grady-fordless-lourdes.ngrok-free.dev' // 👈 add your ngrok domain here
    ]
  }
});