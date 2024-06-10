export const copyRequest = (req: Request, newUrl: string, init?: RequestInit) => {
	// The Request object cannot be copied with the spread operator.
	const {
		cache,
		credentials,
		headers,
		integrity,
		method,
		mode,
		redirect,
		referrer,
		referrerPolicy,
		url,
		body
	} = req;
	// Sveltekit uses Undici, which has a bug (https://github.com/nodejs/undici/issues/1307)
	// where it throws if you pass a custom 'connection' header, so we need to remove it
	headers.delete('connection');
	return new Request(newUrl || url, {
		cache,
		credentials,
		headers,
		integrity,
		method,
		mode,
		redirect,
		referrer,
		referrerPolicy,
		body,
		...init
	});
};
