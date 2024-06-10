import gql from '$gql/gql';

const base = `
	id
	uri
	sectionHandle
	__typename
`;

export const cardSuppliers = gql`
	fragment CardSuppliers on suppliers_default_Entry {
		${base}
		image {
			...Image
		}
		activityArea {
			title
		}
		supplierName
		isCertified
		externalUrl
		city {
			title
		}
	}
`;

export const cardArticles = gql`
	fragment CardArticles on articles_default_Entry {
		${base}
		readTime
		thumbnail {
			...Image
		}
		displayTitle
		excerpt
	}
`;

export const cardResources = gql`
	fragment CardResources on resources_default_Entry {
		${base}
		readTime
		thumbnail {
			...Image
		}
		displayTitle
		resourceType {
			... on resourceTypes_Category {
				title
				icon {
					...Image
				}
			}
		}
	}
`;

export const cardCustomerStories = gql`
	fragment CardCustomerStories on customerStories_default_Entry {
		${base}
		thumbnail {
			...Image
		}
		logo {
			...Image
		}
		displayTitle
	}
`;
