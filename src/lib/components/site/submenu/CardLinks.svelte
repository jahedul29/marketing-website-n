<script lang="ts">
	import type {
		Articles_Category,
		Buttons_Default_Entry,
		CardLinks_Link_BlockType,
		SubMenuSection_CardLinks_Entry
	} from 'src/craft';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import SectionBase from '$com/site/submenu/SectionBase.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import Image from '$com/ui/Image.svelte';

	type CardLinksBlock = CardLinks_Link_BlockType & {
		button?: Buttons_Default_Entry[];
		blogCategory?: Articles_Category[];
	};

	export let section: SubMenuSection_CardLinks_Entry;

	const title = section?.displayTitle;
	const cardLinks = section?.cardLinks as CardLinksBlock[];
</script>

<SectionBase {title}>
	{#if cardLinks?.length}
		<ul class="grid gap-24 bp:flex bp:gap-32">
			{#each cardLinks as link, i}
				{@const button = link?.button?.[0]}
				{@const category = link?.blogCategory?.[0]}
				{@const image = link?.image?.[0] || category?.image?.[0]}
				{@const text = link?.text}
				<li class="_submenu-item flex" style="--i: {i};">
					<CraftButton
						class="group flex items-start space-x-16 bp:max-w-260 bp:flex-col bp:space-x-0 bp:space-y-20"
						button={category
							? {
									siteEntry: [{ uri: category.uri, language: category.language }],
									label: category.title
							  }
							: button}
						let:label
					>
						{#if image}
							<div
								class="aspect-[4/3] w-124 flex-shrink-0 overflow-hidden rounded-16 bp:w-full"
							>
								<Image
									class="_image-scale h-full w-full object-cover"
									{image}
									sizes={SIZES_CARD}
								/>
							</div>
						{/if}
						<span class="flex flex-col space-y-8">
							<span class="_submenu-link-title">
								{label}
							</span>
							{#if text}
								<span class="_submenu-link-text">
									{text}
								</span>
							{/if}
						</span>
					</CraftButton>
				</li>
			{/each}
		</ul>
	{/if}
</SectionBase>
