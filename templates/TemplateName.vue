<!-- Choose an API style and remove the other one and the comments. -->
<!-- Composition API -->
<script setup lang="ts">
export type TemplateNameProps = {
};

const props = defineProps<TemplateNameProps>();
</script>

<!-- Options API -->
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
	props: {
	},
	data() {
		return {
		};
	},
	computed: {
	},
	mounted() {
	},
	unmounted() {
	},
	methods: {
	},
});
</script>

<template>
	<div class="template-name">

	</div>
</template>

<style scoped lang="scss">
	.template-name {

	}
</style>
