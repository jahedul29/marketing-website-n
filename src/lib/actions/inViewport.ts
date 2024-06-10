/*
 * inViewport action: offers a shared pool of `IntersectionObserver` instances that HTMLElement
 * can use to detect when the element is in the viewport. If many elements are using the same
 * params, they will register with the same `IntersectionObserver` instance, which uses less resources.
 */
type InViewportSetter = (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;

type PxOrPercent = `${number}px` | `${number}%`;

type InViewportOptions = {
	threshold: number | number[];
	once: boolean;
	rootMargin:
		| PxOrPercent
		| `${PxOrPercent} ${PxOrPercent}`
		| `${PxOrPercent} ${PxOrPercent} ${PxOrPercent}`
		| `${PxOrPercent} ${PxOrPercent} ${PxOrPercent} ${PxOrPercent}`;
	callback: InViewportSetter;
};

// From https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
const DEFAULT_ROOT_MARGIN = '0px 0px 0px 0px';

// Node to options map
const optionsMap = new WeakMap<Element, InViewportOptions>();
// Threshold to observer map
const observers = new Map<string, IntersectionObserver>();
// Observer usage
const observersUsage = new WeakMap<IntersectionObserver, number>();

const usage = (increment: number) => {
	return (observer: IntersectionObserver) => {
		const currentValue = !observersUsage.has(observer) ? 0 : observersUsage.get(observer) || 0;
		observersUsage.set(observer, Math.max(0, currentValue + increment));
	};
};
const increaseUsage = usage(1);
const decreaseUsage = usage(-1);

// Create a key for an observer
const makeKey = (threshold: number | number[], rootMargin: string) => {
	if (typeof threshold === 'number') {
		threshold = [threshold];
	}
	return `${threshold.join('-')}-${rootMargin || DEFAULT_ROOT_MARGIN}`;
};

// Cleans up everything when the job's done
const destroy = (observer: IntersectionObserver, node: Element, options: InViewportOptions) => {
	observer?.unobserve(node);
	optionsMap.delete(node);
	const usage = observersUsage.get(observer) || 0;
	if (usage < 2) {
		observer?.disconnect();
		observers.delete(makeKey(options.threshold, options.rootMargin));
		observersUsage.delete(observer);
	} else if (observer) {
		decreaseUsage(observer);
	}
};

// The IO callback
const callback: IntersectionObserverCallback = (entries) => {
	entries.forEach((entry) => {
		const options = optionsMap.get(entry.target);
		if (!options) {
			return;
		}

		try {
			options.callback(entry.isIntersecting, entry);
		} catch (ex) {
			console.error(ex);
		}

		if (options.once && entry.isIntersecting) {
			const observer = observers.get(makeKey(options.threshold, options.rootMargin));
			if (observer) {
				destroy(observer, entry.target, options);
			}
		}
	});
};

// Make sure we find a corresponding observer for this threshold
const getOrCreateObserver = (threshold: number | number[], rootMargin: string) => {
	const key = makeKey(threshold, rootMargin);
	if (!observers.has(key)) {
		observers.set(
			key,
			new IntersectionObserver(callback, {
				threshold,
				rootMargin
			})
		);
	}

	return observers.get(key);
};

export const inViewport = (node: HTMLElement | SVGElement, options: Partial<InViewportOptions>) => {
	const completeOptions: InViewportOptions = {
		threshold: options?.threshold || 0,
		once: options?.once || false,
		rootMargin: options?.rootMargin || DEFAULT_ROOT_MARGIN,
		callback: options?.callback || (() => null)
	};
	const observer = getOrCreateObserver(completeOptions.threshold, completeOptions.rootMargin);

	if (!observer) {
		throw new Error('Failed to create or get observer');
	}

	// Add node to observer
	observer.observe(node);
	increaseUsage(observer);

	// Save the node's options in weak map
	optionsMap.set(node, completeOptions);

	return {
		destroy() {
			destroy(observer, node, completeOptions);
		}
	};
};
