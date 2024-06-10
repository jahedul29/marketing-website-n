import type { PageServerLoad } from './$types';
import type { RelatedEventTypes_GlobalSet, RelatedFeatures_GlobalSet } from 'src/craft';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { pagesDefault, pagesComparison } from '$gql/fragments/pages';
import { fetchCraft } from '$lib/server/craft';
import { GET_RELATED_EVENT_TYPES, GET_RELATED_FEATURES } from '$gql/queries/page-types';

type Page = PagesDefault | PagesComparison;

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ pagesDefault, pagesComparison });
	const pageData = await loadCraftPage<{ entry: Page }>(event, query);
	const entry = pageData?.entry;
	if (entry?.__typename === 'pages_default_Entry' && entry?.pageType === 'feature') {
		const { data } = await fetchCraft<{
			relatedFeatures: PagesDefault[];
			relatedFeaturesSection: RelatedFeatures_GlobalSet;
		}>(GET_RELATED_FEATURES, {
			excludedUri: event.params.uri
		});
		return {
			entry,
			...(data || {})
		};
	}
	if (entry?.__typename === 'pages_default_Entry' && entry?.pageType === 'eventType') {
		const { data } = await fetchCraft<{
			relatedEventTypes: PagesDefault[];
			relatedEventTypesSection: RelatedEventTypes_GlobalSet;
		}>(GET_RELATED_EVENT_TYPES, {
			excludedUri: event.params.uri
		});
		return {
			entry,
			...(data || {})
		};
	}
	return {
		entry
	};
};
