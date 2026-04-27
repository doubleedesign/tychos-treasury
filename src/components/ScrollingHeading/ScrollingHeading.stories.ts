import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ScrollingHeading, { type ScrollingHeadingProps } from './ScrollingHeading.vue';
import { withMaxWidth, maxWidthControls } from '@doubleedesign/storybook-assorted-decorators';

const meta: Meta<ScrollingHeadingProps> = {
	title: 'Components/ScrollingHeading',
	component: ScrollingHeading,
	decorators: [
		withMaxWidth('650px'),
	],
	args: {
		headingLevel: 1,
		a11yAnd: false,
		interval: 2000,
		infinite: true,
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
			control: { type: 'number', step: 100 },
			description: 'The time in milliseconds between each phrase change.',
			table: { defaultValue: { summary: '2000' } },
		},
		infinite: {
			control: { type: 'boolean' },
			description: 'Whether the scrolling should loop infinitely or stop after one cycle.',
		},
		...maxWidthControls
	},
	parameters: {
		controls: { exclude: ['startText', 'phrases', 'endText'] },
	},
};

export default meta;

type Story = StoryObj<ScrollingHeadingProps>;

export const Basic: Story = {
	tags: ['autodocs'],
	args: {
		startText: 'The',
		phrases: ['heart-stoppin’', 'earth-shockin’', 'house rockin’', 'history makin’', 'Viagra-takin’', 'legendary'],
		endText: 'E Street Band',
		a11yAnd: false
	},
	parameters: {
		controls: {
			exclude: ['startText', 'phrases', 'endText', 'orientation']
		},
		docs: {
			source: {
				type: 'code',
				language: 'jsx',
				code: `
					<template>
						<ScrollingHeading
							startText="The"
							:phrases="['heart-stoppin’', 'earth-shockin’', 'house rockin’', 'history makin’', 'Viagra-takin’', 'legendary']"
							endText="E Street Band"
						/>
					</template>`
			},
		}
	}
};

export const Multiline_LongAfter: Story = {
	args: {
		startText: 'Hi, I\'m Leesa! I\'m a detail-oriented',
		phrases: ['software engineer', 'web developer', 'graphic designer', 'data dabbler', 'curious coder'],
		endText: 'with a penchant for design systems and automated testing.',
		a11yAnd: true
	}
};

export const Multiline_LongBefore: Story = {
	args: {
		startText: 'Thanks for stopping by! This is some placeholder text before a list of planets:',
		phrases: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
		endText: '(and also some after)',
	}
};

export const Multiline_LongBoth: Story = {
	args: {
		startText: 'Thanks for stopping by! This is some placeholder text before a list of planets:',
		phrases: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
		endText: '(and also some long text after to test what happens when this component has a lot of text)',
	}
};

export const NoTextBefore: Story = {
	args: {
		phrases: ['software engineer', 'web developer', 'graphic designer', 'data dabbler', 'curious coder'],
		endText: 'are some keywords that describe me',
		a11yAnd: true
	},
};

export const NoTextAfter: Story = {
	args: {
		startText: 'Hi, I\'m Leesa! I\'m a detail-oriented',
		phrases: ['software engineer', 'web developer', 'graphic designer', 'data dabbler', 'curious coder'],
		a11yAnd: true
	},
};