import { test, expect } from 'vitest';
import { autoUrl } from '$lib/utils/url/autoUrl';

const globalsLocalized = {
	isLocalized: true,
	siteUrl: 'https://example.org'
};

const globalsNonLocalized = {
	isLocalized: false,
	siteUrl: 'https://example.com'
};

test('should return the correct url for a localized entry', () => {
	const testPageEntry = {
		language: 'fr',
		uri: 'articles/article-test'
	};
	const testHomeEntry = {
		language: 'en',
		uri: '__home__'
	};
	const pageUrl = autoUrl(testPageEntry, globalsLocalized);
	const homeUrl = autoUrl(testHomeEntry, globalsLocalized);

	expect(pageUrl).toBe('/fr/articles/article-test');
	expect(homeUrl).toBe('/en');
});

test('should return the correct url for a non localized entry', () => {
	const testPageEntry = {
		language: 'fr',
		uri: 'articles/article-test'
	};
	const testHomeEntry = {
		language: 'en',
		uri: '__home__'
	};
	const pageUrl = autoUrl(testPageEntry, globalsNonLocalized);
	const homeUrl = autoUrl(testHomeEntry, globalsNonLocalized);

	expect(pageUrl).toBe('/articles/article-test');
	expect(homeUrl).toBe('/');
});

test('should return the correct url for a module', () => {
	const testModule = {
		id: '1234',
		__typename: 'modules_text_Entry'
	};

	const url = autoUrl(testModule, globalsLocalized);
	expect(url).toBe('#1234');
});
