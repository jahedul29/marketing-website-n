import type { Handle } from '@sveltejs/kit';
import { getLangFromRequest } from '$lib/utils/http/getLangFromRequest';
import { tFactory } from '$lib/translations/factory.server';
import { DEFAULT_LOCALE, IS_LOCALIZED, SUPPORTED_LOCALES } from '$lib/constants';
import { localeToRegion } from '$lib/utils/i18n/localeTo';

/**
 * This handle sets the locale, language and region for the request.
 */
export const langLocals: Handle = async ({ resolve, event }) => {
	const { request } = event;
	const language = getLangFromRequest(request);
	const locale =
		SUPPORTED_LOCALES.find((locale) => locale.startsWith(`${language}-`)) || DEFAULT_LOCALE;
	event.locals.locale = locale;
	event.locals.language = language;
	event.locals.region = localeToRegion(locale);
	return resolve(event);
};

/**
 * This handle redirects the user to the correct language if the site is localized.
 * Depends on langLocals handle to be run first.
 * @see langLocals
 */
export const langRedirect: Handle = async ({ resolve, event }) => {
	const { url, locals } = event;
	// If site is localized and request is for root
	if (IS_LOCALIZED && url.pathname === '/') {
		// Redirect to user preferred language
		return new Response(null, {
			status: 303,
			headers: new Headers({
				location: `/${locals.language}`
			})
		});
	}
	return resolve(event);
};

/**
 * This handle creates and sets the translation function for the request.
 * Depends on langLocals handle to be run first.
 * @see langLocals
 */
export const translationApi: Handle = async ({ event, resolve }) => {
	event.locals.t = await tFactory('global', event.locals.language);
	// Resolve event
	return resolve(event);
};

/**
 * This handle sets the html lang attribute for the request.
 * Depends on langLocals handle to be run first.
 * @see langLocals
 */
export const langAttribute: Handle = ({ event, resolve }) => {
	// Get user language
	const language = event.locals.language;
	// Resolve event and output correct html lang attribute
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(/<html ([^>]*)lang="en"/, `<html $1lang="${language}"`)
	});
};
