/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs';
import prettier from 'prettier';
import resolveConfig from 'tailwindcss/resolveConfig.js';
import config from '../../tailwind.config.mjs';

const OUTPUT_FILE = './src/tailwind.d.ts';

const DERIVED_PROPERTIES = {
	spacing: [
		'maxWidth',
		'minWidth',
		'maxHeight',
		'minHeight',
		'inset',
		'gap',
		'borderSpacing',
		'flexBasis',
		'height',
		'width',
		'margin',
		'padding',
		'scrollMargin',
		'scrollPadding',
		'space',
		'textIndent',
		'translate'
	],
	colors: [
		'fill',
		'stroke',
		'textColor',
		'textDecorationColor',
		'backgroundColor',
		'borderColor',
		'boxShadowColor',
		'caretColor',
		'accentColor',
		'divideColor',
		'gradientColorStops',
		'placeholderColor',
		'outlineColor',
		'ringColor',
		'ringOffsetColor'
	],
	opacity: [
		'placeholderOpacity',
		'textOpacity',
		'backdropOpacity',
		'backgroundOpacity',
		'borderOpacity',
		'divideOpacity',
		'ringOpacity'
	],
	brightness: ['backdropBrightness'],
	contrast: ['backdropContrast'],
	hueRotate: ['backdropHueRotate'],
	saturate: ['backdropSaturate'],
	invert: ['backdropInvert'],
	sepia: ['backdropSepia'],
	grayscale: ['backdropGrayscale'],
	blur: ['backdropBlur'],
	borderWidth: ['divideWidth']
};

const formatTypeName = (str) => `${str[0].toUpperCase()}${str.substring(1)}`;

const getConfig = () => {
	try {
		console.log('Resolving Tailwind config...');
		return resolveConfig(config);
	} catch (err) {
		console.error('Error while resolving Tailwind config');
		throw err;
	}
};

const getDerivedFromType = (key) => {
	return (
		Object.entries(DERIVED_PROPERTIES).find(([_, values]) => values.includes(key))?.[0] || ''
	);
};

const joinSubKeys = (topKey, obj) => {
	return Object.entries(obj).map(([key, value]) => {
		if (typeof value !== 'object') {
			return `${topKey}${key === 'DEFAULT' ? '' : `-${key}`}`;
		}
		return joinSubKeys(key, value).map((key) => `${topKey}-${key}`);
	});
};

const objectKeysToStrings = (obj) => {
	return Object.entries(obj)
		.map(([key, value]) => {
			if (typeof value !== 'object') {
				return key;
			}
			return joinSubKeys(key, value).flat();
		})
		.flat();
};

const typeFromThemeKeys = (keys) => keys.map((key) => `| '${key}'`).join('');

/**
 *
 * @param {import('tailwindcss').Config} config
 * @returns {string}
 */
const getOutput = (config) => {
	try {
		console.log('Generating Tailwind types output...');
		const types = Object.entries(config.theme)
			.map(([key, value]) => {
				const formattedKey = formatTypeName(key);
				let valueKeys = Object.keys(value);
				const derivedFromProperty = getDerivedFromType(key);
				if (derivedFromProperty) {
					const derivedFromTypeValues = Object.keys(config.theme[derivedFromProperty]);
					valueKeys = valueKeys.filter(
						(valueKey) => !derivedFromTypeValues.includes(valueKey)
					);
				}
				if (!valueKeys.length && !derivedFromProperty) {
					return '';
				}
				const type =
					key === 'colors'
						? typeFromThemeKeys(objectKeysToStrings(value))
						: typeFromThemeKeys(valueKeys);
				const derivedFromType = derivedFromProperty
					? `| ${formatTypeName(derivedFromProperty)}`
					: '';
				return `export type ${formattedKey} = Custom ${derivedFromType} ${type};`;
			})
			.join('');
		return `
			declare namespace TW {
				export type Custom = \`[\${string}]\`
				${types}
			}
		`;
	} catch (err) {
		console.error('Error while generating output');
		throw err;
	}
};

/**
 *
 * @param {string} output
 * @returns {string}
 */
const formatOutput = (output) => {
	try {
		console.log('Formatting Tailwind types output...');
		// TODO: refactor into a module, then user json imports
		const prettierConfig = JSON.parse(readFileSync('./.prettierrc'));
		return prettier.format(output, {
			...prettierConfig,
			filepath: OUTPUT_FILE
		});
	} catch (err) {
		console.error('Error while formatting output');
		throw err;
	}
};

const run = () => {
	try {
		const config = getConfig();
		const output = getOutput(config);
		const formattedOutput = formatOutput(output);
		writeFileSync(OUTPUT_FILE, formattedOutput);
		console.log('Tailwind types generated!');
	} catch (err) {
		console.error(err);
	}
};

run();
