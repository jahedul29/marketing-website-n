import type { PageServerLoad } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { legalPages } from '$gql/fragments/pages';
export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ legalPages });
	return loadCraftPage<{ entry: LegalPageEntry }>(event, query);
};
