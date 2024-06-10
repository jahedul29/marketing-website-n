<script lang="ts">
	import type { ContentBlocks_Media_BlockType } from 'src/craft';
	import DefaultVideo from '$com/ui/DefaultVideo.svelte';
	import Image from '$com/ui/Image.svelte';
	import { SIZES_FULL_MOBILE_THIRD_DESKTOP } from '$lib/utils/ui/imageSizes';

	export let block: ContentBlocks_Media_BlockType;

	const media = block?.media?.[0];
	const caption = block?.caption;
</script>

{#if media}
	<figure class="space-y-8 bp:space-y-12">
		{#if media?.kind === 'image'}
			<Image image={media} class="rounded-20" sizes={SIZES_FULL_MOBILE_THIRD_DESKTOP} />
		{:else if media?.kind === 'video'}
			<DefaultVideo {media} />
		{/if}
		{#if caption}
			<figcaption class="text-200 leading-30 text-black-500-alpha">
				{caption}
			</figcaption>
		{/if}
	</figure>
{/if}
