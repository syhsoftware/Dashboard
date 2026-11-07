// =====================================================================
// ARCHIVO: vite.config.js
// ---------------------------------------------------------------------
// Único archivo de configuración que se edita a mano en este paso.
// package.json NO se escribe: lo genera Vite en el Paso 0.
// =====================================================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tailwind v4 se integra como plugin de Vite (no necesita tailwind.config).
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 Plugin oficial de Tailwind CSS v4
  ],
  css: {
    postcss: {}, // 👈 Blindaje para aislar PostCSS
  },
})