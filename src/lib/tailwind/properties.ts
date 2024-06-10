import properties from '$lib/tailwind/properties.json';

/**
 * Quick access to properties stored in properties.json
 * @param name The name of the property to match
 * @param value The value to match
 * @returns the corresponding tailwind classes
 */
export const property = (name: string, value: string): string => {
	return properties[`${name}=${value}`];
};
