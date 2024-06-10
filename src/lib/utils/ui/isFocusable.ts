import { focusableSelector } from '$lib/utils/ui/focusableSelector';

export const isFocusable = (element: HTMLElement) => {
	return !!element?.closest(focusableSelector);
};
