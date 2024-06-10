/**@docs
 * Generates a url to a Craft entry. The entry has to at least have the `language` and `uri`
 * properties in it. If a module entry is passed, it will generate a hash link with the module's
 * `id` field leading to the element with the same id. You can use this to generate anchor buttons
 * automatically.
 */

import { getEntryUrl, type EntryUrlGlobals } from '$lib/utils/url/getEntryUrl';

export interface AutoUrlCompatible {
	__typename?: string;
}

type AutoUrlEntry = Partial<NormalizedCraftPage> & AutoUrlCompatible;

/**
 * Generates a url to a Craft entry. The entry has to at least have the `language` and `uri`
 * @param entry The Craft entry to create a url for
 * @param globals The globals to pass down to getEntryUrl
 * @returns The scheme-less url to the entry
 */
export const autoUrl = (
	entry?: Maybe<AutoUrlEntry>,
	globals?: Partial<EntryUrlGlobals>
): Maybe<string> => {
	if (!entry) {
		return null;
	}

	const { id, __typename } = entry;
	if (__typename?.startsWith('module')) {
		return `#${id}`;
	}

	return getEntryUrl(entry, globals).toSchemeLess();
};
