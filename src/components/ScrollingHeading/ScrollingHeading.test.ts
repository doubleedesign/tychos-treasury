import { render, screen } from '@testing-library/vue';
import ScrollingHeading from './ScrollingHeading.vue';

describe('ScrollingHeading', () => {
	it('renders', async () => {
		render(ScrollingHeading, { props: {
			startText: 'The',
			phrases: ['heart-stoppin’', 'house rockin’','history makin’', 'legendary'],
			endText: 'E Street Band'
		} });

		expect(screen.getByRole('heading', { name: /E Street Band/ })).toBeVisible();
	});

	it('has the expected default phrasing for assistive technologies', async () => {
		render(ScrollingHeading, { props: {
			startText: 'The',
			phrases: ['heart-stoppin’', 'house rockin’','history makin’', 'legendary'],
			endText: 'E Street Band'
		} });

		expect(screen.getByRole('heading')).toHaveAccessibleName('The heart-stoppin’, house rockin’, history makin’, and legendary E Street Band');
	});

	it('has the expected phrasing for assistive technologies without adding "and"', async () => {
		render(ScrollingHeading, { props: {
			startText: 'The',
			phrases: ['heart-stoppin’', 'house rockin’','history makin’', 'legendary'],
			endText: 'E Street Band',
			a11yAnd: false
		} });

		expect(screen.getByRole('heading')).toHaveAccessibleName('The heart-stoppin’, house rockin’, history makin’, legendary E Street Band');
	});

	it('displays the scrolling phrases', async () => {
		render(ScrollingHeading, { props: {
			startText: 'The',
			phrases: ['heart-stoppin’', 'house rockin’','history makin’', 'legendary'],
			endText: 'E Street Band'
		} });

		expect(screen.getByText(/heart-stoppin’/)).toBeVisible();
	});
});
