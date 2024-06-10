<script lang="ts">
	import type { SubMenuSectionSectionEntryUnion } from 'src/craft';
	import Default from '$com/site/submenu/Default.svelte';
	import IconLinks from '$com/site/submenu/IconLinks.svelte';
	import Releases from '$com/site/submenu/Releases.svelte';
	import Cta from '$com/site/submenu/Cta.svelte';
	import ImageLinks from '$com/site/submenu/ImageLinks.svelte';
	import CardLinks from '$com/site/submenu/CardLinks.svelte';

	export let sections: SubMenuSectionSectionEntryUnion[] = [];
	const COMPONENTS = {
		default: Default,
		iconLinks: IconLinks,
		releases: Releases,
		cta: Cta,
		imageLinks: ImageLinks,
		cardLinks: CardLinks
	};
</script>

{#if sections.length}
	<ul class="bp:flex bp:items-start bp:space-x-80">
		{#each sections as section}
			{@const component = COMPONENTS[section?.typeHandle]}
			<li class="flex last:flex-grow">
				<svelte:component this={component} {section} />
			</li>
		{/each}
	</ul>
{/if}
