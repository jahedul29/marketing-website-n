import { getTranslationKey } from '$lib/translations/getTranslationKey';

/**
 * Dynamically imports a translations object.
 *
 * @returns An object containing the propName prefixed with translations as key (`translations${propName}`)
 * and the translations as value.
 */
export const getTranslations = async <
	TPropName extends Translation.PropNames,
	TTranslationsObject extends Translation.All[TPropName]
>(
	propName: TPropName,
	lang: Language
) => {
	const module = await import(`./${propName}/${lang}.ts`);
	return {
		[getTranslationKey(propName)]: module[lang] as TTranslationsObject
	};
};
