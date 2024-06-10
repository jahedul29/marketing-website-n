// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		interface Locals {
			locale: Locale;
			language: Language;
			region: Region;
			t: Translation.TranslateFunction<Translation.All['global']>;
			previewMode?: boolean;
			caching?: {
				disable(): void;
				isEnabled(): boolean;
			};
		}

		interface PageData extends GlobalSets {
			// From layout
			locale?: Locale;
			language?: Language;
			region?: Region;
			// From pages
			entry?: NormalizedCraftPage;
			items?: PaginationItems;
			itemsTotal?: number;
			pageOptions?: {
				disableFooterCtas?: boolean;
				greyBg?: boolean;
			};
		}

		interface Error {
			message?: string;
			stack?: string;
			status?: number;
			errors?: import('./lib/server/craft').CraftError[];
			formattedMessage?: string[];
		}

		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface Platform {}
	}
}

export {};
