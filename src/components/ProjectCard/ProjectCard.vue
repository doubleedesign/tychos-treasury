<script setup lang="ts">
export type ProjectCardProps = {
	title: string;
	description: string;
	image: string;
	url: string;
};

const { title, description, image, url } = defineProps<ProjectCardProps>();
</script>

<template>
	<a class="project-card" :href="url">
		<div v-if="image" class="project-card__image">
			<img :src="image" alt="Project Image" />
		</div>
		<div class="project-card__header">
			<h2 class="project-card__title">{{ title }}</h2>
		</div>
		<div class="project-card__body">
			<p>{{ description }}</p>
		</div>
	</a>
</template>

<style scoped lang="scss">
	.project-card {
		display: block;
	}
</style>;
