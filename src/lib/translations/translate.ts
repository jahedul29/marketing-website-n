import { dev, browser } from '$app/environment';
import { resoleObjectStringPath, type Obj } from '$lib/utils/objects/resolveObjectStringPath';

const resolveData = <
	TReturnType extends Translation.DataType = string,
	TInferredOrString = TReturnType extends Translation.DataType ? TReturnType : string
>(
	value: string,
	data: Translation.DataRoot
): TInferredOrString => {
	const isString = typeof value === 'string';
	const strVal = isString ? value : JSON.stringify(value);
	const resolvedValue = strVal.replace(/\{([A-Za-z0-9_$]+)\}/g, (match) => {
		const key = match.slice(1, -1);
		const value = data[key];
		return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
			? `${value}`
			: `{${key}}`;
	});
	return isString ? resolvedValue : JSON.parse(resolvedValue);
};

/**
 * Translates a specific key, from a specific translation object.
 * It also replaces dynamic values in the translation.
 *
 * The type parameters are used to infer the function's parameters types and return type.
 * `T` is the type of the translation object, `TReturnType` is the requested return type,
 * `TInferredOrString` is the actual return type of the function.
 * We need to coerce the return type to a string when typescript
 * can not infer the return type constraint (i.e. is resolve simply to `Translation.DataType`).
 * This type is only used for type inference. To do use it when calling the function itself.
 *
 * @param translations The translation data object
 * @param path The property path to the requested data
 * @param data The data to replace in the translation
 * @returns The translated value
 */
export const translate = <
	T extends Translation.All[Translation.PropNames],
	TReturnType extends Translation.DataType = string,
	TInferredOrString = TReturnType extends Translation.DataType ? TReturnType : string
>(
	translations: T,
	path: PropertyStringPath<T>,
	data: Translation.TranslateParams = {}
): TInferredOrString => {
	const stringPath = path as string;
	const value = resoleObjectStringPath(translations as unknown as Obj, stringPath);
	if (!value) {
		dev && browser && console.warn(`Translation missing for key: ${stringPath}`);
		return '' as TInferredOrString;
	}
	return resolveData<TReturnType, TInferredOrString>(value, data);
};
