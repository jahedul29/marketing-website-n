<!--
The FlyPageTransition component manages the transitioning store and the fly visual transition
that drives it.
-->
<script lang="ts">
	import { blur, type BlurParams } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { endTransition, registerTransition } from '$lib/stores/pageTransition';
	import { reducedMotion } from '$lib/utils/device/reducedMotion';

	const inParams: BlurParams = {
		duration: reducedMotion() ? 0 : 500,
		easing: expoOut
	};

	const outParams: BlurParams = {
		duration: reducedMotion() ? 0 : 500,
		easing: expoOut
	};

	const transitioning = registerTransition('default');
</script>

{#if !$transitioning}
	<div in:blur={inParams} out:blur={outParams} on:outroend={endTransition}>
		<slot />
	</div>
{/if}
