import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ScrollingPhrases, { type ScrollingPhrasesProps } from './ScrollingPhrases.vue';

const meta: Meta<ScrollingPhrasesProps> = {
	title: 'Atoms/ScrollingPhrases',
	component: ScrollingPhrases,
	tags: ['autodocs'],
	args: {
		phrases: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
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
	parameters: {
		controls: { exclude: ['startText', 'phrases', 'endText'] },
	}
};