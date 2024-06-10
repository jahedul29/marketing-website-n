#!/usr/bin/env -S node --no-warnings

/* eslint no-console: 0 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';
import ROUTES_CONFIG from '../routes.config.json' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// TODO: change to proper json import when supported...
const prettierConfig = JSON.parse(readFileSync('./.prettierrc'));

const MATCHERS_PATH = path.join(__dirname, '../src/params');
const ROOT_ROUTES_PATH = path.join(__dirname, `../src/routes/(site)/${ROUTES_CONFIG.root}`);
const SRC_PATH = path.join(__dirname, '../src');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const unCapitalize = (str) => str.charAt(0).toLowerCase() + str.slice(1);

const createFileIfNotExists = (path, content) => {
	if (existsSync(path)) {
		return;
	}
	const formatted = prettier.format(content, {
		...prettierConfig,
		filepath: path
	});
	writeFileSync(path, formatted);

	console.log(`Generated ${path.replace(SRC_PATH, '')}`);
};

const normalizeParam = (param) => {
	return param.replace('{{', '[').replace('}}', ']').replace('{', '[').replace('}', ']');
};

const toParamMatcherName = (param) => param.replace(/-/g, '_');

const generateMatcher = (routeName, paramsArr) => {
	const params = paramsArr.map((param) => `'${param}'`);
	const content = `
	export const match = (param) => {
		return [${params}].includes(param);
	};
		`;
	createFileIfNotExists(path.join(MATCHERS_PATH, `${toParamMatcherName(routeName)}.ts`), content);
};

const parseTypename = (typeName) => {
	const typeNames = Array.isArray(typeName) ? typeName : [typeName];
	return typeNames.reduce(
		(result, typeName) => {
			const typeNameParts = typeName.split('_');
			const type = typeNameParts[typeNameParts.length - 1].toLowerCase();
			const uncapitalizedSection = unCapitalize(typeNameParts[0]);
			const entryType = capitalize(typeNameParts[1]);
			const sectionSuffix =
				type === 'category'
					? 'Category'
					: entryType.toLowerCase() !== uncapitalizedSection.toLowerCase()
					? entryType
					: '';
			const section = `${uncapitalizedSection}${sectionSuffix}`;
			const capitalizedTypeName = typeNameParts.map(capitalize).join('_');
			result.type = type;
			result.sections = [...result.sections, section];
			result.typeNames = [...result.typeNames, capitalizedTypeName];
			return result;
		},
		{
			type: '',
			sections: [],
			typeNames: []
		}
	);
};

const generateRouteFiles = (routePath, route) => {
	const { dynamicImports, typeName } = route;
	const { type, sections, typeNames } = parseTypename(typeName);
	const serverLoadPath = path.join(routePath, `+page.server.ts`);
	const serverLoadContent = `
	import type { ${typeNames.join(', ')} } from 'src/craft';
	import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
	import { ${sections.join(', ')} } from '$gql/fragments/pages';
	
	export const load = async (event) => {
		const query = pageQueryBuilder('${type}').withFragments({ ${sections.join(', ')} });
		return loadCraftPage<{ entry: ${typeNames.join(' | ')} }>(event, query);
	};
		`;
	createFileIfNotExists(serverLoadPath, serverLoadContent);
	const sveltePagePath = path.join(routePath, `+page.svelte`);
	const sveltePageContent = `
		<script lang="ts">
			export let data;

			const { entry } = data || {};
		</script>

		<pre class="max-w-full overflow-x-auto">{JSON.stringify(entry, null, 4)}</pre>
		`;
	createFileIfNotExists(sveltePagePath, sveltePageContent);
	const loadPath = path.join(routePath, `+page.ts`);
	const loadContent = `
		import { runDynamicImports } from '$lib/dynamic-imports/runDynamicImports';

		export const load = async ({ data }) => {
			return runDynamicImports(data);
		};
		`;
	if (dynamicImports) {
		createFileIfNotExists(loadPath, loadContent);
	} else if (existsSync(loadPath)) {
		unlinkSync(loadPath);
	}
};

const processRoute = (route) => {
	const { uri, layoutGroup } = route;
	if (!existsSync(ROOT_ROUTES_PATH)) {
		mkdirSync(ROOT_ROUTES_PATH);
	}
	let routePath = ROOT_ROUTES_PATH;
	const params = route.uri[0].split('/');
	params.forEach((param, i) => {
		const layoutGroupPath = layoutGroup
			? path.join(ROOT_ROUTES_PATH, `(${layoutGroup})`)
			: null;
		if (layoutGroupPath && !existsSync(layoutGroupPath)) {
			mkdirSync(layoutGroupPath);
			console.log(`Created layout folder ${layoutGroupPath.replace(ROOT_ROUTES_PATH, '')}`);
		}
		const needsMatcher = uri[1]?.split('/')[i] !== param;
		const normalizedParam = normalizeParam(param);
		const routeName = needsMatcher
			? `[uri=${toParamMatcherName(normalizedParam)}]`
			: normalizedParam;
		if (needsMatcher) {
			const paramsArr = uri.map((uri) => uri.split('/')[i]);
			generateMatcher(normalizedParam, paramsArr);
		}
		const layoutFolder = layoutGroup ? `(${layoutGroup})/` : null;
		const routeFolderPath = path.join(
			routePath,
			`${layoutFolder && !routePath.includes(layoutFolder) ? layoutFolder : ''}${routeName}`
		);
		if (!existsSync(routeFolderPath)) {
			mkdirSync(routeFolderPath, { recursive: true });
			console.log(`Created route folder ${routeFolderPath.replace(ROOT_ROUTES_PATH, '')}`);
		}
		if (i === params.length - 1) {
			generateRouteFiles(routeFolderPath, route);
		}
		routePath = routeFolderPath;
	});
};

console.log('Generating routes...');
ROUTES_CONFIG.routes.forEach(processRoute);
console.log('Routes generated!');
