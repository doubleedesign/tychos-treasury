<script lang="ts">
import ArrowLeft from '../../icons/ArrowLeft.vue';
import ArrowRight from '../../icons/ArrowRight.vue';
import { ThemeColor } from '../../types.ts';
import { defineComponent, useSlots, type PropType, type VNode } from 'vue';
import Scroller from '../../atoms/Scroller/Scroller.vue';

export type CarouselProps = {
	colorTheme?: ThemeColor;
};

export default defineComponent({
	components: { Scroller, ArrowLeft, ArrowRight },
	props: {
		colorTheme: {
			type: String as PropType<ThemeColor>,
			default: 'accent',
		},
	},
	data() {
		return {
			items: [] as VNode[]
		};
	},
	computed: {
		// This is in computed (not data) so that the component responds to selection changes in Storybook.
		// Similar logic would presumably apply if trying to implement dark mode and other client-side theme options.
		themeColor() {
			return `var(--color-${this.$props.colorTheme})`;
		},
	},
	mounted() {
		const slots = useSlots();
		this.items = slots.default?.() ?? [];
	},
	unmounted() {
		this.items = [];
	},
	methods: {
		prev() {
			this.$refs.scrollerRef.movePrev();
		},
		next() {
			this.$refs.scrollerRef.moveNext();
		},
	},
});
</script>

<template>
	<div class="carousel" v-if="items.length > 1">
		<div class="carousel__items">
			<Scroller ref="scrollerRef" :show-adjacent="false" orientation="horizontal">
				<div v-for="(item, index) in items" :key="index" class="carousel__items__node">
					<component :is="item"/>
				</div>
			</Scroller>
		</div>
		<div class="carousel__nav">
			<button aria-label="Previous item" class="carousel__nav__button carousel__nav__button--prev" @click="prev">
				<ArrowLeft/>
			</button>
			<button aria-label="Next item" class="carousel__nav__button carousel__nav__button--next" @click="next">
				<ArrowRight/>
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '../../functions';

	.carousel {
		--theme-color: v-bind(themeColor);
		width: fit-content;

		&__nav {
			display: flex;
			gap: var(--spacing-xxs, 0.25rem);

			&__button {
				cursor: pointer;
				border: 0;
				background: 0;
				appearance: none;
				background: var(--theme-color);
				border-radius: 2rem;
				padding: 0.5rem;
				line-height: 1;
				width: 2.25rem;
				height: 2.25rem;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: background 0.3s ease, filter 0.3s ease-in-out, transform 0.3s ease-in-out;

				svg {
					width: 1.5rem;
					height: 1.5rem;
					fill: contrast-color(var(--theme-color));
				}

				&:hover, &:focus, &:active {
					background: darken-theme-color(30%);
					filter: saturate(130%);
				}

				&--prev {
				}

				&--next {
				}
			}
		}

		&__items {
			width: fit-content;

			&__node {
				min-width: 400px;
				min-height: 400px;
			}
		}
	}
</style>
