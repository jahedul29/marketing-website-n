export const removeTrailingSlash = (str: string) => {
	if (!str) {
		return str;
	}
	return str.replace(/\/+$/, '');
};
