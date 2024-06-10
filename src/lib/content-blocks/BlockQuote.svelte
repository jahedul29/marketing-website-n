<script lang="ts">
	import type { ContentBlocks_Quote_BlockType } from 'src/craft';

	export let block: ContentBlocks_Quote_BlockType;

	const { quote, sourceName, sourceRole } = block || {};
</script>

<figure class="space-y-4 border-l-4 border-lightblue-300 pl-16 bp:space-y-32 bp:pl-32">
	<blockquote>
		<p class="text-500 font-medium leading-40">{quote}</p>
	</blockquote>
	{#if sourceName}
		<figcaption class="text-400 text-black-750-alpha">
			- {sourceName}{#if sourceRole},&nbsp;{sourceRole}{/if}
		</figcaption>
	{/if}
</figure>
