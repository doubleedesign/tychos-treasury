import { render, screen } from '@testing-library/vue';
import Carousel from './Carousel.vue';

describe('Carousel', () => {
	it('renders', async () => {
		render(Carousel, {});

		expect(screen.getByTestId('Carousel')).toBeInTheDocument();
	});
});
