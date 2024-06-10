import type { PageServerLoad } from './$types';
import type { ResourceTypes_Category } from 'src/craft';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { resourcePortals } from '$gql/fragments/pages';
import { BLOG_PAGINATION_ITEMS_PER_PAGE } from '$lib/constants';
import { getResources } from '$lib/server/getResources';
import { resourceTypes } from '$gql/queries/blog';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry')
		.withFragments({ resourcePortals })
		.withQueries([resourceTypes]);
	const { entry, types } = await loadCraftPage<{
		entry: ResourcePortalsEntry;
		types: ResourceTypes_Category[];
	}>(event, query);

	const { url } = event;
	const limit = BLOG_PAGINATION_ITEMS_PER_PAGE;
	const page = Number(url.searchParams.get('page')) || 1;
	const offset = Math.ceil((page - 1) * limit);
	const category = entry?.resourceCategory || 'planners';
	const type = url.searchParams.get('type');
	const { items, itemsTotal } = await getResources({ limit, offset, type, category });
	return {
		entry,
		types,
		items,
		itemsTotal
	};
};
