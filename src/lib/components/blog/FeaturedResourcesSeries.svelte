<script lang="ts">
	import CardResources from '$com/cards/CardResources.svelte';
	import DefaultSlider from '$com/ui/DefaultSlider.svelte';

	export let block: FeaturedResourcesSeriesBlock;

	const { displayTitle, plainText, resources } = block || {};
</script>

<DefaultSlider items={resources}>
	<svelte:fragment slot="heading">
		<div class="space-y-20 bp:space-y-32">
			{#if displayTitle}
				<h2 class="text-700 font-medium leading-10">{displayTitle}</h2>
			{/if}
			{#if plainText}
				<p class="text-300 text-black-750-alpha">{plainText}</p>
			{/if}
		</div>
	</svelte:fragment>
	<svelte:fragment slot="item" let:item>
		<CardResources entry={item} />
	</svelte:fragment>
</DefaultSlider>
