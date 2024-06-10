export const isTouch = () => {
	return (
		typeof window !== 'undefined' &&
		(window.matchMedia('(pointer: coarse) and (hover: none)').matches ||
			'ontouchstart' in window)
	);
};
