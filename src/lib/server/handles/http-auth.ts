import { HTTP_AUTH } from '$env/static/private';
import { toBase64 } from '$lib/utils/string/base64';
import type { Handle } from '@sveltejs/kit';

export const httpAuth: Handle = async ({ event, resolve }) => {
	if (!HTTP_AUTH) {
		return resolve(event);
	}

	const base64 = toBase64(HTTP_AUTH);
	const authHeader = event.request.headers.get('Authorization');

	// No auth, request one
	if (!authHeader) {
		return new Response('Unauthorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic'
			}
		});
	}

	// Bad auth, request again
	if (authHeader !== `Basic ${base64}`) {
		return new Response('Forbidden', {
			status: 401
		});
	}

	// Authenticated
	return resolve(event);
};
