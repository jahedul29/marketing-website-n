<script lang="ts">
	import Media from '$com/ui/Media.svelte';
	import RichText from '$com/ui/RichText.svelte';
	import type { ContentBlocks_TextMedia_BlockType } from 'src/craft';

	export let block: ContentBlocks_TextMedia_BlockType;

	const text = block?.richText;
	const caption = block?.caption;
	const media = block?.media?.[0];
</script>

<div class="clearfix space-y-24 bp:space-y-0">
	{#if media}
		<figure class="clearfix space-y-8 bp:float-left bp:mb-16 bp:mr-32 bp:max-w-1/3">
			<Media class="rounded-16" {media} sizes={[{ width: '20rem' }]} />
			{#if caption}
				<figcaption class="text-200 leading-20 text-black-500-alpha">
					{caption}
				</figcaption>
			{/if}
		</figure>
	{/if}
	{#if text}
		<div class="bp:clear-right">
			<RichText {text} type="block-sm" />
		</div>
	{/if}
</div>
