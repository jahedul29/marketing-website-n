import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { REFERENCES_PER_PAGE } from '$lib/constants';
import { fetchCraft } from '$lib/server/craft';
import { GET_REFERENCES } from '$gql/queries/press';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const limit = REFERENCES_PER_PAGE;
		const offset = parseInt(url.searchParams.get('offset') || '0', 10);
		const { data } = await fetchCraft<{ entry: PressEntry }>(GET_REFERENCES, {
			limit,
			offset
		});
		const references = data?.entry?.references;
		const total = data?.entry?.referencesTotal;
		return json({ items: references || [], itemsTotal: total || 0 });
	} catch (error) {
		console.error(error);
		return json({ items: [], itemsTotal: 0 });
	}
};
