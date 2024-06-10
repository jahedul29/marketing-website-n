import type { PageServerLoad } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { articles } from '$gql/fragments/pages';
import { defaultCta } from '$gql/queries/blog';
import { getArticles } from '$lib/server/getArticles';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ articles }).withQueries([defaultCta]);
	const data = await loadCraftPage<{ entry: ArticlesDefault; defaultCta: DefaultCtasGlobalSet }>(
		event,
		query
	);
	const category = data?.entry?.articleCategory?.[0]?.slug || null;
	const { items } = await getArticles({
		limit: 4,
		offset: 0,
		category,
		city: null,
		industry: null,
		role: null,
		excludedSlug: data?.entry?.slug
	});
	return {
		...data,
		relatedArticles: items
	};
};
