import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TemplateName, { type TemplateNameProps } from './TemplateName.vue';

const meta: Meta<TemplateNameProps> = {
	title: 'Patterns/TemplateName',
	component: TemplateName,
	tags: ['autodocs'],
	args: {},
};

export default meta;

type Story = StoryObj<TemplateNameProps>;

export const Basic: Story = {
};