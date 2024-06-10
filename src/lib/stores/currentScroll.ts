import { browser } from '$app/environment';
import { derived } from 'svelte/store';
import { scroll } from './window/scroll';

type ScrollPosition = {
	x: number;
	y: number;
};

const scrollPos: ScrollPosition = { x: 0, y: 0 };

/**
 * A readable store that returns the current scroll positions
 * of the user (x and y).
 */
export const currentScroll = derived<typeof scroll, ScrollPosition>(
	scroll,
	!browser
		? () => scrollPos
		: () => {
				scrollPos.x = window.scrollX;
				scrollPos.y = window.scrollY;
				return scrollPos;
		  }
);
