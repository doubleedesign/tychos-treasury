import { render, screen } from '@testing-library/vue';
import TemplateName from './TemplateName.vue';

describe('TemplateName', () => {
	it('renders', async () => {
		render(TemplateName, {});

		expect(screen.getByTestId('TemplateName')).toBeInTheDocument();
	});
});
