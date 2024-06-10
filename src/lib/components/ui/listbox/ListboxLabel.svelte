<script lang="ts">
	import { mounted } from '$lib/stores/mounted';
	import { getListboxContext } from './Listbox.svelte';

	export let as: keyof svelteHTML.IntrinsicElements = 'label';
	let classes: Maybe<string> = null;
	export { classes as class };

	const { listboxId, registerElement, elements } = getListboxContext();

	const id = `${listboxId}-label`;

	const onClick = () => {
		$elements.button?.focus({ preventScroll: true });
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if !$mounted || as === 'label'}
	<label {id} class={classes} for={listboxId} use:registerElement={'label'} on:click={onClick}>
		<slot />
	</label>
{:else}
	<svelte:element this={as} {id} class={classes} use:registerElement={'label'} on:click={onClick}>
		<slot />
	</svelte:element>
{/if}
