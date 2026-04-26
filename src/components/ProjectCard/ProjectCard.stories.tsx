import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ProjectCard, { type ProjectCardProps } from './ProjectCard.vue';

const meta: Meta<ProjectCardProps> = {
	title: 'Components/ProjectCard',
	component: ProjectCard,
	args: {
		title: 'Example Project',
		description: 'This is a description of the example project. It provides an overview of the project\'s features and functionality.',
		image: 'https://via.placeholder.com/300x200.png?text=Project+Image',
		url: '#'
	}
};
export default meta;

type Story = StoryObj<ProjectCardProps>;

export const Basic: Story = {
	tags: ['autodocs'],
};