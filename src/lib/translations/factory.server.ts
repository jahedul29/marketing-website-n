import { getTranslationKey } from '$lib/translations/getTranslationKey';
import { getTranslations } from '$lib/translations/getTranslations';
import { translate } from './translate';

export const tFactory = async <
	TPropName extends Translation.PropNames,
	TTranslationsObject extends Translation.All[TPropName]
>(
	propName: TPropName,
	lang: Language
) => {
	const result = await getTranslations(propName, lang);
	const translations = result[getTranslationKey(propName)] as TTranslationsObject;
	return <
		TReturnType extends Translation.DataType = string,
		TInferredOrString = TReturnType extends Translation.DataType ? TReturnType : string
	>(
		key: PropertyStringPath<TTranslationsObject>,
		data: Translation.TranslateParams = {}
	): TInferredOrString => {
		return translate<TTranslationsObject, TReturnType, TInferredOrString>(
			translations,
			key,
			data
		);
	};
};
