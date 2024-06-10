import type { PageServerLoad } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { press } from '$gql/fragments/pages';
import { REFERENCES_PER_PAGE } from '$lib/constants';

export const load: PageServerLoad = async (event) => {
	const page = parseInt(event.url.searchParams.get('page') || '1', 10);
	const limit = REFERENCES_PER_PAGE * page;
	const query = pageQueryBuilder('entry')
		.withFragments({ press })
		.withParams({ limit: 'Int!' })
		.withArguments({ limit: '$limit' });
	const { entry } = await loadCraftPage<{ entry: PressEntry }>(event, query, {
		limit
	});
	return {
		entry,
		pageOptions: {
			disableFooterCtas: true
		}
	};
};
