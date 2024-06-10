/**@docs
 * This module provides functions for converting strings to and from base64.
 * It supports both Node.js (using Buffer), the browser and edge runtime (web APIs).
 */

const hasBuffer = typeof Buffer !== 'undefined';

/**
 * Converts a string into a base64 encoded string
 * @param str The string to encode
 * @returns The base64 encoded string
 */
export const toBase64 = (str: string): string => {
	return hasBuffer ? Buffer.from(str).toString('base64') : btoa(str);
};

/**
 * Converts a base64 encoded string into a string
 * @param str The base64 encoded string
 * @returns The decoded string
 */
export const fromBase64 = (str: string): string => {
	return hasBuffer ? Buffer.from(str, 'base64').toString('ascii') : atob(str);
};
