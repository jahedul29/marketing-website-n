/**@docs
 * A collection of functions to shuffle arrays
 */

/**
 * Shuffles an array
 * @param arr The array to shuffle
 * @returns a new shuffled array
 */
export const shuffleArray = <T>(arr: T[]) => {
	const newArr = arr.slice();
	for (let i = newArr.length - 1; i > 0; i--) {
		const rand = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
	}
	return newArr;
};
