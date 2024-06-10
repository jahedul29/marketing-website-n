<script lang="ts">
	import type { ContentBlocks_Text_BlockType } from 'src/craft';
	import RichText from '$com/ui/RichText.svelte';

	export let block: ContentBlocks_Text_BlockType;

	const text = block?.richText;
</script>

<RichText {text} type="block" />
