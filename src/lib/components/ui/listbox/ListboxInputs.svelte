<script lang="ts">
	import { mounted } from '$lib/stores/mounted';
	import { getListboxContext } from './Listbox.svelte';

	const { value, settings, computeOptionValue } = getListboxContext();
</script>

{#if $mounted}
	{#if Array.isArray($value)}
		{#each $value as value}
			<input type="hidden" readonly name={$settings.name} value={computeOptionValue(value)} />
		{/each}
	{:else}
		<input type="hidden" readonly name={$settings.name} value={computeOptionValue($value)} />
	{/if}
{/if}
