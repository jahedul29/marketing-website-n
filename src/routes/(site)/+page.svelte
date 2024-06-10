<script lang="ts">
	import type { PageData } from './$types';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderHome from '$com/headers/HeaderHomev2.svelte';
	import ImageTab from '$lib/components/imageTab/ImageTab.svelte';
	import HomeGraphic from '$lib/modules/HomeGraphic.svelte';

	export let data: PageData;

	const entry = data?.entry;
	const { displayTitle, plainText, buttons, logosTitle, homeLogos, embedVideoUrl, label } =
		entry || {};
	const headerModules = entry?.headerModules;
	const media = entry?.media?.[0];
	const mask = entry?.pageMask?.[0];
	const modules = entry?.modules;
</script>

<div>
	<HomeGraphic />
	<DefaultRythm>
		<HeaderHome
			{displayTitle}
			{plainText}
			{buttons}
			logos={homeLogos}
		>
			<svelte:fragment slot="modules">
				{#if modules?.length}
					<DefaultRythm>
						<ComponentSelector entries={headerModules} />
					</DefaultRythm>
				{/if}
			</svelte:fragment>
		</HeaderHome>
		<ImageTab/>
		<ComponentSelector entries={modules} />
	</DefaultRythm>
</div>
