import { Keys } from '$lib/utils/ui/keys';

const activateTab = (tab: HTMLElement) => {
	tab.focus();
	tab.click();
};

export const tabNav = (node: HTMLElement) => {
	const orientation = node.getAttribute('aria-orientation');
	const PREV = orientation === 'vertical' ? Keys.ArrowUp : Keys.ArrowLeft;
	const NEXT = orientation === 'vertical' ? Keys.ArrowDown : Keys.ArrowRight;
	const allowedKeys = [PREV, NEXT, Keys.Home, Keys.End, Keys.PageUp, Keys.PageDown];

	const onKeydown = (e: KeyboardEvent) => {
		const key = e.key as Keys;

		if (!allowedKeys.includes(key)) {
			return;
		}

		const activeTab = node.querySelector('[aria-selected="true"]');
		const firstTab = node.children[0] as HTMLElement;
		const lastTab = node.children[node.children.length - 1] as HTMLElement;
		const nextSibling = activeTab?.nextElementSibling as HTMLElement;
		const nextTab = nextSibling ? nextSibling : firstTab;
		const prevSibling = activeTab?.previousElementSibling as HTMLElement;
		const prevTab = prevSibling ? prevSibling : lastTab;

		if (key === NEXT) {
			activateTab(nextTab);
			return;
		}
		if (key === PREV) {
			activateTab(prevTab);
			return;
		}
		if ([Keys.Home, Keys.PageUp].includes(key)) {
			activateTab(firstTab);
			return;
		}
		if ([Keys.End, Keys.PageDown].includes(key)) {
			activateTab(lastTab);
			return;
		}
	};

	node.addEventListener('keydown', onKeydown);
};
