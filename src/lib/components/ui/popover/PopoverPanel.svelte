<script lang="ts">
	import { getPopoverContext } from '$lib/components/ui/popover/Popover.svelte';

	export let as: keyof svelteHTML.IntrinsicElements = 'div';
	let classes = '';
	export { classes as class };

	const api = getPopoverContext();
	const { registerPanel, id } = api;
</script>

{#if api}
	<svelte:element this={as} {id} class={classes} use:registerPanel>
		<slot />
	</svelte:element>
{/if}
