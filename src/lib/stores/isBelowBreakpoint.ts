import { browser } from '$app/environment';
import { readable } from 'svelte/store';

/**
 * A readable store that returns true if the current viewport is smaller
 * than the bp breakpoint, which is 800px.
 */
export const isBelowBreakpoint = readable<boolean>(false, (set) => {
	const onChange = (event: MediaQueryListEvent) => {
		set(!event.matches);
	};
	if (!browser) {
		return;
	}
	if (!window.matchMedia) {
		return;
	}
	const mediaQuery = window.matchMedia('(min-width: 800px)');
	set(!mediaQuery.matches);
	mediaQuery.addEventListener?.('change', onChange);
	// Support older safaris
	if (!mediaQuery.addEventListener) {
		mediaQuery.addListener?.(onChange);
	}
});
