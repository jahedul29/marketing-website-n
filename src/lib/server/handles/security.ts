import type { Handle } from '@sveltejs/kit';
import { CMS_URL } from '$lib/env-private';

/**
 * Create an empty response with the given status code.
 * We do not want to have html error pages on those routes to save bandwidth.
 * @param status
 * @returns an empty response with the given status code
 */
const empty = (status: number) => new Response(null, { status });

/**
 * Constructs an empty 400 response.
 * We do not want to have html error pages on those routes to save bandwidth.
 * @returns a 400 response
 */
const error400 = () => empty(400);

/**
 * Constructs an empty 404 response.
 * @returns a 404 response
 */
const error404 = () => empty(404);

/**
 * Checks if the request is allowed to be served by the serverless/edge function.
 */
export const preflightCheck: Handle = ({ event, resolve }) => {
	// Return empty responses to pathname that could be used to attack the server
	if (event.url.pathname.endsWith('.zip')) {
		return error400();
	} else if (event.url.pathname.endsWith('.rar')) {
		return error400();
	} else if (event.url.pathname.endsWith('.tar') || event.url.pathname.endsWith('.tar.gz')) {
		return error400();
	} else if (event.url.pathname.endsWith('.7z')) {
		return error400();
	} else if (event.url.pathname.endsWith('.sql')) {
		return error400();
	} else if (event.url.pathname.endsWith('.db')) {
		return error400();
	} else if (event.url.pathname.endsWith('.ini')) {
		return error400();
	} else if (event.url.pathname.endsWith('.log')) {
		return error400();
	} else if (event.url.pathname.endsWith('.php')) {
		return error400();
	} else if (event.url.pathname.endsWith('.html')) {
		return error400();
	} else if (event.url.pathname.endsWith('.htm')) {
		return error400();
	} else if (event.url.pathname.endsWith('.aspx')) {
		return error400();
	} else if (event.url.pathname.endsWith('.pdf')) {
		return error400();
	} else if (event.url.pathname.endsWith('.doc') || event.url.pathname.endsWith('.docx')) {
		return error400();
	} else if (event.url.pathname.endsWith('.xsl') || event.url.pathname.endsWith('.xslx')) {
		return error400();
	}

	// Return empty responses to pathnames that are under_app/immutable:
	// Those requests will never be served by the edge/serverless function, so we can save bandwidth and time
	// when they do hit the function.
	if (event.url.pathname.startsWith('/_app/immutable')) {
		return error404();
	}

	// Return empty responses for wp-content and wp-includes
	if (
		event.url.pathname.startsWith('/wp-content') ||
		event.url.pathname.startsWith('/wp-includes')
	) {
		return error404();
	}

	return resolve(event);
};

/**
 * Adds security headers to the response
 */
export const securityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('x-xss-protection', '1; mode=block');
	response.headers.set('x-frame-options', 'SAMEORIGIN');
	response.headers.set('content-security-policy', `frame-ancestors 'self' ${CMS_URL}`);
	response.headers.set('x-content-type-options', 'nosniff');
	response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
	return response;
};
