import type { PageServerLoad } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { pricing } from '$gql/fragments/pages';
import { GET_PRICING_FEATURES, GET_PRICING_PLANS } from '$gql/queries/pricing';
import type { PricingFeatures_Default_Entry, PricingPlans_Default_Entry } from 'src/craft';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry')
		.withFragments({ pricing })
		.withQueries([GET_PRICING_PLANS, GET_PRICING_FEATURES]);
	return loadCraftPage<{
		entry: PricingEntry;
		pricingPlans: PricingPlans_Default_Entry[];
		pricingFeatures: PricingFeatures_Default_Entry[];
	}>(event, query);
};
