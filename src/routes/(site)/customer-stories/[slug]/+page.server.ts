import type { PageServerLoad } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { customerStories } from '$gql/fragments/pages';
import { cardCustomerStories } from '$gql/fragments/cards';
import { relatedCustomerStories } from '$gql/queries/blog';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry')
		.withFragments({ customerStories, cardCustomerStories })
		.withQueries([relatedCustomerStories])
		.withParams({ excludedSlug: 'String = ""' });
	return loadCraftPage<{
		entry: CustomerStoriesDefault;
		relatedStories: CustomerStoriesDefault[];
	}>(event, query, { excludedSlug: event.params.slug });
};
