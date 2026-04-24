import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ScrollingHeading, { type ScrollingHeadingProps } from './ScrollingHeading.vue';

const meta: Meta<ScrollingHeadingProps> = {
	title: 'Components/ScrollingHeading',
	component: ScrollingHeading,
	tags: ['autodocs'],
	args: {
		// startText: 'Hi, I\'m Leesa! I\'m a detail-oriented',
		// phrases: ['software engineer', 'web developer', 'graphic designer', 'data dabbler', 'curious coder'],
		// endText: 'with a penchant for design systems and automated testing.',
		headingLevel: 1,
		startText: 'The',
		phrases: ['heart-stoppin’', 'earth-shockin’', 'house rockin’', 'history makin’', 'Viagra-takin’', 'legendary'],
		endText: 'E Street Band',
		a11yAnd: false,
		interval: 2000,
		infinite: true
	},
	argTypes: {
		headingLevel: {
			control: { type: 'number', min: 1, max: 6 },
			description: 'The HTML heading level to use (1-6).',
		},
		a11yAnd: {
			control: { type: 'boolean' },
			description: 'Whether to include "and" when passing the list of phrases as plain English text to assistive technologies',
		},
		interval: {
			control: { type: 'number' },
			description: 'The time in milliseconds between each phrase change.',
		},
		infinite: {
			control: { type: 'boolean' },
			description: 'Whether the scrolling should loop infinitely or stop after one cycle.',
		}
	},
	parameters: {
		controls: { exclude: ['startText', 'phrases', 'endText'] },
	}
};

export default meta;

type Story = StoryObj<ScrollingHeadingProps>;

export const Basic: Story = {
};