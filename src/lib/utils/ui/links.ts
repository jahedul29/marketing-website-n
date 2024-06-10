import type { Button, ButtonAttributes } from '$lib/utils/types/Button';
import type { Entry } from '$lib/utils/types/Entry';
import { textToId } from '$lib/utils/string/textToId';
import { autoUrl, type AutoUrlCompatible } from '$lib/utils/url/autoUrl';

const getAnchor = (button: Maybe<Button>): Maybe<string> => {
	if (!button) {
		return null;
	}
	const { hash } = button;
	return hash ? `#${textToId(hash)}` : '';
};

const getCategory = (button: Maybe<Button>): Maybe<Entry> => {
	if (!button) {
		return null;
	}
	const { siteCategory } = button;
	return Array.isArray(siteCategory) ? siteCategory?.[0] || null : null;
};

const getEntry = (button: Maybe<Button>): Maybe<Entry> => {
	if (!button) {
		return null;
	}
	const { siteEntry } = button;
	return Array.isArray(siteEntry) ? siteEntry?.[0] || null : null;
};

const getAssetUrl = (button: Maybe<Button>): Maybe<string> => {
	if (!button) {
		return null;
	}
	const { asset } = button;
	return Array.isArray(asset) ? asset?.[0]?.url || null : null;
};

const getEntryPathName = (button: Maybe<Button>): Maybe<string> => {
	if (!button) {
		return null;
	}
	const entry: Maybe<Entry> = getCategory(button) || getEntry(button);
	if (!entry) {
		return '';
	}
	return autoUrl(entry as Entry & AutoUrlCompatible) || '';
};

export const getHref = (button: Maybe<Button>): ButtonAttributes['href'] => {
	if (!button) {
		return '';
	}
	const { externalUrl } = button;
	return getAssetUrl(button) || externalUrl || `${getEntryPathName(button)}${getAnchor(button)}`;
};

export const getRel = (button: Maybe<Button>): ButtonAttributes['rel'] => {
	if (!button) {
		return null;
	}
	const { externalUrl } = button;
	return externalUrl || getAssetUrl(button) ? 'external noopener noreferrer' : null;
};

export const getTarget = (button: Maybe<Button>): ButtonAttributes['target'] => {
	if (!button) {
		return null;
	}
	const { externalUrl } = button;
	return externalUrl || getAssetUrl(button) ? '_blank' : null;
};

export const getDownload = (button: Maybe<Button>): ButtonAttributes['download'] => {
	if (!button) {
		return null;
	}
	const isAsset = !!getAssetUrl(button);
	return isAsset && button.download ? '' : null;
};

export const getLinkAttributes = (button?: Maybe<Button>): ButtonAttributes => {
	if (!button) {
		return {
			href: '',
			rel: null,
			target: null,
			download: null
		};
	}
	return {
		href: getHref(button),
		rel: getRel(button),
		target: getTarget(button),
		download: getDownload(button)
	};
};
