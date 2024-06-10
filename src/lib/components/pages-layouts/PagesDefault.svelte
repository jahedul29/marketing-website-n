<script lang="ts">
	import type { RelatedEventTypes_GlobalSet, RelatedFeatures_GlobalSet } from 'src/craft';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import HeaderDefault from '$com/headers/HeaderDefault.svelte';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import RelatedFeatures from '$com/pages-default/RelatedFeatures.svelte';
	import HeaderLeadGeneration from '$com/headers/HeaderLeadGeneration.svelte';
	import RelatedEventTypes from '$com/pages-default/RelatedEventTypes.svelte';

	export let entry: PagesDefault;
	export let relatedFeatures: PagesDefault[] | undefined;
	export let relatedFeaturesSection: RelatedFeatures_GlobalSet | undefined;
	export let relatedEventTypes: PagesDefault[] | undefined;
	export let relatedEventTypesSection: RelatedEventTypes_GlobalSet | undefined;

	const {
		modules,
		surtitle,
		displayTitle,
		plainText,
		bubbles,
		buttons,
		color,
		pageType,
		hubspotFormId,
		headerModules,
		embedCode,
		embedVideoUrl,
		label,
		logosTitle,
		homeLogos,
		fullHeightMedia
	} = entry || {};
	const image = entry?.image?.[0];
	const media = entry?.media?.[0];
	const mask = entry?.pageMask?.[0];
</script>

<DefaultRythm>
	{#if pageType === 'leadGeneration'}
		<HeaderLeadGeneration
			{surtitle}
			{displayTitle}
			{plainText}
			{buttons}
			{hubspotFormId}
			{media}
			{fullHeightMedia}
			{embedCode}
			{embedVideoUrl}
			{color}
			{label}
			{logosTitle}
			logos={homeLogos}
		/>
	{:else}
		<HeaderDefault
			{surtitle}
			{displayTitle}
			{plainText}
			{image}
			{mask}
			{buttons}
			{bubbles}
			{color}
			showModules={!!headerModules?.length}
			{logosTitle}
			logos={homeLogos}
		>
			<svelte:fragment slot="modules">
				{#if headerModules?.length}
					<DefaultRythm>
						<ComponentSelector entries={headerModules} />
					</DefaultRythm>
				{/if}
			</svelte:fragment>
		</HeaderDefault>
	{/if}
	<ComponentSelector entries={modules} />
	{#if pageType === 'feature' && relatedFeatures?.length}
		<RelatedFeatures
			title={relatedFeaturesSection?.displayTitle}
			text={relatedFeaturesSection?.plainText}
			{relatedFeatures}
		/>
	{/if}
	{#if pageType === 'eventType' && relatedEventTypes?.length}
		<RelatedEventTypes title={relatedEventTypesSection?.displayTitle} {relatedEventTypes} />
	{/if}
</DefaultRythm>
