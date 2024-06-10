<script lang="ts">
	import { getModalContext } from '$lib/components/ui/modal/Modal.svelte';

	export let as: keyof svelteHTML.IntrinsicElements = 'p';
	let classes = '';
	export { classes as class };

	const modal = getModalContext();

	const id = `${modal?.id}-description`;
	modal?.setDescriptionId(id);
</script>

{#if modal}
	<svelte:element this={as} {id} class={classes}>
		<slot />
	</svelte:element>
{/if}
