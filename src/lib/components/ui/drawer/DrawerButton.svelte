<script lang="ts">
	import { getDrawerContext } from '$lib/components/ui/drawer/Drawer.svelte';
	import { mounted } from '$lib/stores/mounted';

	let classes = '';
	export { classes as class };

	const drawer = getDrawerContext();

	const { btnId, panelId, onToggle, open } = drawer;
</script>

{#if drawer}
	{#if $mounted}
		<button
			class={classes}
			type="button"
			id={btnId}
			aria-expanded={$open}
			aria-controls={panelId}
			on:click={onToggle}
		>
			<slot />
		</button>
	{:else}
		<summary class={classes}>
			<slot />
		</summary>
	{/if}
{/if}
