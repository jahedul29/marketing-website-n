import { getYtThumbnailUrl } from '$lib/utils/ui/youtube';

// NOTE: When Youtube can't find an image associated with
// the resolution queried, it returns a default img with
// a natural height of 90px.
export const ytThumbnailFallback = (node: HTMLImageElement | HTMLElement, url: Maybe<string>) => {
	if (!url) {
		return;
	}

	const element = (
		node.tagName === 'IMG' ? node : node.querySelector<HTMLImageElement>('img')
	) as Maybe<HTMLImageElement>;

	if (!element) {
		return;
	}

	const fallbackUrl = getYtThumbnailUrl(url, 'hqdefault');

	// If there is no fallback url, skip entirely
	if (!fallbackUrl) {
		return;
	}

	// Check if default fallback is already loaded on node mount.
	// Skip adding 'onload' event listener if true.
	if (element.naturalHeight > 0 && element.naturalHeight <= 90) {
		element.src = fallbackUrl;
		return;
	}

	// Add 'onload' listener if image hasn't loaded yet
	const onLoad = () => {
		if (element.naturalHeight <= 90) {
			element.src = fallbackUrl;
		}
	};

	element.addEventListener('load', onLoad, { once: true });
};

export default ytThumbnailFallback;
