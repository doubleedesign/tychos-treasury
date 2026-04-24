<script setup lang="ts">
import ScrollingPhrases, { ScrollingPhrasesProps } from '../../atoms/ScrollingPhrases/ScrollingPhrases.vue';

export type ScrollingHeadingProps = ScrollingPhrasesProps &{
	headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
	startText?: string;
	endText?: string;
};

const { headingLevel = 1, a11yAnd = true, startText, phrases, endText } = defineProps<ScrollingHeadingProps>();
</script>;

<template>
	<component :is="`h${headingLevel}`" class="scrolling-heading">
		{{ startText }}
		<scrolling-phrases :phrases="phrases" :a11y-and="a11yAnd"></scrolling-phrases>
		{{ endText }}
	</component>
</template>;

<style scoped lang="scss">
	.scrolling-heading {
		display: flex;
		flex-direction: row;
		column-gap: 0.5ch;

		.scrolling-phrases {
			position: relative;
			top: -1lh;
		}
	}
</style>;
