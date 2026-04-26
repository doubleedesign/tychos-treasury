<script setup lang="ts">
import ScrollingPhrases, { ScrollingPhrasesProps } from '../../atoms/ScrollingPhrases/ScrollingPhrases.vue';
import { useResizeObserver } from '@vueuse/core';
import { useTemplateRef } from 'vue';

export type ScrollingHeadingProps = ScrollingPhrasesProps & {
	headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
	startText?: string;
	endText?: string;
};

const { headingLevel = 1, startText, endText, ...props } = defineProps<ScrollingHeadingProps>();
defineOptions({
	inheritAttrs: false,
});

const componentRef = useTemplateRef<HTMLElement>('component');
const scrollerRef = useTemplateRef('scroller');
const beforeScrollerTextRef = useTemplateRef('startText');
const afterScrollerTextRef = useTemplateRef('endText');

useResizeObserver(componentRef, (entries) => {
	// Reset the width overrides to get accurate re-measurements
	componentRef?.value?.style?.removeProperty('width');
	afterScrollerTextRef?.value?.style?.removeProperty('width');

	const isMultiline = isMultiLine(componentRef);
	if(!isMultiline) return;

	const scrollerRect = scrollerRef.value?.$el?.getBoundingClientRect();
	const beforeScrollerRect = beforeScrollerTextRef.value?.getBoundingClientRect();
	const toplineWidth = scrollerRect?.width + beforeScrollerRect?.width;
	componentRef?.value?.style?.setProperty('width', `calc(${toplineWidth}px + 0.5ch)`);

	const scrollerWidth = scrollerRect?.width || 0;
	afterScrollerTextRef?.value?.style?.setProperty('width', `calc(100% - ${scrollerWidth}px)`);
});

function isMultiLine(ref) {
	const componentRect = ref.value?.getBoundingClientRect();
	const singleLineHeight = parseFloat(getComputedStyle(ref.value!).fontSize);

	return componentRect?.height > singleLineHeight;
}
</script>

<template>
	<component ref="component" :is="`h${headingLevel}`" class="scrolling-heading">
		<span ref="startText" v-if="startText" class="scrolling-heading__start">{{ startText }}</span>
		<scrolling-phrases ref="scroller" class="scrolling-heading__phrases" v-bind="props"></scrolling-phrases>
		<span ref="endText" v-if="endText" class="scrolling-heading__end">{{ endText }}</span>
	</component>
</template>

<style scoped lang="scss">
	.scrolling-heading {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 0.5ch;
		width: fit-content;
		max-width: 100%;
		line-height: 1;

		&__phrases {
			margin-block: -1lh;
		}
	}
</style>
