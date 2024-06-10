import type { PageServerLoad } from './$types';
import type { CustomerStories_Default_Entry } from 'src/craft';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { customerStoriesPortal } from '$gql/fragments/pages';
import { customerStories } from '$gql/queries/blog';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry')
		.withFragments({ customerStoriesPortal })
		.withQueries([customerStories]);
	return loadCraftPage<{
		entry: CustomerStoriesPortalEntry;
		stories: CustomerStories_Default_Entry[];
	}>(event, query);
};
