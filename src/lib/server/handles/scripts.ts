import type { Handle } from '@sveltejs/kit';
import type { Scripts_GlobalSet, Scripts_Scripts_BlockType } from 'src/craft';
import { parseFragment, serialize } from 'parse5';
import { dev } from '$app/environment';
import { isPreview } from '$lib/env-public';
import { FORCE_SCRIPTS_HANDLE } from '$lib/env-private';
import gql from '$lib/server/graphql/gql';
import { fetchCraft } from '$lib/server/craft';
import { expirable } from '$lib/utils/lang/expirable';

const SCRIPTS_TTL = 7200; // 2 hours

const GET_SCRIPTS = gql`
	query getScripts($site: [String]!) {
		globalSet(handle: "scripts", site: $site) {
			... on scripts_GlobalSet {
				scripts {
					... on scripts_scripts_BlockType {
						head
						bodyStart
						bodyEnd
					}
				}
			}
		}
	}
`;

let loadedScripts: () => Maybe<Scripts_Scripts_BlockType> = expirable(null, 0);
const emptyScripts = {
	head: '',
	bodyStart: '',
	bodyEnd: ''
};

const sanitize = (dirty: string) => {
	// Assume valid until proven otherwise
	let isValid = true;
	// Parse the fragment
	const fragment = parseFragment(dirty, {
		scriptingEnabled: true,
		onParseError: (ex) => {
			// Reject anything invalid
			isValid = false;
			console.error('Error while parsing global script', dirty, ex);
		}
	});
	// If it's invalid, return an empty string
	if (!isValid) {
		return '';
	}
	// Otherwise, serialize it back to HTML
	return serialize(fragment, { scriptingEnabled: true });
};

const createTransform = (scripts: Partial<Scripts_Scripts_BlockType>) => {
	return ({ html }) =>
		html
			.replace('%scripts.head%', scripts.head)
			.replace('%scripts.body.start%', scripts.bodyStart)
			.replace('%scripts.body.end%', scripts.bodyEnd);
};

export const scripts: Handle = async ({ event, resolve }) => {
	// Bail out to empty scripts only if the scripts are not forced
	if (!FORCE_SCRIPTS_HANDLE && (dev || isPreview())) {
		return resolve(event, {
			transformPageChunk: createTransform(emptyScripts)
		});
	}

	let scripts = loadedScripts();

	if (!scripts) {
		const res = await fetchCraft<{ globalSet: Scripts_GlobalSet }>(GET_SCRIPTS, {
			site: event.locals.language
		});
		scripts = res?.data?.globalSet?.scripts?.[0] || null;
		if (scripts) {
			scripts.head = sanitize(scripts.head || '');
			scripts.bodyStart = sanitize(scripts.bodyStart || '');
			scripts.bodyEnd = sanitize(scripts.bodyEnd || '');
			loadedScripts = expirable(scripts, SCRIPTS_TTL);
		}
	}

	return resolve(event, {
		transformPageChunk: createTransform(scripts || emptyScripts)
	});
};
