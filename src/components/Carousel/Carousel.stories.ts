import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Carousel, { type CarouselProps } from './Carousel.vue';
import { THEME_BASE_COLORS } from '../../types.ts';
import ProjectCard from '../ProjectCard/ProjectCard.vue';

const meta: Meta<CarouselProps> = {
	title: 'Components/Carousel',
	component: Carousel,
	tags: ['autodocs'],
	args: {
		colorTheme: 'accent'
	},
	argTypes: {
		colorTheme: {
			control: { type: 'select' },
			options: THEME_BASE_COLORS,
			description: 'The colour theme to use for styling. Set the value of your theme colours in your global CSS.',
		}
	},
};

export default meta;

type Story = StoryObj<CarouselProps>;

export const Basic_HTML: Story = {
	tags: ['!autodocs'],
	render: (args) => ({
		components: { Carousel },
		setup() {
			return { args };
		},
		template: `
			<Carousel v-bind="args">
				<div class="test-class-name"><p>Okay, well, who identified this restaurant's tone as "pretentious-comma-garlicky"?</p></div>
				<div><p>We might still have some money if your father hadn't thought it was a good idea to sell ice over the internet.</p></div>
				<div><p>Oh God. Can open. Worms everywhere!</p></div>
			</Carousel>
			`
	}),
	parameters: {
		docs: {
			source: {
				type: 'code',
				language: 'jsx',
				code: `
				<template>
					<Carousel colorTheme="accent">
						<ProjectCard title="Project 1" description="Description for project 1" />
						<ProjectCard title="Project 2" description="Description for project 2" />
						<ProjectCard title="Project 3" description="Description for project 3" />
						<ProjectCard title="Project 4" description="Description for project 4" />
						<ProjectCard title="Project 5" description="Description for project 5" />
						<ProjectCard title="Project 6" description="Description for project 6" />
					</Carousel>
				</template>
			`
			},
		}
	}
};

export const WithComponents: Story = {
	render: (args) => ({
		components: { Carousel, ProjectCard },
		setup() {
			return { args };
		},
		template: `
			<Carousel v-bind="args">
				<ProjectCard title="Project 1" description="Description for project 1" />
				<ProjectCard title="Project 2" description="Description for project 2" />
				<ProjectCard title="Project 3" description="Description for project 3" />
				<ProjectCard title="Project 4" description="Description for project 4" />
				<ProjectCard title="Project 5" description="Description for project 5" />
				<ProjectCard title="Project 6" description="Description for project 6" />
			</Carousel>
			`
	})
};