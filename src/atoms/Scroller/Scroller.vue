<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export type ScrollerProps = {
	items: (string|HTMLElement)[];
	showAdjacent?: boolean;
	infinite?: boolean;
	orientation: 'vertical' | 'horizontal';
};

export default defineComponent({
	props: {
		items: {
			type: Array as PropType<any[]>,
			default: () => [],
		},
		showAdjacent: {
			type: Boolean,
			default: false,
		},
		infinite: {
			type: Boolean,
			default: true,
		},
		orientation: {
			type: String as PropType<'vertical' | 'horizontal'>,
			default: 'vertical',
		},
	},
	data() {
		let padded = this.$props.items.length < 3 ? [...this.$props.items, ...this.$props.items] : this.$props.items;
		if(this.showAdjacent) {
			// For the animation to work smoothly when showing adjacent items, there needs to be at least 6 items,
			// so if there are fewer we duplicate them (and add aria-hidden to them in the template)
			padded = this.$props.items.length < 6 ? [...this.$props.items, ...this.$props.items] : this.$props.items;
		}

		return {
			finalItems: padded,
			// the phrase before the previous one - for CSS positioning purposes when showing adjacent items
			readyStageLeft: this.showAdjacent ? padded.length - 2 : null,
			previous: padded.length - 1,
			current: 0,
			next: 1,
			// the item after the next one - for CSS positioning purposes when showing adjacent items
			readyStageRight: this.showAdjacent ? 2 : null
		};
	},
	mounted() {
		this.setSizeAndContentPosition();
	},
	updated() {
	},
	methods: {
		setSizeAndContentPosition() {
			// The actual items are wrapped in an extra element for styling purposes, so we need to get them from within that
			const wrapper = this.$el.querySelector('.scroller-mask') as HTMLElement;
			const children = Array.from(wrapper.children) as HTMLElement[];

			const widths = children.map((child) => (child as HTMLElement).offsetWidth);
			const maxWidth = Math.max(...widths);
			const itemWidth = maxWidth;
			const finalWidth = itemWidth * (this.showAdjacent && this.orientation === 'horizontal' ? 3 : 1);

			const heights = children.map((child) => (child as HTMLElement).offsetHeight);
			const maxHeight = Math.max(...heights);
			const itemHeight = maxHeight;
			this.$el.style.setProperty('--item-height', `${itemHeight}px`);
			const finalHeight = itemHeight * (this.showAdjacent && this.orientation === 'vertical' ? 3 : 1);

			if (this.orientation === 'horizontal') {
				this.$el.style.setProperty('--item-width', `${itemWidth}px`);
				// // Set the overall component width to fit the widest item
				(this.$el as HTMLElement).style.setProperty('width', `${finalWidth}px`);
			}
			else if(this.orientation === 'vertical') {
				this.$el.style.setProperty('--item-height', `${itemHeight}px`);
				// Set the overall component height to fit the largest item
				(this.$el as HTMLElement).style.setProperty('height', `${finalHeight}px`);
			}
		},
		moveNext() {
			if(!this.infinite && this.current === this.finalItems.length - 1) {
				return;
			}

			const oldPrevious = this.previous;
			const oldCurrent = this.current;
			const oldNext = this.next;
			this.previous = this.getNextItem(oldPrevious);
			this.current = this.getNextItem(oldCurrent);
			this.next = this.getNextItem(oldNext);

			if(this.showAdjacent) {
				const oldReadyStageLeft = this.readyStageLeft;
				const oldReadyStageRight = this.readyStageRight;
				this.readyStageLeft = this.getNextItem(oldReadyStageLeft);
				this.readyStageRight = this.getNextItem(oldReadyStageRight);
			}
		},
		movePrev() {
			if(!this.infinite && this.current === 0) {
				return;
			}

			const oldPrevious = this.previous;
			const oldCurrent = this.current;
			const oldNext = this.next;
			this.next = this.getPreviousItem(oldNext);
			this.current = this.getPreviousItem(oldCurrent);
			this.previous = this.getPreviousItem(oldPrevious);

			if(this.showAdjacent) {
				const oldReadyStageLeft = this.readyStageLeft;
				const oldReadyStageRight = this.readyStageRight;
				this.readyStageLeft = this.getPreviousItem(oldReadyStageLeft);
				this.readyStageRight = this.getPreviousItem(oldReadyStageRight);
			}
		},
		getPreviousItem(index: number) {
			let maybePreviousIndex = index - 1;
			// If the index is negative, wrap around to the end of the array by adding the length of the array
			// e.g., if index is -1 and length is 5, maybePreviousIndex will be -1 + 5 = 4, which is the last index of the array
			if(maybePreviousIndex < 0) {
				maybePreviousIndex += this.finalItems.length;
			}

			return maybePreviousIndex;
		},
		getNextItem(index: number) {
			let maybeNextIndex = index + 1;
			// If the index is greater than or equal to the length of the array,
			// wrap around to the beginning of the array by subtracting the length of the array
			// e.g., if index is 5 and length is 5, maybeNextIndex will be 5 - 5 = 0, which is the first index of the array
			if(maybeNextIndex >= this.finalItems.length) {
				maybeNextIndex -= this.finalItems.length;
			}

			return maybeNextIndex;
		},
		getItemPosition(index: number) {
			if(index === this.current) {
				return 'active';
			}
			else if(index === this.previous) {
				return 'prev';
			}
			else if(index === this.next) {
				return 'next';
			}
			else if(this.showAdjacent && index === this.readyStageLeft) {
				return 'ready-stage-left';
			}
			else if(this.showAdjacent && index === this.readyStageRight) {
				return 'ready-stage-right';
			}
			else {
				return null;
			}
		},
	},
});
</script>

<template>
	<div class="scroller" data-testid="scrolling-content" :data-orientation="orientation">
		<div class="scroller-mask" :data-showing-adjacent="showAdjacent" role="presentation">
			<template v-for="(item, index) in finalItems" :key="index">
				<span
					class="scroller__item"
					:aria-hidden="index >= this?.$props?.items?.length ? 'true' : null"
					:class="{
						'scroller__item--ready-stage-left': index === readyStageLeft,
						'scroller__item--prev': index === previous,
						'scroller__item--active': index === current,
						'scroller__item--next': index === next,
						'scroller__item--ready-stage-right': index === readyStageRight,
					}"
					:data-testId="index === current ? 'active' : (index === previous ? 'prev' : (index === next ? 'next' : null))"
					:data-position="getItemPosition(index)"
				>
					<template v-if="typeof item === 'string'">
						{{ item }}
					</template>
					<template v-if="typeof item === 'object' && 'outerHTML' in item">
						<div class="scroller__item__node" v-html="item.outerHTML" />
					</template>
				</span>
			</template>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.scroller {
		height: var(--item-height);
		width: fit-content;
		overflow: hidden;

		&:has([data-showing-adjacent="true"]) {
			height: calc(var(--item-height) * 3);
		}

		&[data-orientation='horizontal'] {
			height: var(--item-height);
		}

		// Extra wrapper needed to ensure the masking when showing adjacent items doesn't affect default focus outlines for keyboard users
		&-mask {
			display: flex;
			flex-direction: column;
			height: 100%;

			&[data-showing-adjacent="true"] {
				.scroller[data-orientation='horizontal'] & {
					--total-width: calc(var(--item-width) * 3);
					flex-direction: row;
					mask-image: linear-gradient(
						to right,
						transparent 0,
						rgba(0, 0, 0, 0.25) calc(var(--item-width) * 0.65),
						black var(--item-width),
						black calc(var(--item-width) * 2),
						rgba(0, 0, 0, 0.25) calc(var(--item-width) * 2.25),
						transparent var(--total-width)
					);
				}

				.scroller[data-orientation='vertical'] & {
					mask-image: linear-gradient(
						transparent calc(var(--item-height) * 0.2),
						rgba(0, 0, 0, 0.25) calc(var(--item-height) * 0.6),
						rgba(0, 0, 0, 0.5) calc(var(--item-height) * 0.8),
						black var(--item-height),
						black calc(var(--item-height) * 2),
						rgba(0, 0, 0, 0.5) calc(var(--item-height) * 2.2),
						rgba(0, 0, 0, 0.25) calc(var(--item-height) * 2.4),
						transparent calc(var(--item-height) * 2.9)
					);
				}
			}
		}

		&__item {
			display: block;
			width: var(--item-width, auto);
			min-width: var(--item-width, auto);
			height: var(--item-height, auto);
			min-height: var(--item-height, auto);
			opacity: 0;
			transition: all 0.4s ease;
			will-change: transform, opacity, order;
			order: 100;

			&--ready-stage-left {
				order: 1;

				.scroller[data-orientation='horizontal']:has([data-showing-adjacent="true"]) & {
					margin-inline-start: calc(var(--item-width) * -1);
				}

				.scroller[data-orientation='vertical']:has([data-showing-adjacent="true"]) & {
					margin-block-start: calc(var(--item-height) * -1);
				}
			}

			&--prev {
				order: 2;

				[data-showing-adjacent="true"] & {
					opacity: 0.65;
				}

				.scroller[data-orientation='horizontal']:has([data-showing-adjacent="false"]) & {
					margin-inline-start: calc(var(--item-width) * -1);
				}

				.scroller[data-orientation='vertical']:has([data-showing-adjacent="false"]) & {
					margin-block-start: calc(var(--item-height) * -1);
				}
			}

			&--active {
				order: 3;
				opacity: 1;
			}

			&--next {
				order: 4;

				[data-showing-adjacent="true"] & {
					opacity: 0.65;
				}
			}

			&--ready-stage-right {
				order: 5;
			}

			&__node {
				display: contents;
			}
		}
	}
</style>
