import gql from '$gql/gql';
import { image } from '$gql/fragments/ui';

export const GET_RELATED_FEATURES = gql`
	query getRelatedFeatures($excludedUri: String!) {
		relatedFeaturesSection: globalSet(handle: "relatedFeatures") {
			... on relatedFeatures_GlobalSet {
				displayTitle
				plainText
			}
		}
		relatedFeatures: pagesEntries(pageType: "feature", uri: ["not", $excludedUri]) {
			... on pages_default_Entry {
				uri
				featureFields {
					... on featureFields_featureFields_BlockType {
						icon {
							...Image
						}
						displayTitle
						text
					}
				}
			}
		}
	}

	${image}
`;

export const GET_RELATED_EVENT_TYPES = gql`
	query getRelatedEventTypes($excludedUri: String!) {
		relatedEventTypesSection: globalSet(handle: "relatedEventTypes") {
			... on relatedEventTypes_GlobalSet {
				displayTitle
			}
		}
		relatedEventTypes: pagesEntries(pageType: "eventType", uri: ["not", $excludedUri]) {
			... on pages_default_Entry {
				uri
				surtitle
				image {
					...Image
				}
			}
		}
	}

	${image}
`;
