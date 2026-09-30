import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GOOGLE_MAPS_EMBED_API_KEY')

  return {
    // Embed API keys are necessarily visible in the iframe URL.
    // Expose only this key; restrict it to the site's domains in Google Cloud.
    define: {
      'import.meta.env.GOOGLE_MAPS_EMBED_API_KEY': JSON.stringify(env.GOOGLE_MAPS_EMBED_API_KEY || ''),
    },
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
  }
})
