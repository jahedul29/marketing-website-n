import type { RequestHandler } from './$types';
import { BLOG_PAGINATION_ITEMS_PER_PAGE } from '$lib/constants';
import { getArticles } from '$lib/server/getArticles';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const limit = BLOG_PAGINATION_ITEMS_PER_PAGE;
		const offset = url.searchParams.get('offset');
		const city = url.searchParams.get('city') || null;
		const industry = url.searchParams.get('industry') || null;
		const role = url.searchParams.get('role') || null;
		const data = await getArticles({
			limit,
			offset: Number(offset) || 0,
			city,
			industry,
			role
		});
		return json(data);
	} catch (error) {
		console.error(error);
		return json({ items: [], itemsTotal: 0 });
	}
};
