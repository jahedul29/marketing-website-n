import { getTranslations } from '$lib/translations/getTranslations';

export const load = async ({ locals }) => {
	const { locale, language, region } = locals;
	const globalTranslation = await getTranslations('global', language);
	return {
		...globalTranslation,
		locale,
		language,
		region
	};
};
