import { SUPPORTED_LANGUAGES } from '$lib/constants';

export const match = (param) => {
	return SUPPORTED_LANGUAGES.includes(param as Language);
};
