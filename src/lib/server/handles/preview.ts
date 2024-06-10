import { dev } from '$app/environment';
import { FORCE_PREVIEW_MODE } from '$lib/env-private';
import type { Handle } from '@sveltejs/kit';

const isPreviewMode = (url: URL) => {
	return url.searchParams.has('x-craft-preview') || url.searchParams.has('x-craft-live-preview');
};

export const preview: Handle = async ({ event, resolve }) => {
	if (FORCE_PREVIEW_MODE || dev || isPreviewMode(event.url)) {
		event.locals.previewMode = true;
		event.locals.caching?.disable();
	}

	return resolve(event);
};
