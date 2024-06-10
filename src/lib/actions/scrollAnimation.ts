import { inViewport } from '$lib/actions/inViewport';

type AnimClass = 'reveal';

type ScrollAnimationOptions = {
	animClass?: AnimClass;
	threshold?: number;
};

export const scrollAnimation = (
	node: HTMLElement,
	{ animClass, threshold }: ScrollAnimationOptions = {}
) => {
	node.dataset.scrollVisible = 'false';
	if (animClass) {
		node.classList.add(`_scroll-${animClass}`);
	}
	return inViewport(node, {
		once: true,
		threshold: typeof threshold === 'number' ? threshold : 0.2,
		callback: (isVisible) => {
			if (isVisible) {
				node.dataset.scrollVisible = 'true';
			}
		}
	});
};
