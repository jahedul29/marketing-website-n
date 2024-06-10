import { error } from '@sveltejs/kit';
import { GET_GLOBAL_SETS } from '$gql/queries/globals';
import { fetchCraft, type CraftData, type CraftResponse } from '$lib/server/craft';
import { expirable } from '$lib/utils/lang/expirable';

const TTL = 60;

const globalSets: Record<Language, () => Maybe<CraftResponse<CraftData>>> = {
	fr: expirable(null, 0),
	en: expirable(null, 0)
};

export const load = async ({ locals }) => {
	try {
		let globalSet = globalSets[locals.language]?.();

		if (!globalSet) {
			globalSet = await fetchCraft<GlobalSets>(GET_GLOBAL_SETS, {
				site: locals.language
			});
		}

		// Fetch craft global sets
		const { data, errors, status } = globalSet;

		// Anything other than a 200 is an expected error
		if (status !== 200) {
			console.error(`Error ${status} while fetching global sets`, errors);
			throw error(status || 400, {
				message: errors?.join('\n') || 'Unknown error'
			});
		}

		// Update global set cache now that we have a valid response
		globalSets[locals.language] = expirable(globalSet, TTL);

		return {
			...data
			// Add any other global data here
		};
	} catch (err) {
		// Unexpected error, return service unavailable
		console.error(err);
		throw error(err.status || 503, err.message || 'Server error');
	}
};
