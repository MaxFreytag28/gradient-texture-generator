import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Enable edge runtime for better performance
			runtime: 'nodejs18.x',
			// Ensure CSS is processed correctly
			speedInsights: true
		})
	}
};

export default config;
