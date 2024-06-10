export const isExternalUrl = (url: string) => {
	return !url.startsWith('/') && !url.startsWith('#');
};
