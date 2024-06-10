#!/usr/bin/env -S node --no-warnings

/* eslint no-console: 0 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// TODO: change to proper json import when supported...
const prettierConfig = JSON.parse(readFileSync('./.prettierrc'));

const SRC_PATH = path.join(__dirname, '../src');
const constantsPath = path.join(__dirname, '../src/lib/constants.ts');
const translationsPath = path.join(__dirname, '../src/lib/translations');

/**
 * @param {string} str
 */
const clearDashAndUpperCase = (str) => str.replace(/-/, '').toUpperCase();

/**
 * @param {string} str
 */
const toPascalCase = (str) => str.replace(/(^\w|-\w)/g, clearDashAndUpperCase);

/**
 * @param {string} lang
 * @returns {string}
 */
const PRIMARY_LANGUAGE_CONTENT = (lang) => {
	return `
		export const ${lang} = {} as const;
	`;
};

/**
 * @param {string} lang
 * @param {string} propName
 * @returns {string}
 */
const OTHER_LANGUAGE_CONTENT = (lang, propName) => {
	return `
		export const ${lang}: Translation.All['${propName}'] = {} as const;
	`;
};

/**
 * @param {string} propName
 * @returns {string}
 */
const FACTORY_CONTENT = (propName) => {
	return `
		import { tFactory } from '$lib/translations/factory';

		export const t = tFactory('${propName}');
	`;
};

const TYPES_CONTENT = (primaryLanguage, propName) => {
	const pascalPropName = toPascalCase(propName);
	return `
	import type { ${primaryLanguage} } from './${primaryLanguage}';

	declare global {
		namespace Translation {
			type ${pascalPropName} = Translation<typeof ${primaryLanguage}>;
			interface All {
				'${propName}': ${pascalPropName};
			}
		}
	}

	export {};
	`;
};

/**
 * @returns {string[]}
 */
const getLanguages = () => {
	try {
		const constants = readFileSync(constantsPath, { encoding: 'utf-8' });
		const match = constants.match(/SUPPORTED_LOCALES: Readonly<Locale\[\]> = (\[.*\])/i);
		const groups = match?.at(-1);
		const languages = JSON.parse(groups?.replace(/'/g, '"'));
		// extract lang from locale
		return languages.map((lang) => lang.toLowerCase().split('-')[0]);
	} catch (err) {
		console.log(`Error finding and parsing constant SUPPORTED_LOCALES in ${constantsPath}`);
		console.error(err);
		process.exit(1);
	}
};

/**
 * @param {string} filepath
 * @param {string} content
 */
const createFileIfNotExists = (filepath, content) => {
	if (existsSync(filepath)) {
		return;
	}
	const formatted = prettier.format(content, {
		...prettierConfig,
		filepath: filepath
	});
	writeFileSync(filepath, formatted);

	console.log(`Generated ${filepath.replace(SRC_PATH, '')}`);
};

/**
 *
 * @param {string} dirName
 */
const createTranslation = (directory) => {
	const directoryPath = path.join(translationsPath, directory);
	if (existsSync(directoryPath)) {
		console.log(`Translation directory ${directory} already exists.`);
		process.exit(10);
		return;
	}
	const languages = getLanguages();
	mkdirSync(directoryPath);
	languages.forEach((lang, i) => {
		const content =
			i === 0 ? PRIMARY_LANGUAGE_CONTENT(lang) : OTHER_LANGUAGE_CONTENT(lang, directory);
		const filepath = path.join(directoryPath, `${lang}.ts`);
		createFileIfNotExists(filepath, content);
	});
	createFileIfNotExists(path.join(directoryPath, 'index.ts'), FACTORY_CONTENT(directory));
	createFileIfNotExists(
		path.join(directoryPath, 'types.d.ts'),
		TYPES_CONTENT(languages[0], directory)
	);
};

const directory = process.argv[2];

if (!directory) {
	console.log('You must provide a translation directory name');
	process.exit(1);
}
createTranslation(directory);
