import { dev } from '$app/environment';
import { FORCE_HTTP_CACHE } from '$lib/env-private';
import { isPreview } from '$lib/env-public';

const CACHE_CONTROL_NO_CACHE = 'private, no-cache, max-age=0, must-revalidate';
const CACHING_ENABLED = FORCE_HTTP_CACHE || (!dev && !isPreview());

export const getNoCacheHeaders = () => {
	return {
		'cache-control': CACHE_CONTROL_NO_CACHE
	};
};

export const getStaticFileCacheHeaders = () => {
	return {
		'cache-control': !CACHING_ENABLED
			? CACHE_CONTROL_NO_CACHE
			: // public: we opt-in for cache everywhere
			  // maxage: keep in the browser 3 min
			  // s-maxage: keep in vercel edge cache for 1 day
			  // stale-while-revalidate: let vercel serve the cache for up to 2 days
			  'public, max-age=180, s-maxage=86400, stale-while-revalidate=172800'
	};
};

export const getDynamicRequestCacheHeaders = () => {
	return {
		'cache-control': !CACHING_ENABLED
			? CACHE_CONTROL_NO_CACHE
			: // public: we opt-in for cache everywhere
			  // maxage: keep in the browser 1 min
			  // s-maxage: keep in vercel edge cache for 10 min
			  // stale-while-revalidate: let vercel serve the cache for up to 30 days
			  //   Vercel will try to keep it _as long as possible_ for up to 31 days
			  //   https://vercel.com/docs/concepts/edge-network/caching#limits
			  // stale-if-error: let vercel serve the cache for 1 day if origin errors out
			  'public, max-age=60, s-maxage=600, stale-while-revalidate=2592000, stale-if-error=86400'
	};
};
