import { dev } from '$app/environment';
import { isPreview, SITE_URL } from '$lib/env-public';
import { getStaticFileCacheHeaders } from '$lib/utils/http/cacheHeaders';
import { text } from '@sveltejs/kit';

const disallow = dev || isPreview();

const result = `User-agent: *
${disallow ? 'Disallow' : 'Allow'}: /
${disallow ? '' : `Sitemap: ${SITE_URL}/sitemap.xml`}
`;

export const GET = () => {
	return text(result, {
		headers: {
			...getStaticFileCacheHeaders()
		}
	});
};
