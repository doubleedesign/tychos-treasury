import { render, screen } from '@testing-library/vue';
import ScrollingPhrases from './ScrollingPhrases.vue';
import { nextTick } from 'vue';

describe('ScrollingPhrases', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	
	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByTestId('scrolling-phrases')).toBeVisible();
	});

	it('has the expected default phrasing for assistive technologies', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByTestId('scrolling-phrases')).toHaveAccessibleName('Mercury, Venus, Earth, and Mars');
	});

	it('has the expected phrasing for assistive technologies without adding "and"', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			a11yAnd: false
		} });

		expect(screen.getByTestId('scrolling-phrases')).toHaveAccessibleName('Mercury, Venus, Earth, Mars');
	});

	it('sets the initial current phrase to the first item in the list', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByText('Mercury')).toHaveClass('scrolling-phrases__item--active');
		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');
	});

	it('sets the initial next phrase to the second item in the list', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByText('Venus')).toHaveClass('scrolling-phrases__item--next');
		expect(screen.getByTestId('next')).toHaveTextContent('Venus');
	});

	it('sets the initial previous phrase to the last item in the list', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		screen.debug();

		expect(screen.getByText('Mars')).toHaveClass('scrolling-phrases__item--prev');
		expect(screen.getByTestId('prev')).toHaveTextContent('Mars');
	});

	it('visually displays the previous, current, and next phrases', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByText('Mercury')).toBeVisible();
		expect(screen.getByText('Venus')).toBeVisible();
		expect(screen.getByText('Mars')).toBeVisible();
	});

	it('does not visually display the phrases that are not currently active, next, or previous', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByText('Earth')).not.toBeVisible();
	});

	it('increments the current phrase at the specified interval', async () => {
		vi.useFakeTimers();

		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		vi.advanceTimersByTime(1000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Venus');
	});

	it('increments the next phrase at the specified interval', async () => {
		vi.useFakeTimers();

		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			interval: 1000
		} });

		expect(screen.getByTestId('next')).toHaveTextContent('Venus');

		vi.advanceTimersByTime(1000);
		await nextTick();

		expect(screen.getByTestId('next')).toHaveTextContent('Earth');
	});

	it('increments the previous phrase at the specified interval', async () => {
		vi.useFakeTimers();

		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			interval: 1000
		} });

		expect(screen.getByTestId('prev')).toHaveTextContent('Mars');

		vi.advanceTimersByTime(1000);
		await nextTick();

		expect(screen.getByTestId('prev')).toHaveTextContent('Mercury');
	});

	it('does not assign a test ID to phrases that are not currently active, next, or previous', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByText('Earth')).not.toHaveAttribute('data-testid');
	});

	it('does not assign a status class  to phrases that are not currently active, next, or previous', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars']
		} });

		expect(screen.getByText('Earth')).not.toHaveClass('scrolling-phrases__item--active');
		expect(screen.getByText('Earth')).not.toHaveClass('scrolling-phrases__item--next');
		expect(screen.getByText('Earth')).not.toHaveClass('scrolling-phrases__item--prev');
	});

	it('loops indefinitely when infinite is set to true', async () => {
		vi.useFakeTimers();

		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: true,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		vi.advanceTimersByTime(4000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		vi.advanceTimersByTime(1000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Venus');
	});

	it('stops at the last phrase when infinite is set to false', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: false,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		vi.advanceTimersByTime(3000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Mars');

		vi.advanceTimersByTime(1000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Mars');
	});

	it('stops automatic scrolling if the component receives keyboard focus', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: true,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		screen.getByTestId('scrolling-phrases').focus();
		vi.advanceTimersByTime(3000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');
	});

	it('restarts automatic scrolling if the component receives and then loses keyboard focus', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: true,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		screen.getByTestId('scrolling-phrases').focus();
		vi.advanceTimersByTime(3000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		screen.getByTestId('scrolling-phrases').blur();
		vi.advanceTimersByTime(1000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Venus');
	});

	it('moves to the next phrase on arrow-down key press and stops there', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: true,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		screen.getByTestId('scrolling-phrases').focus();
		await nextTick();
		await arrowKeyDown();

		expect(screen.getByTestId('active')).toHaveTextContent('Venus');

		vi.advanceTimersByTime(3000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Venus');
	});

	it('moves to the previous phrase on arrow-up key press and stops there', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: true,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		screen.getByTestId('scrolling-phrases').focus();
		await nextTick();

		await arrowKeyUp();

		expect(screen.getByTestId('active')).toHaveTextContent('Mars');

		vi.advanceTimersByTime(3000);
		await nextTick();

		expect(screen.getByTestId('active')).toHaveTextContent('Mars');
	});

	it('does not loop back around on arrow-down key press when infinite is false', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: false,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		screen.getByTestId('scrolling-phrases').focus();
		await nextTick();

		await arrowKeyDown();
		await arrowKeyDown();
		await arrowKeyDown();

		expect(screen.getByTestId('active')).toHaveTextContent('Mars');

		await arrowKeyDown();
		expect(screen.getByTestId('active')).toHaveTextContent('Mars');
	});

	it('does not loop back around on arrow-up key press when infinite is false', async () => {
		render(ScrollingPhrases, { props: {
			phrases: ['Mercury', 'Venus', 'Earth', 'Mars'],
			infinite: false,
			interval: 1000
		} });

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');

		screen.getByTestId('scrolling-phrases').focus();
		await nextTick();

		await arrowKeyUp();

		expect(screen.getByTestId('active')).toHaveTextContent('Mercury');
	});
});

async function arrowKeyUp() {
	screen.getByTestId('scrolling-phrases').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
	await nextTick();
}

async function arrowKeyDown() {
	screen.getByTestId('scrolling-phrases').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
	await nextTick();
}