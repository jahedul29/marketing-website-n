/**@docs
 * A collection of functions to remove duplicates from arrays
 */

/**
 * Removes duplicates from an array of objects based on the value of a key
 * @param arr The array to remove the duplicates from
 * @param filterKey The filter key in case of array of objects
 * @returns the filtered array
 */
export const removeDuplicatesObjectsFromArray = <
	T extends Record<string | number | symbol, unknown>
>(
	arr: T[],
	filterKey: string
) => {
	return [...new Map(arr.map((a) => [a[filterKey], a])).values()];
};

/**
 * Removes duplicates from an array of values
 * @param arr
 * @returns a new array with the duplicates removed
 */
export const removeDuplicatesValuesFromArray = <T extends string | number | symbol | boolean>(
	arr: T[]
) => {
	return [...new Set(arr)];
};
