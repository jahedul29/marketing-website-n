export type Bounds = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

/**
 * Given an HTMLElement, this function will check if any part of it is
 * position out of the document bounds.
 * @param el HTMLElement
 * @returns
 */
export const checkDocumentBounds = (el: HTMLElement) => {
	const elRect = el.getBoundingClientRect();
	const { top, right, bottom, left } = elRect;
	const outOfBounds: Bounds = {
		top: Math.max(0, -top),
		right: Math.max(0, -(window.innerWidth - right)),
		bottom: Math.max(0, -(document.documentElement.scrollHeight - bottom)),
		left: Math.max(0, -left)
	};
	return outOfBounds;
};
