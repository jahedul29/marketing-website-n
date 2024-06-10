/**
 * Create a debounced version of the callback.
 * The provided callback will be called time ms after the last invocation.
 */
export const debounce = <T extends (...args: unknown[]) => void>(callback: T, time: number) => {
	let timeout: Maybe<ReturnType<typeof setTimeout>>;
	const debounced = (...args: unknown[]) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			timeout = null;
			callback(...args);
		}, time);
	};
	return debounced as T;
};
export default debounce;
