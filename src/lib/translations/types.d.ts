declare global {
	namespace Translation {
		// Types we allow in translations
		type DataType = string | number | boolean | object | DataType[];
		// The "root" type for a specific translation
		type DataRoot = Record<string, DataType>;
		// The mutable version of a DataRoot, useful to induce type from a variable
		type Translation<T extends DataRoot> = DeepMutable<DeepTo<DataType, T>>;

		// The params for the translate function
		type TranslateParams = Record<string, string | number | boolean>;
		// The function to translate a specific translation
		type TranslateFunction<T> = <
			TReturnType extends DataType = string,
			TInferredOrString = TReturnType extends Translation.DataType ? TReturnType : string
		>(
			key: PropertyStringPath<T>,
			params?: TranslateParams
		) => TInferredOrString;

		type PropNames = keyof Translation.All;
	}
}

export {};
