import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ScrollingPhrases, { type ScrollingPhrasesProps } from './ScrollingPhrases.vue';

const meta: Meta<ScrollingPhrasesProps> = {
	title: 'Atoms/ScrollingPhrases',
	component: ScrollingPhrases,
	tags: ['autodocs'],
	args: {
		a11yAnd: false,
		infinite: true,
		interval: 2000,
	},
	argTypes: {
		phrases: {
			control: { type: 'object', disabled: true },
			description: 'The list of phrases to scroll through. Each phrase should be a string.',
		},
		a11yAnd: {
			control: { type: 'boolean' },
			description: 'Whether to include "and" when passing the list of phrases as plain English text to assistive technologies.',
		},
		infinite: {
			control: { type: 'boolean' },
			description: 'Whether the scrolling should loop infinitely or stop after one cycle.',
		},
		interval: {
			control: { type: 'number' },
			description: 'The time in milliseconds between each phrase change.',
		}
	},
};

export default meta;

type Story = StoryObj<ScrollingPhrasesProps>;

export const Basic: Story = {
	args: {
		phrases: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
	},
	parameters: {
		controls: { exclude: ['startText', 'phrases', 'endText'] },
	}
};


export const Basic_5items: Story = {
	args: {
		phrases: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter'],
	},
	parameters: {
		controls: { exclude: ['startText', 'phrases', 'endText'] },
	}
};

export const Basic_4items: Story = {
	args: {
		phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
	},
	parameters: {
		controls: { exclude: ['startText', 'phrases', 'endText'] },
	}
};


export const Basic_3items: Story = {
	args: {
		phrases: ['Mercury', 'Venus', 'Earth'],
	},
	parameters: {
		controls: { exclude: ['startText', 'phrases', 'endText'] },
	}
};