<script lang="ts">
import { defineComponent, useTemplateRef } from 'vue';
import type { PropType } from 'vue';

export type ScrollingPhrasesProps = {
	phrases: string[];
	a11yAnd?: boolean;
	interval?: number;
	infinite?: boolean;
};

// TODO: This should probably be converted to Composition API just for consistency.
// (or change Composition API components to Options API...if only it worked better with TypeScript...)
export default defineComponent({
	props: {
		phrases: {
			type: Array as PropType<string[]>,
			required: true,
		},
		a11yAnd: {
			type: Boolean,
			default: true,
		},
		interval: {
			type: Number,
			default: 2000,
		},
		infinite: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			// TODO: Handle fewer than 5 phrases
			readyStageLeft: this.phrases.length - 2, // the phrase before the previous one - for CSS positioning purposes
			previous: this.phrases.length - 1,
			current: 0,
			next: 1,
			readyStageRight: 2, // the phrase after the next one - for CSS positioning purposes
			timer: null as number | null,
			hasKeyboardFocus: false,
		};
	},
	mounted() {
		this.start();

		// When the component receives keyboard focus, stop the automatic loop
		this.$el.addEventListener('focusin', () => {
			this.hasKeyboardFocus = true;
			this.stop();
		});

		// Listen for arrow key events and increment or decrement the current index accordingly
		this.$el.addEventListener('keydown', (event: KeyboardEvent) => {
			if (!this.hasKeyboardFocus) return;

			if (event.key === 'ArrowUp') {
				event.preventDefault();
				this.moveUp();
			}
			else if (event.key === 'ArrowDown') {
				event.preventDefault();
				this.moveDown();
			}
		});

		// When keyboard focus leaves, restart the loop
		this.$el.addEventListener('focusout', () => {
			this.hasKeyboardFocus = false;
			this.start();
		});
	},
	unmounted() {
		this.stop();
	},
	methods: {
		start() {
			this.timer = setInterval(() => {
				this.update();
			}, this.interval);
		},
		moveDown() {
			if(!this.infinite && this.current === this.phrases.length - 1) {
				return;
			}

			const oldReadyStageLeft = this.readyStageLeft;
			const oldPrevious = this.previous;
			const oldCurrent = this.current;
			const oldNext = this.next;
			const oldReadyStageRight = this.readyStageRight;

			this.readyStageLeft = this.getNextPhrase(oldReadyStageLeft);
			this.previous = this.getNextPhrase(oldPrevious);
			this.current = this.getNextPhrase(oldCurrent);
			this.next = this.getNextPhrase(oldNext);
			this.readyStageRight = this.getNextPhrase(oldReadyStageRight);
		},
		moveUp() {
			if(!this.infinite && this.current === 0) {
				return;
			}

			const oldReadyStageLeft = this.readyStageLeft;
			const oldPrevious = this.previous;
			const oldCurrent = this.current;
			const oldNext = this.next;
			const oldReadyStageRight = this.readyStageRight;

			this.readyStageRight = this.getPreviousPhrase(oldReadyStageRight);
			this.next = this.getPreviousPhrase(oldNext);
			this.current = this.getPreviousPhrase(oldCurrent);
			this.previous = this.getPreviousPhrase(oldPrevious);
			this.readyStageLeft = this.getPreviousPhrase(oldReadyStageLeft);
		},
		getPreviousPhrase(index: number) {
			let maybePreviousIndex = index - 1;
			// If the index is negative, wrap around to the end of the array by adding the length of the array
			// e.g., if index is -1 and length is 5, maybePreviousIndex will be -1 + 5 = 4, which is the last index of the array
			if(maybePreviousIndex < 0) {
				maybePreviousIndex += this.phrases.length;
			}

			return maybePreviousIndex;
		},
		getNextPhrase(index: number) {
			let maybeNextIndex = index + 1;
			// If the index is greater than or equal to the length of the array,
			// wrap around to the beginning of the array by subtracting the length of the array
			// e.g., if index is 5 and length is 5, maybeNextIndex will be 5 - 5 = 0, which is the first index of the array
			if(maybeNextIndex >= this.phrases.length) {
				maybeNextIndex -= this.phrases.length;
			}

			return maybeNextIndex;
		},
		update() {
			if(!this.timer) return; // loop has been stopped

			// Stop the loop if infinite is not true and we have reached the last item
			const lastIndex = this.phrases.length - 1;
			if (!this.infinite && this.current === lastIndex) {
				this.stop();

				return;
			}

			this.moveDown();
		},
		stop() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		}
	},
	computed: {
		phrasesText(): string {
			return this.a11yAnd
				? this.phrases.slice(0, this.phrases.length - 1).join(', ') + (this.phrases.length > 1 ? ', and ' : '') + this.phrases[this.phrases.length - 1]
				: this.phrases.join(', ');
		},
	},
});
</script>

<template>
	<span class="scrolling-phrases" data-testId="scrolling-phrases" tabindex="0" :aria-label="phrasesText" role="img">
		<span class="scrolling-phrases-mask" role="presentation">
			<template v-for="(phrase, index) in phrases" :key="index">
				<span
					class="scrolling-phrases__item"
					:class="{
						'scrolling-phrases__item--ready-stage-left': index === readyStageLeft,
						'scrolling-phrases__item--prev': index === previous,
						'scrolling-phrases__item--active': index === current,
						'scrolling-phrases__item--next': index === next,
						'scrolling-phrases__item--ready-stage-right': index === readyStageRight,
					}"
					:data-testId="index === current ? 'active' : (index === previous ? 'prev' : (index === next ? 'next' : null))"
				>
					{{ phrase }}
				</span>
			</template>
		</span>
	</span>
</template>

<style scoped lang="scss">
	.scrolling-phrases {
		display: flex;
		width: fit-content;
		height: 3lh;
		overflow: hidden;

		// Extra wrapper is needed to ensure the masking doesn't affect default focus outlines for keyboard users
		&-mask {
			display: flex;
			flex-direction: column;
			height: 100%;
			mask-image: linear-gradient(
				transparent 0.2lh,
				rgba(0, 0, 0, 0.25) 0.6lh,
				rgba(0, 0, 0, 0.5) 0.8lh,
				black 1lh,
				black 2lh,
				rgba(0, 0, 0, 0.5) 2.2lh,
				rgba(0, 0, 0, 0.25) 2.6lh,
				transparent 2.8lh
			);
		}

		&__item {
			display: block;
			opacity: 0;
			transition: all 0.4s ease;
			will-change: transform, opacity, order;
			order: 100;

			&--ready-stage-left {
				order: 1;
				margin-block-start: -1lh;
			}

			&--prev {
				order: 2;
				opacity: 0.65;
			}

			&--active {
				order: 3;
				opacity: 1;
			}

			&--next {
				order: 4;
				opacity: 0.65;
			}

			&--ready-stage-right {
				order: 5;
			}
		}
	}
</style>;
