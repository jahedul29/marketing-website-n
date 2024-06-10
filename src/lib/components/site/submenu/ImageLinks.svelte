<script lang="ts">
	import type {
		Buttons_Default_Entry,
		ImageLinks_Link_BlockType,
		SubMenuSection_ImageLinks_Entry
	} from 'src/craft';
	import SectionBase from '$com/site/submenu/SectionBase.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import Image from '$com/ui/Image.svelte';

	type ImageLinksBlock = ImageLinks_Link_BlockType & {
		button?: Buttons_Default_Entry[];
	};

	export let section: SubMenuSection_ImageLinks_Entry;

	const title = section?.displayTitle;
	const imageLinks = section?.imageLinks as ImageLinksBlock[];
</script>

<SectionBase {title}>
	{#if imageLinks?.length}
		<ul class="_links-grid grid gap-8 bp:gap-24">
			{#each imageLinks as link, i}
				{@const image = link?.image?.[0]}
				{@const button = link?.button?.[0]}
				<li class="flex w-full">
					<CraftButton
						class="_submenu-item group grid aspect-[7/10] w-full place-items-center overflow-hidden rounded-20 grid-stack"
						style="--i: {i};"
						{button}
						let:label
					>
						{#if image}
							<Image
								class="_image-scale h-full w-full object-cover"
								{image}
								sizes={[{ width: '20rem' }]}
							/>
						{/if}
						<span class="_image-veil" />
						<span
							class="relative px-20 text-center text-14 font-medium leading-20 text-white"
						>
							{label}
						</span>
					</CraftButton>
				</li>
			{/each}
		</ul>
	{/if}
</SectionBase>

<style lang="postcss">
	._links-grid {
		--card-width: theme('spacing.100');
		grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));

		@screen bp {
			--card-width: theme('spacing.124');
		}
	}
</style>
