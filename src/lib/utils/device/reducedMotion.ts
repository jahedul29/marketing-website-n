export const reducedMotion = () => {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion)').matches;
};
