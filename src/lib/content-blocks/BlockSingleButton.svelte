<script lang="ts">
	import type { Buttons_Default_Entry, ContentBlocks_SingleButton_BlockType } from 'src/craft';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	export let block: ContentBlocks_SingleButton_BlockType & { button?: Buttons_Default_Entry[] };

	const button = block?.button?.[0];
</script>

{#if button}
	<div class="flex justify-center bp:justify-start">
		<ButtonPrimary {button} type="filled" color="black" size="lg" />
	</div>
{/if}
