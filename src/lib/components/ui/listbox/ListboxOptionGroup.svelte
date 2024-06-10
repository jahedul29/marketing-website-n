<script context="module" lang="ts">
	let id = 0;
	const getId = () => id++;
</script>

<script lang="ts">
	import { mounted } from '$lib/stores/mounted';
	import { getListboxContext } from './Listbox.svelte';

	export let label: string;
	let classes: Maybe<string> = null;
	export { classes as class };

	const { listboxId } = getListboxContext();

	const groupLabelId = `${listboxId}-option-group-${getId()}`;
</script>

{#if $mounted}
	<div role="group" aria-labelledby={groupLabelId}>
		<div aria-hidden="true" class={classes} id={groupLabelId}>
			{label}
		</div>
		<slot />
	</div>
{:else}
	<optgroup class={classes} {label}>
		<slot />
	</optgroup>
{/if}
