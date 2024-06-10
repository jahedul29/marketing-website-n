import gql from '$gql/gql';

export const GET_PRICING_PLANS = gql`
	pricingPlans: pricingPlansEntries {
		... on pricingPlans_default_Entry {
			id
			displayTitle
			description
			priceTitle
			priceDescription
			button {
				...Button
			}
			featured
			pricingFeatures {
				id
			}
		}
	}
`;

export const GET_PRICING_FEATURES = gql`
	pricingFeatures: pricingFeaturesEntries {
		... on pricingFeatures_default_Entry {
			id
			displayTitle
			description
			available
			pricingPlansCustomText {
				... on pricingPlansCustomText_customText_BlockType {
					pricingPlan {
						id
					}
					text
				}
			}
		}
	}
`;
