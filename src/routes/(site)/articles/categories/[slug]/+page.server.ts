import type { PageServerLoad } from './$types';
import type {
	Articles_Category,
	Cities_Category,
	Industries_Category,
	Roles_Category
} from 'src/craft';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { articlesCategory } from '$gql/fragments/pages';
import {
	articlesCategoriesWithExclusion,
	citiesCategories,
	industriesCategories,
	rolesCategories
} from '$gql/queries/blog';
import { getArticles } from '$lib/server/getArticles';
import { BLOG_PAGINATION_ITEMS_PER_PAGE } from '$lib/constants';

export const load: PageServerLoad = async (event) => {
	const { url, params } = event;
	const query = pageQueryBuilder('category')
		.withFragments({ articlesCategory })
		.withQueries([
			articlesCategoriesWithExclusion,
			citiesCategories,
			rolesCategories,
			industriesCategories
		])
		.withParams({ slug: 'String' });
	const data = await loadCraftPage<{
		entry: Articles_Category;
		categories: Articles_Category[];
		cities: Cities_Category[];
		roles: Roles_Category[];
		industries: Industries_Category[];
	}>(event, query, { slug: params.slug });

	const limit = BLOG_PAGINATION_ITEMS_PER_PAGE;
	const page = Number(url.searchParams.get('page')) || 1;
	const offset = Math.ceil((page - 1) * limit);
	const city = url.searchParams.get('city');
	const industry = url.searchParams.get('industry');
	const role = url.searchParams.get('role');
	const category = params.slug;
	const articlesData = await getArticles({
		limit,
		offset,
		city,
		industry,
		role,
		category
	});
	return {
		...data,
		...articlesData
	};
};
