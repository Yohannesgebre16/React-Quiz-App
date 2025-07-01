import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Dynamically set base for GitHub Pages or Vercel
const isGithubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isGithubPages ? '/React-Quiz-App/' : '/',
})
