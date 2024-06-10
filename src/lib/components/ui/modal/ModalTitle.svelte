<script lang="ts">
	import { getModalContext } from '$lib/components/ui/modal/Modal.svelte';

	export let as: keyof svelteHTML.IntrinsicElements = 'h3';
	let classes = '';
	export { classes as class };

	const modal = getModalContext();

	const id = `${modal?.id}-title`;
	modal?.setTitleId(id);
</script>

{#if modal}
	<svelte:element this={as} {id} class={classes}>
		<slot />
	</svelte:element>
{/if}
