import { DEFAULT_LANGUAGE, IS_LOCALIZED, SUPPORTED_LANGUAGES } from '$lib/constants';
import { parseAcceptLanguage } from './parseAcceptLanguage';

export const getLangFromRequest = (request: Request): Language => {
	// If site is not localized, return site language
	if (!IS_LOCALIZED) {
		return DEFAULT_LANGUAGE;
	}

	// Check request path first
	const url = new URL(request.url);
	const pathLang = url.pathname.split('/')[1] as Language;
	if (pathLang && SUPPORTED_LANGUAGES.includes(pathLang)) {
		return pathLang;
	}

	// Check user-agent accepted languages next
	const acceptLanguage = request.headers.get('accept-language');
	if (acceptLanguage) {
		const supportedLanguages = parseAcceptLanguage(acceptLanguage)
			?.filter(({ lang }) => SUPPORTED_LANGUAGES.includes(lang as Language))
			.map(({ lang }) => lang);
		// If there is a match, return it
		if (supportedLanguages?.length) {
			return supportedLanguages[0] as Language;
		}
	}

	// Fallback to default language
	return DEFAULT_LANGUAGE;
};
