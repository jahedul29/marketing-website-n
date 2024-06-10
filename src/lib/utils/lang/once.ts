/**
 * Creates a new version of the fn function that will be executed at most one time, no matter how.
 * @param fn The function to be called only once
 * @returns () => void
 */
export const once = <T extends () => void>(fn: T) => {
	let called = false;
	return () => {
		if (called) {
			return;
		}
		called = true;
		fn();
	};
};
