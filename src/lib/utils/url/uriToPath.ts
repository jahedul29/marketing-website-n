import { getLanguageRelativeUri } from '$lib/utils/url/getLanguageRelativeUri';

export const uriToPath = (uri: string) => {
	const pageUri = getLanguageRelativeUri(uri);
	const path = pageUri ? `/${pageUri}` : '';
	return path;
};
