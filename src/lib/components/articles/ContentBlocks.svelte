<script lang="ts">
	import { textToId } from '$lib/utils/string/textToId';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import TableOfContent from '$com/articles/TableOfContent.svelte';

	export let contentBlocks: ArticlesDefault['contentBlocks'];
</script>

<div class="space-y-60 bp:max-w-700">
	<TableOfContent {contentBlocks} />
	<ComponentSelector entries={contentBlocks} let:component let:entry>
		{@const id = textToId(entry?.anchorLabel || '') || null}
		<div {id} class="scroll-mt-120">
			<svelte:component this={component} block={entry} />
		</div>
	</ComponentSelector>
</div>
