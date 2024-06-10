<script lang="ts">
	import type { Buttons_Default_Entry, SubMenuSection_Cta_Entry } from 'src/craft';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import SectionBase from '$com/site/submenu/SectionBase.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import Image from '$com/ui/Image.svelte';
	import ArrowLinkInner from '$com/buttons/ArrowLinkInner.svelte';

	export let section: SubMenuSection_Cta_Entry;

	const title = section?.displayTitle;
	const image = section?.image?.[0];
	const text = section?.plainText;
	const button = section?.button?.[0] as Buttons_Default_Entry;
</script>

<SectionBase {title}>
	<CraftButton
		class="group flex w-full max-w-600 flex-col items-start space-y-20"
		{button}
		let:label
	>
		{#if image}
			<div class="_submenu-item w-full overflow-hidden rounded-16 bp:rounded-20">
				<Image class="_image-scale aspect-[2/1] w-full" {image} sizes={SIZES_CARD} />
			</div>
		{/if}
		{#if text}
			<div class="_submenu-item" style="--i: 1;">
				<div
					class="text-16 leading-30 text-black-750-alpha transition-colors group-hover:text-grey-900"
				>
					{text}
				</div>
			</div>
		{/if}
		<div class="_submenu-item" style="--i: 2;">
			<ArrowLinkInner {label} />
		</div>
	</CraftButton>
</SectionBase>
