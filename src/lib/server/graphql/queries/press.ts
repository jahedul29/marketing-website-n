import gql from '$gql/gql';
import { image } from '$gql/fragments/ui';

export const GET_REFERENCES = gql`
	query getReferences($limit: Int!, $offset: Int!) {
		entry(section: "press") {
			... on press_press_Entry {
				referencesTotal: _count(field: "references")
				references(limit: $limit, offset: $offset) {
					... on references_reference_BlockType {
						id
						logo {
							...Image
						}
						displayTitle
						externalUrl
						label
					}
				}
			}
		}
	}

	${image}
`;
