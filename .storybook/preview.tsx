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
					<Source />
					<Controls />
					<Stories includePrimary={false}/>
				</div>
			),
			canvas: {
				// Disable the default "show code" panel under the primary story because it doesn't handle slot content
				// https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
				// The <Source /> component rendered manually above will pick up per-story overrides whereas the one this disables doesn't
				sourceState: 'none'
			}
		},
	},
};

export default preview;