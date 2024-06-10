import type { Handle } from '@sveltejs/kit';
import { getDynamicRequestCacheHeaders, getNoCacheHeaders } from '$lib/utils/http/cacheHeaders';

const isCacheableMethod = (method: string) => {
	return ['GET', 'HEAD'].includes(method);
};

export const cacheApi: Handle = ({ event, resolve }) => {
	let cachingEnabled = true;
	event.locals.caching = {
		disable() {
			cachingEnabled = false;
		},
		isEnabled() {
			return cachingEnabled;
		}
	};
	return resolve(event);
};

export const cacheHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	if (!isCacheableMethod(event.request.method)) {
		return response;
	}

	const pageCacheControl = response.headers.get('cache-control');
	// We want to set a cache control value if none present and want
	// to _force_ our cache-control header on data requests (sveltekit always sets one)
	const shouldOverrideCacheControl = !pageCacheControl || event.isDataRequest;

	if (response.ok && shouldOverrideCacheControl) {
		const cacheHeaders = event.locals.caching?.isEnabled()
			? getDynamicRequestCacheHeaders()
			: getNoCacheHeaders();
		Object.entries(cacheHeaders).forEach(([key, value]) => {
			response.headers.set(key, value);
		});
	}
	return response;
};
