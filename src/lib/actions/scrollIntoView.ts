import { reducedMotion } from '$lib/utils/device/reducedMotion';

type Options = ScrollIntoViewOptions & {
	canScroll?: boolean;
};

/**
 * This action will scroll the element into view on mount.
 * @param node The HTMLElement to scroll into view
 * @param options The options to pass to the scrollIntoView method
 */
export const scrollIntoView = (node: HTMLElement, options: Options = { canScroll: true }) => {
	// undefined should act as the default, which is true
	if (options?.canScroll === false) {
		return;
	}

	// Set defaults
	options = {
		block: 'center',
		inline: 'nearest',
		behavior: 'smooth',
		...(options || {})
	};

	// Make sure we override the behavior if reduced motion is enabled
	if (reducedMotion()) {
		options.behavior = 'auto';
	}

	node?.scrollIntoView(options);
};
