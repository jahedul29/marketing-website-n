import type { PageServerLoad } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { resources } from '$gql/fragments/pages';
import { defaultCta } from '$gql/queries/blog';
import { getResources } from '$lib/server/getResources';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ resources }).withQueries([defaultCta]);
	const data = await loadCraftPage<{ entry: ResourcesDefault; defaultCta: DefaultCtasGlobalSet }>(
		event,
		query
	);
	const category = data?.entry?.resourceCategory || 'planners';
	const { items } = await getResources({
		limit: 4,
		offset: 0,
		category,
		excludedSlug: data?.entry?.slug || ''
	});
	return {
		...data,
		relatedResources: items
	};
};
