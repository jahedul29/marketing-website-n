import { tFactory } from '$lib/translations/factory';

export const t = tFactory('global');

export const languageName = (language: Language) => {
	return t<Record<Language, string>>('languages')[language];
};
