export type Obj = {
	[key: string]: string | number | boolean | Array<Obj> | Obj;
};

/**
 * Resolves an object with a string path to a value
 * @param obj - object to resolve
 * @param path - string path to resolve
 * @param separator - string separator (default = '.')
 * @returns value at string path
 */
export const resoleObjectStringPath = (obj: Obj, path: string, separator = '.') => {
	const parts = path.split(separator);
	const top = parts.shift();
	if (!top || !obj) {
		return obj;
	}
	const value = obj[top];
	if (typeof value === 'string' || !parts.length) {
		return value;
	}
	return resoleObjectStringPath(value as Obj, parts.join('.'));
};
