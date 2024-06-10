<script lang="ts">
	import {
		getSliderContext,
		type Direction,
		type ScrollPosition
	} from '$lib/components/ui/slider/Slider.svelte';

	interface Button {
		clickHandler: () => void;
		disabledPosition: ScrollPosition;
	}

	interface Buttons {
		prev: Button;
		next: Button;
	}

	export let direction: Direction = 'next';
	let classes = '';
	export { classes as class };

	const slider = getSliderContext();

	const { state, onNavClick } = slider || {};

	const buttons: Buttons = {
		prev: {
			clickHandler: () => onNavClick('prev'),
			disabledPosition: 'start'
		},
		next: {
			clickHandler: () => onNavClick('next'),
			disabledPosition: 'end'
		}
	};

	const button = buttons[direction];

	$: disabled = $state.position === button.disabledPosition;
</script>

{#if slider && $state.navEnabled}
	<button
		aria-hidden="true"
		tabindex="-1"
		class={classes}
		type="button"
		on:click={button.clickHandler}
		{disabled}
	>
		<slot {disabled} />
	</button>
{/if}
