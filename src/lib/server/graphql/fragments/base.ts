import gql from '$gql/gql';

export const baseEntry = gql`
	fragment BaseEntry on EntryInterface {
		localized {
			uri
			language
		}
		title
		uri
		language
	}
`;

export const baseCategory = gql`
	fragment BaseCategory on CategoryInterface {
		localized {
			uri
			language
		}
		title
		uri
		language
	}
`;
