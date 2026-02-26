import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Betölti a környezeti változókat a projekt gyökeréből (frontend/.env)
  const env = loadEnv(mode, __dirname, '');

  return {
    plugins: [tailwindcss(), sveltekit()],
    build: {
      outDir: 'build'
    },
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID': JSON.stringify(env.VITE_GOOGLE_MAPS_PLACE_ID),
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
    }
  };
});
