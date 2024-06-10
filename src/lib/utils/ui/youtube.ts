type YtThumbnailFormat = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault';

const IS_YOUTUBE_REGEX = /^https:\/\/(www.)?(youtube.com|youtu.be)/;

export const isYoutube = (url: Maybe<string>): boolean => {
	if (!url) {
		return false;
	}
	return IS_YOUTUBE_REGEX.test(url);
};

export const getYtId = (url: string) => {
	if (!url) {
		return '';
	}
	const urlObj = new URL(url);
	if (urlObj.host === 'youtu.be') {
		return urlObj.pathname.replace('/', '');
	}
	return urlObj.searchParams.get('v');
};

export const getYtThumbnailUrl = (url: string, format: YtThumbnailFormat = 'maxresdefault') => {
	const id = getYtId(url);
	return `https://i.ytimg.com/vi/${id}/${format}.jpg`;
};
