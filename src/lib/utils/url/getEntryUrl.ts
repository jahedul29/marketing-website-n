/**@docs
 * This modules provides a function to create a url for a given entry.
 */

import { IS_LOCALIZED } from '$lib/constants';
import { SITE_URL } from '$lib/env-public';
import { uriToPath } from '$lib/utils/url/uriToPath';

export type EntryUrlGlobals = {
	isLocalized: boolean;
	siteUrl: string;
};

export const ENTRY_URL_GLOBALS: EntryUrlGlobals = {
	isLocalized: IS_LOCALIZED,
	siteUrl: SITE_URL
} as const;

export interface EntryUrl {
	readonly raw: URL;
	toString: () => string;
	toAbsolute: () => string;
	toSchemeLess: () => string;
	toLanguageRelative: () => string;
}

/**
 * Creates a new EntryUrl object tied to the given entry. The urls will be formatted according to the globals.
 * The EntryUrl object offers an API to get different parts of a url generated from a Craft entry.
 * @param entry The Craft entry to create a url for
 * @param globals The globals to use for formatting the url
 * @returns EntryUrl object
 */
export const getEntryUrl = (
	entry: Maybe<Partial<NormalizedCraftPage>>,
	globals: Partial<EntryUrlGlobals> = ENTRY_URL_GLOBALS
): EntryUrl => {
	// TODO: This line is a code smell. We should be able to get rid of it by creating a proper
	// factory that receives the globals as a parameter and returns a `entryUrl` function.
	globals = { ...ENTRY_URL_GLOBALS, ...globals };
	const language = entry?.language && globals.isLocalized ? `/${entry.language}` : '';
	const uri = uriToPath(entry?.uri || '');
	const url = new URL(`${language}${uri}`, globals.siteUrl);

	return {
		raw: url,
		toString() {
			return url.toString();
		},
		toAbsolute() {
			return url.toString();
		},
		toSchemeLess() {
			const { pathname, hash, search } = url;
			return `${pathname}${search}${hash}`;
		},
		toLanguageRelative() {
			return uri;
		}
	};
};
