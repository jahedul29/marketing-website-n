/**
 * This module defines valid tailwind prefixes and offers utility function
 * to create valid tailwind classnames.
 */

import type { AspectRatio, Ratio } from './units';

export type TailwindDimensions = 'w' | 'h';
export type TailwindMinDimensions = `min-${TailwindDimensions}`;
export type TailwindPadding = 'p' | 'pt' | 'pr' | 'pl' | 'px' | 'py';
export type TailwindMargin = 'm' | 'mt' | 'mr' | 'ml' | 'mx' | 'my';
export type TailwindBorder = 'border' | 'rounded' | 'border-color';
export type TailwindGap = 'gap';
export type TailwindAlign = 'content';
export type TailwindJustify = 'justify';
export type TailwindText = 'text' | 'hover:text';
export type TailwindLineHeight = 'leading';
export type TailwindBackground = 'bg';
export type TailwindGrid = 'grid-cols' | 'grid-rows';
export type TailwindSnap = 'snap';
export type TailwindAspectRatio = 'aspect';
export type TailwindTranslate = 'translate-x' | 'translate-y';
export type TailwindPrefixes =
	| TailwindDimensions
	| TailwindMinDimensions
	| TailwindPadding
	| TailwindMargin
	| TailwindBorder
	| TailwindGap
	| TailwindAlign
	| TailwindJustify
	| TailwindText
	| TailwindLineHeight
	| TailwindBackground
	| TailwindGrid
	| TailwindSnap
	| TailwindAspectRatio
	| TailwindTranslate;

/**
 * Properly renders attribute values into valid tailwind class(es).
 * It deals with values containing the pipe syntax to express responsive values,
 * so having a value of `'4|8'` would render `prefix-4 bp:prefix`.
 * @param prefix Exclude<TailwindPrefixes, TailwindAspectRatio>: The tailwind class prefix (w, h, pt, ...)
 * @param value The attribute value
 * @returns string
 */
export const tailwindify = (
	prefix: Exclude<TailwindPrefixes, TailwindAspectRatio>,
	value: string | number
): string => {
	const str = value.toString();
	if (str.indexOf('|') !== -1) {
		const parts = str.split('|');
		return `${prefix}-${parts[0]} bp:${prefix}-${parts[1]}`;
	}
	return `${prefix}-${value}`;
};

/**
 * Calls `tailwindify()` twice with `prefix` and `min-prefix`.
 * @param prefix TailwindDimensions: The tailwind class prefix (w or h)
 * @param value The attribute value
 * @returns string
 */
export const tailwindifyWithMin = (prefix: TailwindDimensions, value: string | number): string => {
	const classes = tailwindify(prefix, value);
	const minClasses = tailwindify(`min-${prefix}`, value);
	return `${classes} ${minClasses}`;
};

/**
 * Specialized version of `tailwindify()` function for `aspect-ratio`.
 * @param value AspectRatio: The aspect ratio to render
 * @returns string
 */
export const tailwindifyAspectRatio = (value: AspectRatio) => {
	const getAspectClass = (ratio: Ratio, prefix = '') => {
		const width = ratio.split(':')[0];
		const height = ratio.split(':')[1];
		const ratioClass = `aspect-[${width}${height ? `/${height}` : ''}]`;
		return `${prefix}${ratioClass}`;
	};
	if (value.indexOf('|') !== -1) {
		const parts = value.split('|') as Ratio[];
		const mbClass = getAspectClass(parts[0]);
		const dtClass = getAspectClass(parts[1], 'bp:');
		return `${mbClass} ${dtClass}`;
	}
	return getAspectClass(value as Ratio);
};

/**
 * Creates a tailwind custom vw value.
 * Isolating this from the prefix (w-, h-) makes sure we are not confusing
 * tailwind's jit that tries to create a .h-${name} class, which makes the build fail.
 * @param value the value to vwify
 * @returns
 */
export const vwify = (value: string): string => {
	return `[${value}vw]`;
};

/**
 * Creates a tailwind custom vh value.
 * Isolating this from the prefix (w-, h-) makes sure we are not confusing
 * tailwind's jit that tries to create a .h-${name} class, which makes the build fail.
 * @param value the value to vhify
 * @returns
 */
export const vhify = (value: string): string => {
	return `[${value}vh]`;
};
