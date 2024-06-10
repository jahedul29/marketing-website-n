import type { RequestEvent } from '@sveltejs/kit';
import type { EntryInterface } from 'src/craft';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { baseEntry, baseCategory } from '$gql/fragments/base';
import { capitalize } from '$lib/utils/string/capitalize';
import { fetchCraft } from '$lib/server/craft';
import { HOME_URI, IS_LOCALIZED } from '$lib/constants';
import { moduleQueries } from './moduleQueries';

type QueryType = 'entry' | 'category';
type QueryParams = Record<string, string>;
type QueryArgs = Record<string, string>;
type QueryFragments = Record<string, string>;
type QueryExtraQueries = string[];

interface QueryBuilder {
	withParams(extraParams: QueryParams): QueryBuilder;
	withArguments(extraArgs: QueryArgs): QueryBuilder;
	withFragments(extraFragments: QueryFragments): QueryBuilder;
	withQueries(extraQueries: QueryExtraQueries): QueryBuilder;
	getType(): QueryType;
	toString(): string;
}

const BASE_PARAMS = {
	uri: '[String]!',
	site: '[String]!',
	status: '[String]!'
};

const BASE_ARGS = {
	uri: '$uri',
	site: '$site',
	status: '$status'
};

const getParams = (params: QueryParams) => {
	return Object.entries(params)
		.map(([param, type]) => {
			return `$${param}: ${type}`;
		})
		.join(', ');
};

const getArgs = (args: QueryArgs) => {
	return Object.entries(args)
		.map(([key, value]) => {
			return `${key}: ${value}`;
		})
		.join(', ');
};

const getFragmentsNames = (fragments?: QueryFragments) => {
	if (!fragments) {
		return '';
	}
	return Object.keys(fragments)
		.map((name) => {
			return `...${capitalize(name)}`;
		})
		.join('\n');
};

const getFragmentsDefinitions = (fragments?: QueryFragments) => {
	if (!fragments) {
		return '';
	}
	return Object.values(fragments).join('\n');
};

export const pageQueryBuilder = (type: QueryType): QueryBuilder => {
	let params = getParams(BASE_PARAMS);
	let args = getArgs(BASE_ARGS);
	let fields = `
		...BaseEntry
		...BaseCategory
	`;
	let queries = '';
	let fragments = `${baseEntry}\n${baseCategory}`;
	return {
		withParams(extraParams) {
			const allParams = {
				...BASE_PARAMS,
				...(extraParams || {})
			};
			params = getParams(allParams);
			return this;
		},
		withArguments(extraArgs) {
			const allArgs = {
				...BASE_ARGS,
				...(extraArgs || {})
			};
			args = getArgs(allArgs);
			return this;
		},
		withFragments(extraFragments) {
			fields = `${fields}\n${getFragmentsNames(extraFragments)}`;
			fragments = `${fragments}\n${getFragmentsDefinitions(extraFragments)}`;
			return this;
		},
		withQueries(extraQueries) {
			queries = extraQueries?.join('\n') || '';
			return this;
		},
		getType() {
			return type;
		},
		toString() {
			return `
			query get${capitalize(type)}(${params}) {
				entry: ${type}(${args}) {
					${fields}
				}
				${queries}
			}
			${fragments}
		`;
		}
	};
};

export const stripLanguageAndLeadingSlash = (language: Maybe<Language>, uri: string) => {
	// Remove leading language from uri
	if (language && IS_LOCALIZED) {
		uri = uri.replace(new RegExp(`/${language}`), '');
	}
	// Remove leading / from uri and return home if empty
	return uri.replace(/^\/+/, '') || HOME_URI;
};

const processModule = async (mod: EntryInterface, entry: NormalizedCraftPage) => {
	if (!mod?.typeHandle) {
		return mod;
	}
	const modQuery = moduleQueries[mod?.typeHandle];
	if (!modQuery) {
		return mod;
	}
	return modQuery(mod, entry);
};

const processModuleQueries = async (entry: NormalizedCraftPage) => {
	const processedEntry = (
		await Promise.all(
			Object.entries(entry).map(async ([key, value]) => {
				if (!value) {
					return [key, value];
				}
				const isArray = Array.isArray(value);
				const isModules = key.toLowerCase().includes('module') && isArray;
				if (isModules) {
					const processedValue = await Promise.all(
						value.map(async (mod) => {
							if (typeof mod !== 'object') {
								return mod;
							}
							return processModule(mod, entry);
						})
					);
					return [key, processedValue];
				}
				if (isArray) {
					const processedValue = await Promise.all(value.map(processModuleQueries));
					return [key, processedValue];
				}
				if (!isArray && typeof value === 'object') {
					const processedValue = await processModuleQueries(value);
					return [key, processedValue];
				}
				return [key, value];
			})
		)
	).reduce((obj, [key, value]) => {
		obj[key] = value;
		return obj;
	}, {});
	return processedEntry;
};

export const loadCraftPage = async <TData extends { entry: NormalizedCraftPage }>(
	event: RequestEvent,
	query: ReturnType<typeof pageQueryBuilder>,
	variables: Record<string, string | number | string[] | number[]> = {},
	headers: RequestInit['headers'] = {}
) => {
	const { locals, url } = event;
	const language = locals.language;
	const uri = stripLanguageAndLeadingSlash(language, url.pathname);
	const queryType = query.getType();
	const entryStatus = locals.previewMode ? ['live', 'pending', 'disabled', 'expired'] : ['live'];
	const categoryStatus = locals.previewMode ? ['enabled', 'disabled'] : ['enabled'];

	// If preview mode, pass down the preview tokens as headers to craft
	if (locals.previewMode) {
		headers = {
			...headers,
			'x-craft-token': url.searchParams.get('token') || '',
			'x-craft-preview': url.searchParams.get('x-craft-preview') || '',
			'x-craft-live-preview': url.searchParams.get('x-craft-live-preview') || ''
		};
	}

	// If it is a forced kv update request, pass the info to the kv worker as headers
	if (url.searchParams.has('x-force-kv-update')) {
		headers = {
			...headers,
			'x-force-kv-update': '1'
		};
		// Disable cache for this request
		event.locals.caching?.disable();
	}

	// Add some debug headers
	headers = {
		...headers,
		'x-request-url': url.toString(),
		'x-query-type': queryType
	};

	// Issue the query to craft
	const { data, errors, status } = await fetchCraft<TData>(
		query.toString(),
		{
			uri,
			site: [language],
			status: queryType === 'entry' ? entryStatus : categoryStatus,
			...variables
		},
		headers
	);
	// TODO: remove after integration with cms
	// sample data
	if (data?.entry?.uri === '__home__') {
		data.entry.modules[3] = {
			typeHandle: 'newStats',
			displayTitle: 'World-class service that generates savings'
		};
	}
	if (status !== 200 || !data) {
		const message = `Error ${status} while fetching route ${uri}`;
		console.error(message, errors);
		const formattedMessage = errors?.map((error) =>
			typeof error === 'string' ? error : error?.message
		);
		throw error(
			status || 400,
			dev ? { status, message, errors } : { status, message, formattedMessage }
		);
	}

	if (!data?.entry) {
		// No entry found, return 404
		throw error(404, 'Not found');
	}

	data.entry = await processModuleQueries(data.entry);

	return data;
};
