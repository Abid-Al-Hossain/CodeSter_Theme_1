import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        layout01: 'layout-01.html',
        layout02: 'layout-02.html',
        layout03: 'layout-03.html',
        layout04: 'layout-04.html',
        layout05: 'layout-05.html',
        layout06: 'layout-06.html',
        layout07: 'layout-07.html',
        layout08: 'layout-08.html',
        layout09: 'layout-09.html',
        layout10: 'layout-10.html',
      }
    }
  }
})
