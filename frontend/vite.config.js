import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		outDir: 'build'  // vagy 'public', 'output' vagy bármi más lehet, ami nálad van
	}
});
