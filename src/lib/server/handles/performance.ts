import type { Handle } from '@sveltejs/kit';

let cold = true;

/**
 * Adds performance headers to the response
 */
export const performanceHeaders: Handle = async ({ event, resolve }) => {
	const start = Date.now();
	const response = await resolve(event);
	response.headers.set('x-cold', cold ? '1' : '0');
	response.headers.set('x-response-time', `${Date.now() - start}ms`);
	cold = false;
	return response;
};
