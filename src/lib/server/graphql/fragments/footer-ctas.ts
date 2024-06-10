import gql from '$gql/gql';

export const footerCtas = gql`
	fragment FooterCtas on footerCtas_footerCtas_BlockType {
		displayTitle
		subtitle
		ctas {
			__typename
			... on footerCtas_default_Entry {
				surtitle
				plainTitle
				button {
					...Button
				}
			}
			... on footerCtas_templateNotifications_Entry {
				surtitle
				plainTitle
				hubspotFormId
			}
		}
	}
`;
