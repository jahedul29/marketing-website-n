const IS_VIMEO_REGEX = /^https:\/\/(www.)?vimeo.com/;

type ThumbnailOptions = {
	width: string;
	height?: string;
};

export const isVimeo = (url: Maybe<string>): boolean => {
	if (!url) {
		return false;
	}
	return IS_VIMEO_REGEX.test(url);
};

export const getVimeoId = (url: string) => new URL(url).pathname.replace('/', '');

export const getVimeoThumbnailUrl = (
	url: string,
	options: ThumbnailOptions = { width: '1280' }
) => {
	const params = new URLSearchParams({ url });
	Object.entries(options).forEach(([key, value]) => {
		if (value) {
			params.set(key, value);
		}
	});
	return `/vimeo-thumbnail.jpg?${params.toString()}`;
};
