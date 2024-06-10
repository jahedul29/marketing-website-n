import type { RequestHandler } from '@sveltejs/kit';
import { fetchCraft } from '$lib/server/craft';
import { getEntryUrl } from '$lib/utils/url/getEntryUrl';
import { getStaticFileCacheHeaders } from '$lib/utils/http/cacheHeaders';
import gql from '$lib/server/graphql/gql';
import { IS_LOCALIZED } from '$lib/constants';

const FETCH_LIMIT = 1000;

const GET_SITEMAP_PAGES = gql`
	query getAllPages($site: [String]!, $offset: Int = 0, $limit: Int!) {
		entries(uri: "*", site: $site, limit: $limit, offset: $offset, status: "live") {
			uri
			language
			dateUpdated @formatDateTime(format: "Y-m-d")
			localized {
				uri
				language
			}
		}
		categories(uri: "*", site: $site, limit: $limit, offset: $offset, status: "enabled") {
			uri
			language
			dateUpdated @formatDateTime(format: "Y-m-d")
			localized {
				uri
				language
			}
		}
		entryCount(uri: "*", site: $site, status: "live")
		categoryCount(uri: "*", site: $site, status: "enabled")
	}
`;

const renderAlternate = (entry: CraftPage) => {
	if (!IS_LOCALIZED) {
		return '';
	}
	const url = getEntryUrl(entry).toAbsolute();
	return `<xhtml:link
		rel="alternate"
		hreflang="${entry.language}"
		href="${url}" />
`;
};

const renderUrl = (page: CraftPage) => {
	const url = getEntryUrl(page).toAbsolute();
	const lastmod = page.dateUpdated;

	const links = [page, ...page.localized]
		.map((entry) => {
			return renderAlternate(entry);
		})
		.join('');

	return `<url>
		<loc>${url}</loc>
		${links}
		<lastmod>${lastmod}</lastmod>
	</url>`;
};

const render = (pages: CraftPage[]) => {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
	${pages.map(renderUrl).join('')}
</urlset>`;
};

export const GET: RequestHandler = async ({ params, locals }) => {
	const limit = FETCH_LIMIT / 2;
	const locale = (params.locale as Locale) || locals.language;
	const { data } = await fetchCraft(GET_SITEMAP_PAGES, { site: locale, limit });
	const entries = (data?.entries as CraftPage[] | null) || [];
	const categories = (data?.categories as CraftPage[] | null) || [];
	const allPages = [...entries, ...categories];
	const entryCount = (data?.entryCount as number) || 0;
	const categoryCount = (data?.categoryCount as number) || 0;
	const totalCount = entryCount + categoryCount;

	if (totalCount > allPages.length) {
		const missingRequests = ~~(totalCount / limit);
		const extraPages = await Promise.allSettled(
			new Array(missingRequests).fill(null).map((_, index) => {
				return fetchCraft(GET_SITEMAP_PAGES, {
					site: locale,
					limit,
					offset: (index + 1) * limit
				});
			})
		);
		extraPages.forEach((response) => {
			if (response.status !== 'fulfilled') {
				return;
			}
			const { data } = response.value;
			const newEntries = (data?.entries as CraftPage[] | null) || [];
			const newCategories = (data?.categories as CraftPage[] | null) || [];
			allPages.push(...newEntries, ...newCategories);
		});
	}

	const result = render(allPages);

	return new Response(result, {
		headers: {
			'content-type': 'application/xml',
			...getStaticFileCacheHeaders()
		}
	});
};
