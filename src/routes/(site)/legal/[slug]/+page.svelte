<script lang="ts">
	import type { PageData } from './$types';
	import RichText from '$com/ui/RichText.svelte';

	export let data: PageData;

	const { entry } = data || {};
	const { displayTitle, richText } = entry || {};
</script>

<section class="px-20">
	<div class="_intro-reveal-sm mx-auto flex flex-col bp:max-w-1000">
		{#if displayTitle}
			<h1 class="text-900 font-medium leading-10">{displayTitle}</h1>
		{/if}
		{#if richText}
			<div class="mt-40 bp:mt-24">
				<RichText text={richText} type="block-sm" />
			</div>
		{/if}
	</div>
</section>
