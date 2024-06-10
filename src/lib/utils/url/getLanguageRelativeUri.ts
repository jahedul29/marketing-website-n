import { HOME_URI } from '$lib/constants';

export const getLanguageRelativeUri = (uri: string) => uri?.replace(HOME_URI, '') || '';
