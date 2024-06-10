import { fileToObject } from '$lib/utils/form/fileToObject';

export const formDataToObject = async <TFormValuesObject>(formData: FormData) => {
	const obj: TFormValuesObject = {} as TFormValuesObject;
	for (const key of formData.keys()) {
		const values = await Promise.all(
			formData.getAll(key).map(async (value) => {
				if (value instanceof File) {
					return fileToObject(value);
				}
				return value;
			})
		);
		obj[key] = values.length === 1 ? values[0] : values;
	}
	return obj;
};
