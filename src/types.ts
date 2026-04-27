export const THEME_BASE_COLORS = [
	'primary',
	'secondary',
	'accent',
	'light',
	'dark',
];

export const THEME_COLORS = [
	...THEME_BASE_COLORS,
	'error',
	'success',
	'warning',
	'info',
];

export type ThemeColor = (typeof THEME_COLORS)[number];