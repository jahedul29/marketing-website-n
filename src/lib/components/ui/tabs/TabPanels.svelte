<script lang="ts">
	import { getTabGroupContext } from '$lib/components/ui/tabs/TabGroup.svelte';

	export let as: keyof svelteHTML.IntrinsicElements = 'div';
	let classes = '';
	export { classes as class };

	const tabGroup = getTabGroupContext();
</script>

{#if tabGroup}
	<svelte:element this={as} class={classes}>
		<slot />
	</svelte:element>
{/if}
