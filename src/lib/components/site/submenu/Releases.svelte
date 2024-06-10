<script lang="ts">
	import type {
		Buttons_Default_Entry,
		ReleasesLinks_Link_BlockType,
		SubMenuSection_Releases_Entry
	} from 'src/craft';
	import SectionBase from '$com/site/submenu/SectionBase.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';

	type ReleasesLinksBlock = ReleasesLinks_Link_BlockType & {
		button?: Buttons_Default_Entry[];
	};

	export let section: SubMenuSection_Releases_Entry;

	const title = section?.displayTitle;
	const releasesLinks = section?.releasesLinks as ReleasesLinksBlock[];
</script>

<SectionBase {title}>
	{#if releasesLinks?.length}
		<ul class="max-w-600 space-y-24">
			{#each releasesLinks as link, i}
				{@const { tag, text } = link}
				{@const button = link?.button?.[0]}
				<li class="_submenu-item flex" style="--i: {i};">
					<CraftButton
						class="group flex w-full flex-col space-y-12 rounded-16 p-20 ring-1 ring-inset ring-grey-250 transition-shadow hover:ring-2 bp:rounded-20"
						{button}
						let:label
					>
						<span class="flex items-center justify-between space-x-4">
							<span class="_submenu-link-title">
								{label}
							</span>
							{#if tag}
								<span
									class="text-100 flex flex-shrink-0 rounded-full bg-wheat-500-alpha px-12 py-4 font-medium leading-20 text-wheat-700"
								>
									{tag}
								</span>
							{/if}
						</span>
						{#if text}
							<span class="_submenu-link-text">
								{text}
							</span>
						{/if}
					</CraftButton>
				</li>
			{/each}
		</ul>
	{/if}
	<!--  -->
</SectionBase>
