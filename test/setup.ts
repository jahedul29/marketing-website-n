import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { Navigation, Page } from '@sveltejs/kit';
import { readable } from 'svelte/store';
import * as environment from '$app/environment';
import * as navigation from '$app/navigation';
import * as stores from '$app/stores';
import './mocks/window';

// Copied from https://github.com/davipon/svelte-component-test-recipes/blob/d58642856a625be53eb0700ada1c37348a39269b/setupTest.ts
// Mock SvelteKit runtime module $app/environment
vi.mock('$app/environment', (): typeof environment => ({
	browser: false,
	dev: true,
	building: false,
	version: 'any'
}));

// Mock SvelteKit runtime module $app/navigation
vi.mock('$app/navigation', (): typeof navigation => ({
	afterNavigate: vi.fn(),
	beforeNavigate: vi.fn(),
	disableScrollHandling: vi.fn(),
	goto: () => Promise.resolve(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	preloadData: () => Promise.resolve(),
	preloadCode: () => Promise.resolve()
}));

// Mock SvelteKit runtime module $app/stores
vi.mock('$app/stores', (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL('http://localhost'),
			params: {},
			route: {
				id: null
			},
			status: 200,
			error: null,
			data: {},
			form: undefined
		});
		const updated = {
			subscribe: readable(false).subscribe,
			check: async () => Promise.resolve(false)
		};

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: async () => Promise.resolve(false)
	};

	return {
		getStores,
		navigating,
		page,
		updated
	};
});

// Mock mounted store
vi.mock('$lib/stores/mounted', () => {
	return {
		mounted: {
			subscribe(fn: (mounted: boolean) => void) {
				fn(true);
				return vi.fn();
			}
		}
	};
});
// End copy

// Mock i18n module
vi.mock('$lib/i18n', async () => {
	return import(__dirname + '/mocks/lib/i18n.d.ts');
});

// Mock translation module
vi.mock('$lib/translations', async () => {
	return import(__dirname + '/mocks/lib/translations.ts');
});

vi.mock('$env/dynamic/public', () => {
	return {
		env: {}
	};
});
