/**@docs
 * Provides an action which traps user focus inside of the node.
 *
 * @exec TrapFocus.svelte
 *
 * ```svelte
 * <div use:trapFocus={{ visible: true }}>
 *   <button>Button 1</button>
 *   <button>Button 2</button>
 * </div>
 * ```
 */
import { focusableSelector } from '$lib/utils/ui/focusableSelector';

type FocusTrapParams = {
	visible: boolean;
	initialFocus?: Maybe<HTMLElement>;
	hasTransition?: boolean;
};

type FocusTrapReturn = { destroy?: () => void; update?: (params: FocusTrapParams) => void };

const getFocusables = (root: HTMLElement) => {
	return Array.from(root.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => {
		const styles = window.getComputedStyle(el);
		return styles.getPropertyValue('display') !== 'none';
	});
};

const isNext = (event: KeyboardEvent) => event.code === 'Tab' && !event.shiftKey;

const isPrevious = (event: KeyboardEvent) => event.code === 'Tab' && event.shiftKey;

const focusEl = (el: HTMLElement) => el?.focus();

let lastFocusedEl: Maybe<HTMLElement> = null;

/**
 * Traps user focus inside of the node.
 *
 * @param {boolean} params.visible If true, the focus is trapped.
 * @param {Maybe<HTMLElement>} params.initialFocus The first element to focus when the focus trap is activated. Defaults to the first focusable child of the node.
 * @param {boolean} params.hasTransition Wether the node has a transition when visibility changes. This will delay the initial focus until after the transition.
 */
export const trapFocus = (node: HTMLElement, params: FocusTrapParams): FocusTrapReturn => {
	const { initialFocus, hasTransition } = params;
	let firstFocusOverride = initialFocus;

	const init = () => {
		const focusables: HTMLElement[] = getFocusables(node);
		const first = focusables[0];
		const last = focusables[focusables.length - 1];

		lastFocusedEl = document.activeElement as HTMLElement;
		focusEl(firstFocusOverride || first);

		const onKeydown = (event: KeyboardEvent) => {
			const { target } = event;
			if (isNext(event) && target === last) {
				event.preventDefault();
				first.focus();
			} else if (isPrevious(event) && target === first) {
				event.preventDefault();
				last.focus();
			}
		};

		const onTransitionEnd = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target !== node) {
				return;
			}
			focusEl(firstFocusOverride || first);
		};

		node.addEventListener('keydown', onKeydown);

		if (hasTransition) {
			node.addEventListener('transitionend', onTransitionEnd);
		}

		return () => {
			node.removeEventListener('keydown', onKeydown);
			if (hasTransition) {
				node.removeEventListener('transitionend', onTransitionEnd);
			}
			if (!lastFocusedEl) {
				return;
			}
			focusEl(lastFocusedEl);
			lastFocusedEl = null;
		};
	};

	let destroy: Maybe<() => void> = null;

	const update = (params: FocusTrapParams) => {
		const { visible, initialFocus } = params;
		firstFocusOverride = initialFocus;
		if (!visible) {
			destroy?.();
			destroy = null;
			return;
		}
		destroy = init();
	};

	update(params);

	return {
		update,
		destroy: () => {
			destroy?.();
		}
	};
};
