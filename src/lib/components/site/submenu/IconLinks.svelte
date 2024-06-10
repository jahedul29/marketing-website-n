<script lang="ts">
	import type {
		Buttons_Default_Entry,
		IconLinks_Link_BlockType,
		SubMenuSection_IconLinks_Entry
	} from 'src/craft';
	import SectionBase from '$com/site/submenu/SectionBase.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import Image from '$com/ui/Image.svelte';

	type IconLinksBlock = IconLinks_Link_BlockType & {
		button?: Buttons_Default_Entry[];
	};

	export let section: SubMenuSection_IconLinks_Entry;

	const title = section?.displayTitle;
	const iconLinks = section?.iconLinks as IconLinksBlock[];
</script>

<SectionBase {title}>
	{#if iconLinks?.length}
		<ul class="max-w-600 space-y-12 bp:space-y-24">
			{#each iconLinks as link, i}
				{@const icon = link.icon?.[0]}
				{@const button = link.button?.[0]}
				{@const text = link.text}
				<li class="_submenu-item flex w-full" style="--i: {i};">
					<CraftButton
						class="group flex w-full items-start space-x-20 rounded-16 bg-grey-100 p-8 bp:bg-white"
						{button}
						let:label
					>
						{#if icon}
							<span
								class="flex h-56 w-56 flex-shrink-0 items-center justify-center rounded-8 bg-white bp:bg-grey-100"
							>
								<Image class="h-36 w-36" image={icon} sizes={[{ width: '4rem' }]} />
							</span>
						{/if}
						<span class="flex flex-col items-start space-y-4 py-8 bp:py-0">
							<span
								class="_submenu-link-title transition-colors group-hover:text-blue-500"
							>
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
