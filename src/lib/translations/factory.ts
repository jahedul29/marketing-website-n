import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { translate } from '$lib/translations/translate';
import { getTranslationKey } from '$lib/translations/getTranslationKey';

export const tFactory = <
	TPropName extends Translation.PropNames,
	TTranslationsObject extends Translation.All[TPropName]
>(
	propName: TPropName
) => {
	let currentTranslations: TTranslationsObject;

	return <
		TReturnType extends Translation.DataType = string,
		TInferredOrString = TReturnType extends Translation.DataType ? TReturnType : string
	>(
		key: PropertyStringPath<TTranslationsObject>,
		data: Translation.TranslateParams = {}
	): TInferredOrString => {
		// Cache translations when in browser env, but always load them on the server
		if (!browser || !currentTranslations) {
			currentTranslations = get(page).data[
				getTranslationKey(propName)
			] as TTranslationsObject;
		}
		// Bail out if nothing is found
		if (!currentTranslations) {
			return key as TInferredOrString;
		}
		return translate<TTranslationsObject, TReturnType, TInferredOrString>(
			currentTranslations,
			key,
			data
		);
	};
};
