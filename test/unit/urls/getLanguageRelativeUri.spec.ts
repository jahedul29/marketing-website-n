import { test, expect } from 'vitest';
import { getLanguageRelativeUri } from '$lib/utils/url/getLanguageRelativeUri';
import { HOME_URI } from '$lib/constants';

test('should return the uri if not home uri', () => {
	const testUri = 'articles/test-article';
	const uri = getLanguageRelativeUri('articles/test-article');
	expect(uri).toBe(testUri);
});

test('should return empty if home uri', () => {
	const uri = getLanguageRelativeUri(HOME_URI);
	expect(uri).toBe('');
});
