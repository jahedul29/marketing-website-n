export const validateSameOrigin = (reqUrl: string, urlToTest: string) => {
	try {
		const validUrl = new URL(reqUrl);
		const url = new URL(urlToTest, validUrl.origin);
		return url.origin === validUrl.origin;
	} catch (error) {
		console.error(error);
		return false;
	}
};
