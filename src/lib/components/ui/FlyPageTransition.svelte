<!--@docs
The FlyPageTransition component manages the transitioning store and the fly visual transition
that drives it.
-->
<script lang="ts">
	import { fly, type FlyParams } from 'svelte/transition';
	import { expoIn, expoOut } from 'svelte/easing';
	import { registerTransition, endTransition } from '$lib/stores/pageTransition';

	let _in: FlyParams = {};
	export { _in as in };
	export let out: FlyParams = {};

	const defaults = {
		duration: 250,
		y: 60
	} as const;

	const inParams: FlyParams = {
		...defaults,
		easing: expoOut,
		..._in
	};

	const outParams: FlyParams = {
		...defaults,
		y: -defaults.y,
		easing: expoIn,
		...out
	};

	const transitioning = registerTransition('default');
</script>

{#if !$transitioning}
	<div in:fly={inParams} out:fly={outParams} on:outroend={endTransition}>
		<slot />
	</div>
{/if}
