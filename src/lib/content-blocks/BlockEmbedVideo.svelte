<script lang="ts">
	import type { ContentBlocks_EmbedVideo_BlockType } from 'src/craft';
	import DefaultVideoEmbed from '$com/ui/DefaultVideoEmbed.svelte';

	export let block: ContentBlocks_EmbedVideo_BlockType;

	const { videoUrl, caption } = block || {};
	const thumbnail = block?.videoThumbnail?.[0];
</script>

{#if videoUrl}
	<figure class="space-y-8 bp:space-y-12">
		<DefaultVideoEmbed url={videoUrl} poster={thumbnail} />
		{#if caption}
			<figcaption class="text-200 leading-30 text-black-500-alpha">
				{caption}
			</figcaption>
		{/if}
	</figure>
{/if}
