import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const PLANNED_APP_BASE_URL = 'https://app.planned.com/marketplace/';

export const GET: RequestHandler = ({ url }) => {
	const type = url.searchParams.get('type') || 'venues';
	const city = url.searchParams.get('city') || '';
	throw redirect(303, `${PLANNED_APP_BASE_URL}/${type}?city=${city}`);
};
