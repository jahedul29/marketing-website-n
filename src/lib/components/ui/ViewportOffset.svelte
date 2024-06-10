<!--@docs
Component that listens to scroll events on the window and triggers an action when
the threshold has been reached.

Wrap your navigation with this component and use the slot prop to style your elements.

@exec ViewportOffset.svelte

```
<ViewportOffset offset={100} tolerance={5} let:triggered>
	{triggered ? 'On' : 'Off'}
</ViewportOffset>
```

Note: The example is not working in the docs because the window does not scroll.
-->
<script lang="ts" context="module">
	import { readonly, writable, type Readable } from 'svelte/store';
	import { getContext } from 'svelte';
	export interface ViewportOffsetApi {
		triggered: Readable<boolean>;
		reset: () => void;
	}
	const CONTEXT_KEY = '__viewportOffset__';
	export const getViewportOffsetContext = () => getContext<ViewportOffsetApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { throttleRaf } from '$lib/utils/timeout/throttleRaf';
	import { scroll } from '$lib/stores/window/scroll';
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';

	/**
	 * Distance in px between the top of the page and the point at which the action is triggered
	 */
	export let offset = 0;

	/**
	 * Safe scroll distance in px (does not trigger anything while the tolerance is not reached)
	 */
	export let tolerance = 0;

	/**
	 * If reset is true, the distance to scroll before the reset state is turned back to false.
	 */
	export let resetScrollDistance = 100;

	const triggered = writable(false);
	let lastY = 0;
	let isReset = false;
	let scrolledDistance = 0;

	const reset = () => {
		triggered.set(false);
		isReset = true;
		scrolledDistance = 0;
	};

	const onScroll = throttleRaf(() => {
		const scrollY = window.scrollY;
		const dy = lastY - scrollY;
		scrolledDistance = scrolledDistance + Math.abs(dy);
		lastY = scrollY;
		triggered.update((s) => {
			// If we haven't reached the tolerance, don't do anything
			if (Math.abs(dy) <= tolerance) {
				return s;
			}
			// If we are reset and the resetScrollDistance has been reached, set scrolledDistance to `0` and isReset to `false`
			if (isReset && scrolledDistance >= resetScrollDistance) {
				scrolledDistance = 0;
				isReset = false;
			}
			// If we are reset, don't do anything
			if (isReset) {
				return s;
			}
			// Check if we are past the trigger offset
			return scrollY > offset;
		});
	});

	setContext<ViewportOffsetApi>(CONTEXT_KEY, {
		triggered: readonly(triggered),
		reset
	});

	onMount(() => {
		onScroll();
		return scroll.subscribe(onScroll);
	});
</script>

<slot triggered={$triggered} {reset} />
