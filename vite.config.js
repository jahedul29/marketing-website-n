import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => {
	return {
		plugins: [sveltekit({ hot: mode !== 'test' })],
		server: {
			port: 3000,
			strictPort: true
		},
		test: {
			globals: true,
			setupFiles: ['test/setup.ts'],
			environment: 'jsdom',
			css: true,
			include: ['./test/**/*.spec.{js,mjs,cjs,ts}'],
			coverage: {
				exclude: ['setup.ts']
			},
			// This alias is needed until this is resolved: https://github.com/vitest-dev/vitest/issues/2834
			alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }]
		}
	};
});
