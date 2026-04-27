import { render, screen } from '@testing-library/vue';
import Scroller from './Scroller.vue';

describe('Scroller', () => {

	describe.each([['vertical'], ['horizontal']])('%s orientation', async (orientation: 'horizontal' | 'vertical') => {
		it('displays the active item', async () => {
			render(Scroller, { props: {
				items: ['Mercury', 'Venus', 'Earth', 'Mars'],
				orientation
			} });

			expect(screen.getByTestId('active')).toBeVisible();
		});

		it('visually displays the previous and next phrases if showAdjacent is true', () => {
			render(Scroller, { props: {
				items: ['Mercury', 'Venus', 'Earth', 'Mars'],
				showAdjacent: true,
				orientation
			} });

			expect(screen.getByTestId('prev')).toBeVisible();
			expect(screen.getByTestId('next')).toBeVisible();
		});

		it('does not visually display the previous and next phrases if showAdjacent is false', () => {
			render(Scroller, {
				props: {
					items: ['Mercury', 'Venus', 'Earth', 'Mars'],
					showAdjacent: false,
					orientation
				}
			});

			expect(screen.getByTestId('prev')).not.toBeVisible();
			expect(screen.getByTestId('next')).not.toBeVisible();
		});
	});

	it('updates the active item correctly when moveNext is called from the start', async () => {
		render(Scroller, { props: {
			items: ['Mercury', 'Venus', 'Earth', 'Mars'],
		} });

		const component = (screen.getByTestId('active') as any).__vueParentComponent.proxy;
		await component.moveNext();

		expect(screen.getByTestId('active')).toHaveTextContent('Venus');
	});

	it('updates the active item correctly when moveNext is called from the end', async () => {
		render(Scroller, { props: {
			items: ['Mercury', 'Venus', 'Earth', 'Mars'],
		} });

		const component = (screen.getByTestId('active') as any).__vueParentComponent.proxy;
		await component.movePrev();
		await component.moveNext();

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');
	});

	it('updates the active item correctly when movePrev is called from the start', async () => {
		render(Scroller, { props: {
			items: ['Mercury', 'Venus', 'Earth', 'Mars'],
		} });

		const component = (screen.getByTestId('active') as any).__vueParentComponent.proxy;
		await component.movePrev();

		expect(screen.getByTestId('active')).toHaveTextContent('Mars');
	});

	it('updates the active item correctly when movePrev is called from the middle', async () => {
		render(Scroller, { props: {
			items: ['Mercury', 'Venus', 'Earth', 'Mars'],
		} });

		const component = (screen.getByTestId('active') as any).__vueParentComponent.proxy;
		await component.moveNext();
		await component.movePrev();

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');
	});
});
