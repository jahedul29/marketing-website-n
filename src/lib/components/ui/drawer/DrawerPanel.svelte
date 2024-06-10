<script lang="ts">
	import type { SlideOptions } from '$lib/actions/slide';
	import { getDrawerContext } from '$lib/components/ui/drawer/Drawer.svelte';
	import { slide } from '$lib/actions/slide';
	import { mounted } from '$lib/stores/mounted';

	let classes = '';
	export { classes as class };
	export let slideOptions: SlideOptions['options'] = {};

	const drawer = getDrawerContext();

	const { btnId, panelId, open, openDrawer } = drawer;
</script>

{#if drawer}
	{#if $mounted}
		<div
			use:slide={{ open: $open, options: slideOptions }}
			class={classes}
			aria-labelledby={btnId}
			id={panelId}
			on:focusin={openDrawer}
		>
			<slot />
		</div>
	{:else}
		<div class={classes}>
			<slot />
		</div>
	{/if}
{/if}
