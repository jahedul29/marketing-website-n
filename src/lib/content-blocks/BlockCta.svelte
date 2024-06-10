<script lang="ts">
	import type { Buttons_Default_Entry, ContentBlocks_Cta_BlockType } from 'src/craft';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import Image from '$com/ui/Image.svelte';
	import { SIZES_FULL_MOBILE_THIRD_DESKTOP } from '$lib/utils/ui/imageSizes';

	export let block: ContentBlocks_Cta_BlockType & { button?: Buttons_Default_Entry[] };

	const title = block?.displayTitle;
	const color = block?.color;
	const image = block?.image?.[0];
	const button = block?.button?.[0];
</script>

<div class="rounded-20 bp:flex bp:flex-row-reverse bp:rounded-24" data-theme-color={color || ''}>
	{#if image}
		<div class="bp:min-w-320 bp:max-w-320">
			<Image
				class="aspect-[3/2] h-full w-full rounded-20 object-cover bp:aspect-[auto] bp:rounded-24"
				{image}
				sizes={SIZES_FULL_MOBILE_THIRD_DESKTOP}
			/>
		</div>
	{/if}
	<div
		class="flex flex-grow flex-col items-center p-24 text-center bp:justify-between {image
			? 'space-y-24 bp:items-start bp:space-y-48 bp:p-32 bp:text-left'
			: 'space-y-16 bp:space-y-32 bp:px-48 bp:py-40'}"
	>
		{#if title}
			<h3 class="text-26 font-medium leading-20 bp:text-32">{title}</h3>
		{/if}
		{#if button}
			<ButtonPrimary {button} color="black" type="filled" size="lg" />
		{/if}
	</div>
</div>
