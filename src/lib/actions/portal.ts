export const portal = (node: HTMLElement, parentNode?: HTMLElement) => {
	const parent = parentNode ?? document.body;
	parent.appendChild(node);
	return {
		destroy: () => {
			if (parent.contains(node)) {
				parent.removeChild(node);
			}
		}
	};
};
