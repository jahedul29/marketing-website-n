export type Listeners = {
	[key: string]: (event: Event) => void;
};

export const setListeners = (node: HTMLElement, on?: Maybe<Listeners>) => {
	if (!on) {
		return;
	}
	Object.entries(on).forEach(([type, handler]) => {
		node.addEventListener(type, handler);
	});
	return {
		destroy() {
			if (!on) {
				return;
			}
			Object.entries(on).forEach(([type, handler]) => {
				node.removeEventListener(type, handler);
			});
		}
	};
};
