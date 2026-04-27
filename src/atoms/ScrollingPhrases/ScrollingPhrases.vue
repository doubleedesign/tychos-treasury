<script lang="ts">
import { defineComponent, useTemplateRef } from 'vue';
import type { PropType } from 'vue';
import Scroller from '../Scroller/Scroller.vue';

export type ScrollingPhrasesProps = {
	phrases: string[];
	a11yAnd?: boolean;
	interval?: number;
	infinite?: boolean;
};

export default defineComponent({
	components: { Scroller },
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
			current: 0,
			hasKeyboardFocus: false,
			infinite: this.$props.infinite,
		};
	},
	computed: {
		phrasesText(): string {
			return this.a11yAnd
				? this.$props.phrases.slice(0, this.$props.phrases.length - 1).join(', ') + (this.$props.phrases.length > 1 ? ', and ' : '') + this.$props.phrases[this.$props.phrases.length - 1]
				: this.$props.phrases.join(', ');
		},
	},
	mounted() {
		this.start();
		this.$el.addEventListener('focusin', this.onFocusIn);
		this.$el.addEventListener('keydown', this.onKeyDown);
		this.$el.addEventListener('focusout', this.onFocusOut);
	},
	unmounted() {
		this.stop();
		this.$el.removeEventListener('focusin',  this.onFocusIn);
		this.$el.removeEventListener('focusout', this.onFocusOut);
		this.$el.removeEventListener('keydown',  this.onKeyDown);
	},
	methods: {
		start() {
			this.timer = setInterval(() => {
				this.update();
			}, this.interval);
		},
		stop() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		moveUp() {
			this.$refs.scrollerRef.movePrev();
		},
		moveDown() {
			this.$refs.scrollerRef.moveNext();
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
		onFocusIn() {
			// When the component receives keyboard focus, stop the automatic loop
			this.hasKeyboardFocus = true;
			this.stop();
		},
		onFocusOut() {
			// When keyboard focus leaves, restart the loop
			this.hasKeyboardFocus = false;
			this.start();
		},
		onKeyDown(event: KeyboardEvent) {
			if (!this.hasKeyboardFocus) return;

			// Listen for arrow key events and increment or decrement the current index accordingly
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				this.moveUp();
			}
			else if (event.key === 'ArrowDown') {
				event.preventDefault();
				this.moveDown();
			}
		},
	},
});
</script>

<template>
	<span class="scrolling-phrases" data-testId="scrolling-phrases" tabindex="0" :aria-label="phrasesText" role="img">
		<Scroller ref="scrollerRef" :items="phrases" :showAdjacent="true" :infinite="infinite"></Scroller>
	</span>
</template>

<style scoped lang="scss">
	.scrolling-phrases {
		display: inline-block;
	}
</style>;
