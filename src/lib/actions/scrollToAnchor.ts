import { reducedMotion } from '$lib/utils/device/reducedMotion';

/**
 * This action will smoothly to the anchor link's target if it exists while
 * preserving the browser's default behavior.
 * @param node The anchor link
 */
export const scrollToAnchor = (node: HTMLAnchorElement) => {
	const onClick = (e: MouseEvent) => {
		const anchorId = (e.target as HTMLElement)?.closest('a')?.getAttribute('href');
		if (!anchorId) {
			return;
		}
		e.preventDefault();
		const el = document.querySelector(anchorId);
		if (!el) {
			return;
		}
		el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
		window.history.replaceState(window.history.state, '', anchorId);
	};
	node.addEventListener('click', onClick);
	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
};
