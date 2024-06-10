import { test, expect } from 'vitest';
import { getEntryUrl } from '$lib/utils/url/getEntryUrl';

const mockEntry = {
	language: 'en',
	uri: 'articles/my-article'
};

const globalsLocalized = {
	isLocalized: true,
	siteUrl: 'https://example.org'
};

const globalsNonLocalized = {
	isLocalized: false,
	siteUrl: 'https://example.com'
};

const mockUrlLocalized = `${globalsLocalized.siteUrl}/${mockEntry.language}/${mockEntry.uri}`;
const mockUrlNonLocalized = `${globalsNonLocalized.siteUrl}/${mockEntry.uri}`;

describe('`raw` property should return the url object', () => {
	test('localized', () => {
		const rawUrl = getEntryUrl(mockEntry, globalsLocalized).raw;
		expect(rawUrl).toMatchObject(new URL(mockUrlLocalized));
	});

	test('non-localized', () => {
		const rawUrl = getEntryUrl(mockEntry, globalsNonLocalized).raw;
		expect(rawUrl).toMatchObject(new URL(mockUrlNonLocalized));
	});
});

describe('`toAbsolute` should return the full url string', () => {
	test('localized', () => {
		const fullUrl = getEntryUrl(mockEntry, globalsLocalized).toAbsolute();
		expect(fullUrl).toBe(mockUrlLocalized);
	});
	test('non-localized', () => {
		const fullUrl = getEntryUrl(mockEntry, globalsNonLocalized).toAbsolute();
		expect(fullUrl).toBe(mockUrlNonLocalized);
	});
});

describe('`toString` should return the full url string', () => {
	test('localized', () => {
		const fullUrl = getEntryUrl(mockEntry, globalsLocalized).toString();
		expect(fullUrl).toBe(mockUrlLocalized);
	});
	test('non-localized', () => {
		const fullUrl = getEntryUrl(mockEntry, globalsNonLocalized).toString();
		expect(fullUrl).toBe(mockUrlNonLocalized);
	});
});

describe('`toLanguageRelative` should return the entry uri', () => {
	test('localized', () => {
		const languageRelativeUrl = getEntryUrl(mockEntry, globalsLocalized).toLanguageRelative();
		expect(languageRelativeUrl).toBe(`/${mockEntry.uri}`);
	});
	test('non-localized', () => {
		const languageRelativeUrl = getEntryUrl(
			mockEntry,
			globalsNonLocalized
		).toLanguageRelative();
		expect(languageRelativeUrl).toBe(`/${mockEntry.uri}`);
	});
});

describe('`toSchemeLess` should return the pathname, search params and hash', () => {
	test('localized', () => {
		const localMock = { ...mockEntry };
		expect(getEntryUrl(localMock, globalsLocalized).toSchemeLess()).toBe(
			'/en/articles/my-article'
		);
		localMock.uri = 'articles/my-article?test=yes';
		expect(getEntryUrl(localMock, globalsLocalized).toSchemeLess()).toBe(
			'/en/articles/my-article?test=yes'
		);
		localMock.uri = 'articles/my-article?test=yes#hash';
		expect(getEntryUrl(localMock, globalsLocalized).toSchemeLess()).toBe(
			'/en/articles/my-article?test=yes#hash'
		);
	});
	test('non-localized', () => {
		const localMock = { ...mockEntry };
		expect(getEntryUrl(localMock, globalsNonLocalized).toSchemeLess()).toBe(
			'/articles/my-article'
		);
		localMock.uri = 'articles/my-article?test=yes';
		expect(getEntryUrl(localMock, globalsNonLocalized).toSchemeLess()).toBe(
			'/articles/my-article?test=yes'
		);
		localMock.uri = 'articles/my-article?test=yes#hash';
		expect(getEntryUrl(localMock, globalsNonLocalized).toSchemeLess()).toBe(
			'/articles/my-article?test=yes#hash'
		);
	});
});
