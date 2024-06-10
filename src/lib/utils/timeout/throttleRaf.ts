/**
 * Create a throttled version of the callback.
 * The provided callback will be called inside requestAnimationFrame.
 */
export const throttleRaf = <T extends (...args: unknown[]) => void>(callback: T) => {
	let rafId: number;
	const throttled = (...args: unknown[]) => {
		cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
			callback(...args);
		});
	};
	return throttled as T;
};
