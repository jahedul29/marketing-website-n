import { scroll } from '$lib/stores/window/scroll';
import { reducedMotion } from '$lib/utils/device/reducedMotion';

type ParallaxOptions = {
	speed?: number;
	onScroll?: (node: HTMLElement, scrollPercent: number) => void;
};

const DEFAULT_SPEED = 0.3;

export const parallax = (node: HTMLElement, options: ParallaxOptions = {}) => {
	if (reducedMotion()) {
		return;
	}

	const { speed, onScroll } = options;

	// Reset node to get proper top value
	node.hidden = true;
	requestAnimationFrame(() => {
		node.hidden = false;
	});

	node.classList.add('will-change-transform');

	const scrollContainer = getScrollParent(node);

	const setTranslate = () => {
		const y = scrollContainer?.scrollTop || window.scrollY;

		const nodeTop = node.getBoundingClientRect().top;

		const nodeY = nodeTop + y;

		const nodeHeight = node.clientHeight || node.offsetHeight || node.scrollHeight;

		const scrollPercent = (y - nodeY) / nodeHeight;

		const rate = typeof speed === 'number' ? speed : DEFAULT_SPEED;

		node.style.transform = `translate3d(0,${scrollPercent * (nodeHeight * rate)}px,0)`;

		onScroll?.(node, scrollPercent);
	};

	let rafId: number;

	const scrollHandler = () => {
		cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(setTranslate);
	};

	const setScrollListener = () => {
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', scrollHandler);
			return () => {
				scrollContainer.removeEventListener('scroll', scrollHandler);
			};
		}
		return scroll.subscribe(scrollHandler);
	};

	const scrollUnsub = setScrollListener();
	setTranslate();

	return {
		destroy: scrollUnsub
	};
};

const getScrollParent = (node: HTMLElement | null): HTMLElement | null => {
	if (node == null || node === document.body || node === document.documentElement) {
		return null;
	}
	const overflow = window.getComputedStyle(node).overflowY;
	if (node.scrollHeight > node.clientHeight && !['visible', 'hidden'].includes(overflow)) {
		return node;
	} else {
		return getScrollParent(node.parentElement);
	}
};
