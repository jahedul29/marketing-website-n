<script lang="ts">
	import type { ContentBlocks_Emphasis_BlockType } from 'src/craft';
	import RichText from '$com/ui/RichText.svelte';

	export let block: ContentBlocks_Emphasis_BlockType;

	const { color, headline, text } = block || {};
</script>

<div class="space-y-12 rounded-20 p-24" data-theme-color={color || ''}>
	{#if headline}
		<h3 class="text-400 font-medium leading-30">{headline}</h3>
	{/if}
	{#if text}
		<RichText {text} type="inline" let:text>
			<p class="text-300 leading-40">{@html text}</p>
		</RichText>
	{/if}
</div>
