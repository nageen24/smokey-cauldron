import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      // Avoid stale UI during development (service worker caching).
      devOptions: { enabled: false },
      manifest: {
        name: 'The Smokey Cauldron',
        short_name: 'Smokey Cauldron',
        description:
          'Harry Potter–inspired dining experience in F-6 Markaz, Islamabad.',
        theme_color: '#0b0f1a',
        background_color: '#0b0f1a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable any',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: false,
  },
})

