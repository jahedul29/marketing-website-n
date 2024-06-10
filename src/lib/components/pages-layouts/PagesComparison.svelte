<script lang="ts">
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderComparison from '$com/headers/HeaderComparison.svelte';
	import ComparedMedias from '$com/pages-comparison/ComparedMedias.svelte';
	import FeaturesList from '$com/pages-comparison/FeaturesList.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import ComparisonTable from '$com/pages-comparison/ComparisonTable.svelte';

	export let entry: PagesComparison;

	const comparedMedias = entry?.comparedMedias;
	const featuresListTitle = entry?.featuresListTitle;
	const features = entry?.richTextList;
	const modules = entry?.modules;
</script>

<DefaultRythm>
	<HeaderComparison {entry} />
	<ComparedMedias medias={comparedMedias} />
	<FeaturesList title={featuresListTitle} {features} />
	<ComparisonTable {entry} />
	<ComponentSelector entries={modules} />
</DefaultRythm>
