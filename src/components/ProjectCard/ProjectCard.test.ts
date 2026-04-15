import { render, screen } from '@testing-library/vue';
import ProjectCard from './ProjectCard.vue';

describe('ProjectCard', () => {
	it('renders', async () => {
		render(ProjectCard, {});

		expect(screen.getByTestId('ProjectCard')).toBeInTheDocument();
	});
});
