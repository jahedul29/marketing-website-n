import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { home } from '$gql/fragments/pages';

export const load = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ home });
	return loadCraftPage<{ entry: HomeEntry }>(event, query);
};
