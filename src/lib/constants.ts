import type { TimeZone } from '$lib/utils/date/timezones';
import { localeToLanguage } from '$lib/utils/i18n/localeTo';

// Locales
export const SUPPORTED_LOCALES: Readonly<Locale[]> = ['en-ca'] as const;
export const SUPPORTED_LANGUAGES: Readonly<Language[]> = SUPPORTED_LOCALES.map(localeToLanguage);
export const DEFAULT_LOCALE: Locale = SUPPORTED_LOCALES[0];
export const DEFAULT_LANGUAGE: Language = SUPPORTED_LANGUAGES[0];
export const IS_LOCALIZED = SUPPORTED_LOCALES.length >= 2;

// Dates
export const TIMEZONE: TimeZone = 'America/Toronto' as const;
export const START_OF_DAY = 0; // midnight

// Requests
/**
 * The "special" URI for the home page.
 */
export const HOME_URI = '__home__';

// Add any global constant values here
export const BLOG_PAGINATION_ITEMS_PER_PAGE = 20;
export const REFERENCES_PER_PAGE = 9;
export const BANNER_DISMISS_COOKIE = 'planned-banner-dismissed';

// Export all
export default {
	SUPPORTED_LOCALES,
	SUPPORTED_LANGUAGES,
	DEFAULT_LOCALE,
	DEFAULT_LANGUAGE,
	IS_LOCALIZED,
	TIMEZONE,
	START_OF_DAY
};
