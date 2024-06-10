import type { RequestHandler } from './$types';
import { BLOG_PAGINATION_ITEMS_PER_PAGE } from '$lib/constants';
import { getResources } from '$lib/server/getResources';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, request }) => {
	try {
		const referer = new URL(request.headers.get('referer') || '', url.origin);
		const pathParts = referer?.pathname.split('/') || [];
		const category = pathParts[pathParts.length - 1];
		const limit = BLOG_PAGINATION_ITEMS_PER_PAGE;
		const offset = url.searchParams.get('offset');
		const type = url.searchParams.get('type') || null;
		const data = await getResources({
			limit,
			offset: Number(offset) || 0,
			category,
			type
		});
		return json(data);
	} catch (error) {
		console.error(error);
		return json({ items: [], itemsTotal: 0 });
	}
};
