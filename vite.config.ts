import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'Tycho\'s Treasury',
			fileName: 'tychos-treasury'
		},
		rollupOptions: {
			// Externalize Vue so it isn't bundled into the library
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue'
				}
			}
		}
	},
	resolve: {
		dedupe: ['react', 'react-dom'],
	},
});