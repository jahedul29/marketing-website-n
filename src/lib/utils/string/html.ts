/**@docs
 * The html module provides a simple way to manipulate HTML strings.
 * It returns itself after each method call, so you can chain them.
 * You end the chain by calling the `toString` method.
 *
 * ```ts
 * const textWithOnlyBoldAndItalic = html(text).stripTags(text, ['strong', 'em']).toString();
 * ```
 *
 */

interface Html {
	stripTags(preservedTags?: string[]): Html;
	newLinesToBr(): Html;
	removeEmptyTags(): Html;
	toString(): string;
}

export const html = (html: string): Html => {
	return {
		stripTags(preservedTags) {
			html = stripHtmlTags(html, preservedTags);
			return this;
		},
		newLinesToBr() {
			html = newLinesToBr(html);
			return this;
		},
		removeEmptyTags() {
			const removeEmptyTags = createEmptyTagsRemover();
			html = removeEmptyTags(html);
			return this;
		},
		toString() {
			return html;
		}
	};
};

const createEmptyTagsRemover = () => {
	const MATCH_LIMIT = 2000;

	const allowedSelfClosingTags = new Set([
		'area',
		'base',
		'br',
		'col',
		'embed',
		'hr',
		'img',
		'input',
		'link',
		'meta',
		'param',
		'source',
		'track',
		'wbr'
	]);

	const allowedEmptyTags = new Set(['iframe', 'th', 'td']);

	const emptyTagRegex =
		/<(?<tag>[a-z0-9]+?)( [^>]+?|)>\s*?<\/(\k<tag>)>|<(?<selfclosingtag>[a-z0-9]+)([^>]+?\/)>/gim;

	const removeEmptyTags = (text: string, matches = 0): string => {
		if (!text) {
			return text;
		}
		if (matches >= MATCH_LIMIT) {
			return text;
		}
		let matchFound = false;
		const processedText = text.replace(emptyTagRegex, (...args) => {
			const { selfclosingtag, tag } = args[args.length - 1];
			if (allowedEmptyTags.has(tag)) {
				return args[0];
			}
			if (allowedSelfClosingTags.has(selfclosingtag)) {
				return args[0];
			}
			matchFound = true;
			return '';
		});
		if (!matchFound) {
			return text;
		}
		return removeEmptyTags(processedText, matches + 1);
	};

	return removeEmptyTags;
};

const stripHtmlTags = (text: string, preservedTags: string[] = []) => {
	if (!text) {
		return text;
	}
	return text.replace(/(<([^>]+)>)/gi, (match) => {
		const tagRegex = new RegExp(/([^\s^\\/^<^>]+)/gi);
		const regExpResult = tagRegex.exec(match);
		if (!regExpResult) {
			return '';
		}
		const tagName = regExpResult[0];
		if (preservedTags.includes(tagName)) {
			return match;
		}
		return '';
	});
};

const newLinesToBr = (text: Maybe<string>): string => {
	if (!text) {
		return '';
	}
	return text.replace(/(\r\n|\r|\n)/g, '<br />');
};
