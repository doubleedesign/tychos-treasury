import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Scroller, { type ScrollerProps } from './Scroller.vue';

const meta: Meta<ScrollerProps> = {
	title: 'Atoms/Scroller',
	component: Scroller,
	tags: ['autodocs'],
	args: {
		showAdjacent: true,
		infinite: true
	},
	argTypes: {
		items: {
			control: { type: 'object', disable: true },
			// eslint-disable-next-line max-len
			description: 'The items to be scrolled. Can be an array of strings, HTMLElements, or VNodes. Alternatively, more complex content can be passed in as slot content.',
			table: { type: { summary: 'string[] | HTMLElement[] | VNode[]' } }
		},
		orientation: {
			control: { type: 'select' },
			options: ['vertical', 'horizontal']
		}
	},
	parameters: {
		docs: {
			// eslint-disable-next-line max-len
			subtitle: 'A foundational component to provide core layout and functionality for scrolling content such as carousels. Keeps all content in the DOM while providing visual scrolling and methods for moving between items.',
			description: {
				// eslint-disable-next-line max-len
				component: 'Note: The consuming component must call the methods for moving between items; this component does not automatically scroll by itself.'
			},
		},
	}
};

export default meta;

type Story = StoryObj<ScrollerProps>;

export const Primary: Story = {
	tags: ['!dev'],
	args: {
		orientation: 'vertical',
		items: [
			'Mercury',
			'Venus',
			'Earth',
			'Mars',
			'Jupiter',
			'Saturn',
			'Uranus',
			'Neptune'
		]
	},
};

export const Basic_Vertical_Strings: Story = {
	tags: ['!autodocs'],
	args: {
		orientation: 'vertical',
		items: [
			'Mercury',
			'Venus',
			'Earth',
			'Mars',
			'Jupiter',
			'Saturn',
			'Uranus',
			'Neptune'
		]
	},
	parameters: {
		controls: { exclude: ['items', 'orientation'] }
	}
};

export const Basic_Vertical_Nodes: Story = {
	tags: ['!autodocs'],
	args: {
		orientation: 'vertical',
		items: generateDemoNodes()
	},
	parameters: {
		controls: { exclude: ['items', 'orientation'] }
	}
};

export const Basic_Horizontal_Nodes: Story = {
	tags: ['!autodocs'],
	args: {
		orientation: 'horizontal',
		items: generateDemoNodes()
	},
	parameters: {
		controls: { exclude: ['items', 'orientation'] }
	}
};

function generateDemoNodes(quantity = 6) {
	const nodes = [];
	const content = [
		'I\'m a gym member. I try to go four times a week, but I\'ve missed the last twelve hundred times.',
		'If you want to receive emails about my upcoming shows, please give me money so I can buy a computer.',
		'I\'m not great at the advice. Can I interest you in a sarcastic comment?',
		'Just to be clear, comedy with the plates will not be well-received.',
		'The cushions are the essence of the chair!',
		'Look at me! I\'m Chandler! Could I *be* wearing any more clothes?'
	];
	const colours = [
		'#eee',
		'#e8ffcc',
		'#e8f0ff',
		'#fff0e8',
	];

	for (let i = 1; i <= quantity; i++) {
		const node = document.createElement('div');
		node.innerHTML = content[Math.floor(Math.random() * content.length)];
		node.style.setProperty('padding', '1rem');
		node.style.setProperty('background', colours[Math.floor(Math.random() * colours.length)]);
		node.style.setProperty('box-sizing', 'border-box');
		node.style.setProperty('width', '200px');

		nodes.push(node);
	}

	return nodes;
}