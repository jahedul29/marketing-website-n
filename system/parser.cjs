// eslint-disable-next-line @typescript-eslint/no-var-requires
const inference = require('./inference.cjs');

/**
 * @param {string} content
 * @returns {string}
 */
const removeStyleAndScriptTags = (content) => {
	return content?.replace(/<(script|style)[^>]*?>[\s\S]*?<\/(script|style)>/gim, '') || '';
};

/**
 * @param {string} content
 * @returns {string}
 */
const removeHtmlComments = (content) => {
	return content?.replace(/<!--[\s\S]*?-->/gim, '') || '';
};

const propsRegExp = () =>
	/(\/\*\*[\s\S]+?\*\/\s+?)?export (let|const) ([a-z][0-9a-z_]*):? ?([a-z'`][0-9a-z'`_<>.\s$|&{}[\]]+)? ?=? ?([^;]*);/gi;
const reexportDefaultRegExp = /export \{ default as ([a-z][0-9a-z_]*) \} from '([^']+)';/gi;

/**
 * @param {string} content
 * @returns {string}
 */
const simplifyArrowFunction = (content) => {
	return content?.replace(/=>\s*\{[\s\S]+/gi, '=> { ... }') || '';
};

/**
 * @param {string} content
 */
const extractProps = (content) => {
	return Array.from(content.matchAll(propsRegExp())).map((match) => {
		const value = match[5]?.trim();
		const inferredType = inference.inferType(value);
		const type = match[4]?.trim() || inferredType;

		return {
			raw: match[0]?.trim(),
			jsdoc: match[1]
				?.trim()
				// We might have multiple jsdoc blocks, so we take the last one
				.split('/**')
				.pop()
				.replace(/^\/\*\*/g, '')
				.replace(/\*\/\s*$/g, '')
				.replace(/^\s*\* ?/gm, '')
				.trim(),
			keyword: match[2]?.trim(),
			name: match[3]?.trim(),
			type,
			value: inferredType === 'function' ? simplifyArrowFunction(value) : value,
			index: match.index
		};
	});
};

/**
 * @param {string} content
 */
const getPropsFromString = (content) => {
	if (!content) {
		return [];
	}

	// Remove html comments
	content = removeHtmlComments(content);

	// Extract props
	return extractProps(content);
};

const getImportsFromString = (content) => {
	if (!content) {
		return [];
	}

	const importsRegExp = /import ([\s\S]+?) from '([^']+)';/gi;
	const multiImportRegExp = /\s*\{\s*([^}]+)\s*\}\s*/gi;
	const typeRegExp = /^type\s+/gi;

	// TODO: support aliased imports
	return Array.from(content.matchAll(importsRegExp)).flatMap((match) => {
		if (!match[1].includes('{')) {
			// Single import
			return {
				raw: match[0]?.trim(),
				name: match[1]?.trim().replace(typeRegExp, ''),
				path: match[2]?.trim(),
				single: true,
				index: match.index
			};
		}
		// Multi-statement import
		return match[1]
			.replace(multiImportRegExp, '$1')
			.split(',')
			.map((importItem) => {
				return {
					raw: match[0]?.trim(),
					name: importItem.trim().replace(typeRegExp, ''),
					path: match[2]?.trim(),
					single: false,
					index: match.index
				};
			});
	});
};

/**
 * @param {string} content
 */
const getChildrenFromString = (content) => {
	if (!content) {
		return [];
	}

	const imports = getImportsFromString(content);

	// Remove style and script tags
	content = removeStyleAndScriptTags(content);
	// Remove html comments
	content = removeHtmlComments(content);

	const childrenRegExp = /<(\s*)([A-Z][A-z_]+)([^>]*)>/g;

	return Array.from(content.matchAll(childrenRegExp)).map((match) => {
		const name = match[2]?.trim();
		const importItem = imports.find((importItem) => importItem.name === name);
		return {
			raw: match[0]?.trim(),
			component: name,
			props: match[3]?.trim(),
			import: importItem,
			index: match.index
		};
	});
};

/**
 * @param {string[]} source
 * @returns {Token[]}
 */
const tokenizeDocumentation = (source) => {
	return source.reduce((tokens, line) => {
		const lastToken = tokens.at(-1);
		// Check for include token
		if (/^\s*@include /.test(line)) {
			tokens.push({
				type: 'include',
				path: line.replace(/^\s*@include /gm, '')
			});
			// Check for exec token
		} else if (/^\s*@exec/.test(line)) {
			const path = line.replace(/^\s*@exec\s*/gm, '').trim();
			const comp = path.endsWith('.svelte') ? path.replace(/\.svelte$/, '') : null;
			if (!path) {
				throw new Error(`Invalid @exec path: ${line}`);
			}
			tokens.push({
				type: 'exec',
				path,
				comp,
				code: comp ? `<${comp} />` : null,
				lines: []
			});
			// Append to last token, if supported
		} else if (lastToken?.lines) {
			lastToken.lines.push(line);
			// Check for closing exec block
			if (lastToken.type === 'exec' && /^\s*```/.test(line) && lastToken.lines.length > 2) {
				// Found closing exec block, insert a new empty text block
				tokens.push({
					type: 'text',
					lines: []
				});
			}
			// Create new text token
		} else {
			tokens.push({
				type: 'text',
				lines: [line]
			});
		}
		return tokens;
	}, []);
};

/**
 * @param {string} source
 * @returns {Token[]}
 */
const tokenizeDocumentationFromString = (source) => {
	return tokenizeDocumentation(source.split('\n'));
};

/**
 * @param {string} content
 */
const getDocumentationFromString = (content) => {
	content = content?.trim();
	if (!content) {
		return [];
	}

	const htmlDocumentationRegExp = /^\s*<!--@docs([\s\S]+?)-->/gm;
	const jsDocumentationRegExp = /^\s*\/\*\*@docs([\s\S]+?)\*\//gm;

	const htmlMatches = Array.from(content.matchAll(htmlDocumentationRegExp));
	const jsMatches = Array.from(content.matchAll(jsDocumentationRegExp));

	const createMatcher = (processSource) => (match) => {
		const raw = match[0]?.trim();
		const source = processSource(match[1]?.trim());

		return {
			raw,
			source,
			tokens: tokenizeDocumentationFromString(source),
			index: match.index
		};
	};

	const htmlDocs = htmlMatches.map(createMatcher((source) => source));
	const jsDocs = jsMatches.map(createMatcher((source) => source?.replaceAll(/^\s*\* ?/gm, '')));

	return [...htmlDocs, ...jsDocs];
};

/**
 * @param {string} content
 */
const getExportsFromString = (content) => {
	if (!content) {
		return [];
	}

	// Extract props
	return extractProps(content);
};

/**
 * @param {object} file
 */
const parseSvelteFile = async (file) => {
	const content = await file.body();
	return {
		props: getPropsFromString(content),
		imports: getImportsFromString(content),
		children: getChildrenFromString(content),
		documentation: getDocumentationFromString(content)
	};
};

/**
 * @param {object} file
 */
const parseTsFile = async (file) => {
	const content = await file.body();
	return {
		imports: getImportsFromString(content),
		exports: getExportsFromString(content),
		documentation: getDocumentationFromString(content)
	};
};

/**
 * @param {object} file
 */
const parseMdFile = async (file) => {
	const content = await file.body();
	return {
		documentation: [
			{
				raw: content,
				source: content,
				tokens: tokenizeDocumentationFromString(content),
				index: 0
			}
		]
	};
};

module.exports = {
	getPropsFromString,
	getImportsFromString,
	getChildrenFromString,
	getDocumentationFromString,
	tokenizeDocumentation,
	tokenizeDocumentationFromString,
	parseSvelteFile,
	parseTsFile,
	parseMdFile
};
