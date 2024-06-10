/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

/**
 * Create a new cache and add build and woff2 files to it
 */
const addFilesToCache = async () => {
	const cache = await caches.open(CACHE);
	const installedFiles = [
		...build, // the app itself
		...files.filter((file) => file.endsWith('.woff2')) // fonts
	];
	return cache.addAll(installedFiles);
};

/**
 * Delete all caches that aren't the current one
 */
const deleteOldCaches = async () => {
	for (const key of await caches.keys()) {
		if (key !== CACHE) {
			await caches.delete(key);
		}
	}
};

/**
 * Check whether a request is cacheable
 */
const requestIsCacheable = (request: Request) => {
	const url = new URL(request.url);
	// ignore non-GET requests
	if (request.method !== 'GET') {
		return false;
	}
	// ignore requests to the service worker itself
	else if (url.pathname === '/service-worker.js') {
		return false;
	}
	return true;
};

/**
 * Check whether a request can be served from the cache first.
 * Only requests for files that are known to be immutable can be served from the cache.
 * Requests for assets coming from the cms can also be served from the cache.
 */
const requestCanUseCache = (request: Request) => {
	const url = new URL(request.url);
	// `build`/`files` can always be served from the cache
	if (ASSETS.includes(url.pathname)) {
		return true;
	}
	// Assets coming from the cms can be served from the cache
	else if (url.pathname.startsWith('/uploads/') && url.hostname.startsWith('cms.')) {
		return true;
	}
	return false;
};

/**
 * Respond to a fetch request, with either a cached response or a network response
 * @returns a response
 */
const respond = async (request: Request) => {
	const cache = await caches.open(CACHE);

	// if this is a request for a file that we can serve from the cache
	// then do so
	try {
		if (requestCanUseCache(request)) {
			const match = await cache.match(request);
			if (match) {
				return match;
			}
		}
	} catch (ex) {
		console.error(ex);
		// ignore cache errors
	}

	// for everything else, try the network first, but
	// fall back to the cache if we're offline
	try {
		const response = await fetch(request);

		if (response.status === 200) {
			cache.put(request, response.clone());
		}

		return response;
	} catch (ex) {
		console.error(ex);
		// ignore network errors
	}

	// the network request failed, let's try to get a previous response
	// from the cache
	try {
		const match = await cache.match(request);
		if (match) {
			return match;
		}
	} catch (ex) {
		console.error(ex);
		// ignore cache errors
	}

	// if we get here, something's wrong
	// either the cache is broken or the network is down
	// respond with an offline-friendly fallback
	return Response.error();
};

sw.addEventListener('install', (event) => {
	event.waitUntil(addFilesToCache());
});

sw.addEventListener('activate', (event) => {
	// Remove previous cached data from disk, if online
	if (!navigator.onLine) {
		return;
	}
	event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (!requestIsCacheable(event.request)) {
		return;
	}

	event.respondWith(respond(event.request));
});
