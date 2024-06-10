<script lang="ts">
	import PagesComparison from '$com/pages-layouts/PagesComparison.svelte';
	import PagesDefault from '$com/pages-layouts/PagesDefault.svelte';

	export let data;

	$: ({
		entry,
		relatedFeatures,
		relatedFeaturesSection,
		relatedEventTypes,
		relatedEventTypesSection
	} = data || {});
</script>

{#key entry}
	{#if entry?.__typename === 'pages_default_Entry'}
		<PagesDefault
			{entry}
			{relatedEventTypes}
			{relatedEventTypesSection}
			{relatedFeatures}
			{relatedFeaturesSection}
		/>
	{/if}
	{#if entry?.__typename === 'pages_comparison_Entry'}
		<PagesComparison {entry} />
	{/if}
{/key}
