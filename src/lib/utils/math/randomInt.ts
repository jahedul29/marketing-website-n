/**
 * Get a random integer between two integers.
 * The given range includes both the min and the max.
 * Asking for (1, 6) will simulate a d6 and (0, array.length - 1) will return a correct index.
 */
export const randomInt = (min: number, max: number) => {
	min = ~~min;
	max = ~~max;
	return ~~(Math.random() * (max - min + 1) + min);
};
