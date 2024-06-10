<script lang="ts">
	import { getModalContext } from '$lib/components/ui/modal/Modal.svelte';

	let classes = '';
	export { classes as class };

	const modal = getModalContext();
</script>

{#if modal}
	<div aria-hidden="true" tabindex="-1" class="cursor-pointer {classes}" on:click={modal.close} />
{/if}
