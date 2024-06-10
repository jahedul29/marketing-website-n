<script lang="ts">
	import { mounted } from '$lib/stores/mounted';
	import { getSliderContext } from './Slider.svelte';

	export let clickable = false;

	const { state, goToStep } = getSliderContext();
</script>

{#if $mounted && $state.navEnabled}
	{#each new Array($state.stepCount) as _, index}
		{#if clickable}
			<button aria-hidden="true" tabindex="-1" type="button" on:click={() => goToStep(index)}>
				<slot {index} active={index === $state.currentStep} />
			</button>
		{:else}
			<slot {index} active={index === $state.currentStep} />
		{/if}
	{/each}
{/if}
