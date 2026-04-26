import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
	'stories': [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx)' 
	],
	'addons': [
		'@storybook/addon-docs',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@doubleedesign/storybook-addon-accessibility-tree',
		'@whitespace/storybook-addon-html',
		'storybook-screen-reader'
	],
	'framework': '@storybook/vue3-vite',
	staticDirs: ['../sb-assets']
};
export default config;