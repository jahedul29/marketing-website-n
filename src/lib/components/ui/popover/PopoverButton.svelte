<script lang="ts">
	import { getPopoverContext } from '$lib/components/ui/popover/Popover.svelte';

	let classes = '';
	export { classes as class };

	const api = getPopoverContext();
	const { registerButton, id, open, toggle } = api;
</script>

{#if api}
	<button
		use:registerButton
		class={classes}
		aria-controls={id}
		aria-expanded={$open}
		type="button"
		on:click={toggle}
	>
		<slot />
	</button>
{/if}
