/**@docs
 * A property to class transform for tailwind css jit engine.
 *
 * The goal of this module is to expose a single function that can act as
 * a `purgecss` transform operator:
 * https://tailwindcss.com/docs/optimizing-for-production#transforming-content
 *
 * Tailwind uses purgecss under the hood to tokenize the content in order to
 * find which classes to generate. We can leverage it to convert the
 * `property="value"` syntax into tailwind classes, which are expressed as
 * `property-value`.
 *
 * Some property name match directly to tailwind prefixes, while other can
 * have a different implementation (like `rhythm` with is implemented using `pt-`).
 *
 * It also support responsive values, that are expressed using a pipe, where
 * `property="value|other"` would become `property-value bp:property-other`
 *
 * User defined replacers can be added in `src/lib/tailwind/properties.json`
 */

'use strict';

/**
 * The basic replacer, which converts property="value" into property-value.
 * @var String
 */
const BASE_REPLACER = '$1-$2';

/**
 * Our custom breakpoint prefix.
 * @var String
 */
const BP = 'bp:';

/**
 * The list of all supported properties and their respective replacer
 * @var Object
 */
const replacers = {
	color: 'text-$2',
	background: 'bg-$2',
	text: BASE_REPLACER,
	lineHeight: 'leading-$2',
	padding: 'p-$2',
	snap: BASE_REPLACER,
	snapFirst: 'snap-$2',
	snapLast: 'snap-$2',
	itemsWidth: 'w-$2',
	rhythm: 'pt-$2',
	justify: BASE_REPLACER,
	align: 'content-$2',
	cols: 'grid-$1-$2',
	gap: BASE_REPLACER,
	width: 'w-$2 min-w-$2',
	viewport: 'w-[$2vw]',
	height: 'h-$2 min-h-$2',
	elevation: 'h-[$2vh]',
	border: 'border-$2',
	borderColor: 'border-$2',
	borderStyle: 'border-$2',
	radius: 'rounded-$2',
	colsTemplate: 'grid-cols-[$2]',
	rowsTemplate: 'grid-rows-[$2]',
	ratio: (...args) => {
		const [_, __, ratio] = args;
		const width = ratio.split(':')[0];
		const height = ratio.split(':')[1];
		return `aspect-[${width}${height ? `/${height}` : ''}]`;
	},
	spaceBetween: 'mr-$2 pr-$2 translate-x-$2',
	spaceBefore: 'translate-x-$2',
	spaceAfter: 'pr-$2',
	hoverColor: 'hover:text-$2',
	iconWidth: 'w-$2',
	textAlign: 'text-$2',
	colSpan: 'col-span-$2',
	colStart: 'col-start-$2',
	colEnd: 'col-end-$2',
	rowSpan: 'row-span-$2',
	rowStart: 'row-start-$2',
	rowEnd: 'row-end-$2',
	// include externally defined replacers
	...require('../../src/lib/tailwind/properties.json')
};

const RESP_ATTR_REGEXP = /([a-zA-Z0-9]+)="([^\|"]+)\|([^"]+)"/g;

/**
 * Duplicate all properties that contain our special pipe syntax
 * for responsive values, so that `attribute="mobile|desktop"` becomes
 * `attribute="mobile" bp:attribute="desktop"`.
 * @param value string
 * @returns string
 */
const duplicateResponsiveAttributes = (content) => {
	return content.replace(RESP_ATTR_REGEXP, `$1="$2" ${BP}$1="$3"`);
};

const TS_ATTR_REGEXP = /(let|const) ([a-zA-Z0-9_]+)(?:: ([a-zA-Z0-9<>_\. \|]+))? = '?([^']*)'?;/g;

/**
 * Transform typescript variables declaration to attribute syntax, so that
 * `const padding: PxUnit = '12|24';` becomes `padding="12|24";`
 * @param content string
 * @returns string
 */
const resolveTypesScriptAttributesValues = (content) => {
	return content.replace(TS_ATTR_REGEXP, '$2="$4"');
};

const JS_OBJECT_ATTR_REGEXP = /([a-zA-Z0-9]+): '([^']*)'(,|\s|$)/g;

/**
 * Transform javascript object keys declaration to attribute syntax, so that
 * `padding: '12|24';` becomes `padding="12|24";`
 * @param content string
 * @returns string
 */
const resolveJavaScriptObjectAttributesValues = (content) => {
	return content.replace(JS_OBJECT_ATTR_REGEXP, ' $1="$2" $3');
};

const TAILWINDIFY_CALL_REGEXP = () =>
	/(tailwindify|tailwindifyWithMin|tailwindifyAspectRatio)\((?:'([A-z]+)', )?([A-z0-9\_]+)\)/g;

/**
 * Looks for calls to tailwindify()/tailwindifyWithMin()/tailwindifyAspectRatio()
 * and extracts the prop and prefix name.
 * @param {string} content
 * @return Record<string, string>
 */
const extractTailwindifiedProps = (content) => {
	const matches = content.matchAll(TAILWINDIFY_CALL_REGEXP());
	const props = {};
	for (const match of matches) {
		const fx = match[1];
		const prop = match[3];
		let prefix = match[2];

		if (!fx || !prop) {
			continue;
		}

		if (fx == 'tailwindifyAspectRatio') {
			// prefix is null for this function, set it
			prefix = 'ratio';
		}
		if (props[prop] && props[prop] != prefix) {
			throw new Error(
				`Prop ${prop} used with 2 different prefixes: ${prefix}, ${props[prop]}.`
			);
		}
		if (fx == 'tailwindifyWithMin') {
			props[prop] = [prefix, `min-${prefix}`];
		} else {
			props[prop] = prefix;
		}
	}
	return props;
};

/**
 * Merges props into the global replacer dictionary.
 * @param {Record<string, string>} props
 * @returns undefined
 */
const mergeUnknownPropsIntoReplacers = (props) => {
	if (!props) {
		return;
	}
	Object.entries(props).forEach(([key, prefix]) => {
		if (!replacers[key]) {
			if (prefix == 'ratio') {
				replacers[key] = replacers.ratio;
			} else if (Array.isArray(prefix)) {
				replacers[key] = prefix.map((p) => `${p}-$2`).join(' ');
			} else {
				replacers[key] = `${prefix}-$2`;
			}
		}
	});
};

/**
 * Check if the value params contains an equal sign (=)
 * @param value String
 * @returns boolean
 */
const containsEqualSign = (value) => value?.indexOf('=') > -1;

/**
 * Creates a new RegExp object to match the replacer.
 * If the replacer contains an = sign, we consider it to be a full property match.
 * If not, the match will ignore the property value.
 * @param replacer String
 * @returns String
 */
const createRegExp = (replacer) =>
	new RegExp(
		containsEqualSign(replacer)
			? ((replacer = replacer.split('=')), `${replacer[0]}="${replacer[1]}"`)
			: `(${replacer})="([^"]*)"`,
		'g'
	);

const convertToTailwindClasses = (content) => {
	return (
		Object.keys(replacers)
			// sort the keys to reduce the ones containing an =
			.sort((a, b) => (containsEqualSign(a) ? (containsEqualSign(b) ? 0 : -1) : 1))
			// replace all instances of each reducers
			.reduce((content, replacerKey) => {
				const replacerRegExp = createRegExp(replacerKey);
				return content.replace(replacerRegExp, (match, ...rest) => {
					const replacer = replacers[replacerKey];
					if (typeof replacer === 'function') {
						return match.replace(replacerRegExp, replacer);
					}
					// The function is weird and has many arguments, but we only need the last two.
					const offset = rest[rest.length - 2] - BP.length;
					const string = rest[rest.length - 1];
					// Check if we need to alter the replacer
					const replacerContainsSpace = replacer.indexOf(' ') > -1;
					const hasBpPrefix = string.indexOf(BP, offset) === offset;
					const patchedReplacer =
						replacerContainsSpace && hasBpPrefix
							? replacer.split(' ').join(` ${BP}`)
							: replacer;

					// Do the actual replacement
					return match.replace(replacerRegExp, patchedReplacer);
				});
			}, content)
	);
};

/**
 * Replaces properties with their tailwind compatible syntax.
 * @param content String - the content as authored in the files
 * @returns String - the resulting content
 */
module.exports = (content) => {
	// Extract prop names from tailwindify/tailwindifyWithMin/tailwindifyAspectRatio
	const props = extractTailwindifiedProps(content);
	// Merge with replacers
	mergeUnknownPropsIntoReplacers(props);
	// Convert TypeScript declarations into attributes
	content = resolveTypesScriptAttributesValues(content);
	// Convert JavaScript object keys into attributes
	content = resolveJavaScriptObjectAttributesValues(content);
	// Convert properties with responsive values into duplicates
	content = duplicateResponsiveAttributes(content);
	// Pass all converters on the resulting string
	content = convertToTailwindClasses(content);
	// console.log(content);
	return content;
};

// For tests
module.exports.duplicateResponsiveAttributes = duplicateResponsiveAttributes;
module.exports.resolveTypesScriptAttributesValues = resolveTypesScriptAttributesValues;
module.exports.resolveJavaScriptObjectAttributesValues = resolveJavaScriptObjectAttributesValues;
module.exports.extractTailwindifiedProps = extractTailwindifiedProps;
module.exports.convertToTailwindClasses = convertToTailwindClasses;
