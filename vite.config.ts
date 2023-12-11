/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: { target: 'es2020' },
  optimizeDeps: {
    esbuildOptions: { target: 'es2020', supported: { bigint: true } },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.ico',
        'favicon-180x180.png',
        'favicon-192x192.png',
        'favicon-512x512.png',
      ],
      manifest: {
        name: "Pas l'choix",
        short_name: "Pas l'choix",
        description: 'Une application pour désigner des volontaires',
        theme_color: '#005E4C',
        background_color: '#005E4C',
        lang: 'fr',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'social-mobile.jpg',
            sizes: '373x664',
            type: 'image/jpg',
            label: 'Screenshot mobile',
            platform: 'mobile',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
  },
});
