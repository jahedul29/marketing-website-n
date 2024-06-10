/**
 * Create a throttled version of the callback.
 * The provided callback will be called at most once until the timers expires.
 */
export const throttle = <T extends (...args: unknown[]) => void>(callback: T, time: number) => {
	let timeout: Maybe<ReturnType<typeof setTimeout>>;
	const throttled = (...args: unknown[]) => {
		if (timeout) {
			return;
		}
		timeout = setTimeout(() => {
			timeout = null;
		}, time);
		callback(...args);
	};
	return throttled as T;
};
export default throttle;
