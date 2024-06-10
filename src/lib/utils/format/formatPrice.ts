import { dev } from '$app/environment';
import { isPreview } from '$lib/env-public';
import { currentLocale } from '$lib/utils/i18n/locale';

export const USER_LOCALE = Symbol('user');
type USER_LOCALE = typeof USER_LOCALE;

const DEFAULTS: Intl.NumberFormatOptions = {
	style: 'currency',
	currency: 'CAD',
	currencyDisplay: 'narrowSymbol',
	minimumFractionDigits: 2
} as const;

/**
 * A wrapper around Intl.NumberFormat that returns the formatted price string.
 * @param price The price to format.
 * @param options The options to pass to Intl.NumberFormatOptions.
 * @param locale The locale to use. Use the `USER_LOCALE` symbol to use the user's locale.
 */
export const formatPrice = (
	price: number,
	options: Partial<Intl.NumberFormatOptions> = {},
	locale: Maybe<Locale> | USER_LOCALE = null
) => {
	const effectiveLocale = locale === USER_LOCALE ? undefined : locale || currentLocale();
	try {
		const mergedOptions: Intl.NumberFormatOptions = { ...DEFAULTS, ...options };
		// Should this be DEFAULT_LOCALE instead of undefined?
		return new Intl.NumberFormat(effectiveLocale || undefined, mergedOptions).format(price);
	} catch (error) {
		// The narrowSymbol currencyDisplay option is not supported in Safari,
		// so return a default price format in that case
		return dev || isPreview() ? error.message : `$${price.toFixed(2)}`;
	}
};
