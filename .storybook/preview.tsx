import type { Preview } from '@storybook/vue3-vite';
import { Title, Subtitle, Description, Primary, Controls, Stories, Source } from '@storybook/addon-docs/blocks';
import '../src/global.css';
import './preview.css';

const preview: Preview = { 
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			page: () => (
				// @ts-expect-error TS2875: This JSX tag requires the module path react/jsx-runtime to exist, but none could be found.
				<div>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Controls />
					<Stories includePrimary={false}/>
				</div>
			),
		},
	},
};

export default preview;