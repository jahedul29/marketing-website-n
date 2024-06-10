import type { Handle } from '@sveltejs/kit';

export const date: Handle = ({ event, resolve }) => {
	// Replace date
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%request.date%', new Date().toUTCString())
	});
};
