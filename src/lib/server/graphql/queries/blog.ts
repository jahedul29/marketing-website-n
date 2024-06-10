import gql from '$gql/gql';
import { cardArticles, cardResources } from '$gql/fragments/cards';
import { image } from '$gql/fragments/ui';

export const articleCategories = gql`
	categories(group: "articles") {
		... on articles_Category {
			title
			color
			image {
				...Image
			}
			uri
			color
		}
	}
`;

export const articlesCategoriesWithExclusion = gql`
	categories(group: "articles", slug: ["not", $slug]) {
		... on articles_Category {
			title
			color
			image {
				...Image
			}
			uri
			color
		}
  	}
`;

export const citiesCategories = gql`
	cities: categories(group: "cities") {
		title
		slug
	}
`;

export const rolesCategories = gql`
	roles: categories(group: "roles") {
		title
		slug
	}
`;

export const industriesCategories = gql`
	industries: categories(group: "industries") {
		title
		slug
	}
`;

export const resourceTypes = gql`
	types: categories(group: "resourceTypes") {
		title
		slug
	}
`;

export const customerStories = gql`
	stories: entries(section: "customerStories") {
		...CardCustomerStories
	}
`;

export const GET_FILTERED_ARTICLES = gql`
	query getArticles(
		$limit: Int!
		$offset: Int!
		$city: [String] = ["*"]
		$industry: [String] = ["*"]
		$role: [String] = ["*"]
		$category: [String] = ["*"]
		$excludedSlug: String = ""
	) {
		items: entries(
			section: "articles"
			limit: $limit
			offset: $offset
			relatedToCategories: [
				{ slug: $role }
				{ slug: $city }
				{ slug: $industry }
				{ slug: $category }
			]
			orderBy: "postDate desc"
			slug: ["not", $excludedSlug]
		) {
			...CardArticles
		}
		total: entryCount(
			section: "articles"
			relatedToCategories: [
				{ slug: $role }
				{ slug: $city }
				{ slug: $industry }
				{ slug: $category }
			]
			slug: ["not", $excludedSlug]
		)
	}

	${cardArticles}
	${image}
`;

export const GET_FILTERED_RESOURCES = gql`
	query getResources(
		$limit: Int!
		$offset: Int!
		$category: [QueryArgument]!
		$type: [String] = ["*"]
		$excludedSlug: String = ""
	) {
		items: entries(
			section: "resources"
			limit: $limit
			offset: $offset
			relatedToCategories: [{ slug: $type }]
			resourceCategory: $category
			orderBy: "postDate desc"
			slug: ["not", $excludedSlug]
		) {
			...CardResources
		}
		total: entryCount(
			section: "resources"
			relatedToCategories: [{ slug: $type }]
			resourceCategory: $category
			slug: ["not", $excludedSlug]
		)
	}

	${cardResources}
	${image}
`;

export const defaultCta = gql`
	defaultCta: globalSet(handle: "defaultCtas") {
		... on defaultCtas_GlobalSet {
			articleCta(limit: 1) {
				... on articleCta_cta_BlockType {
					image {
						...Image
					}
					displayTitle
					text
					button {
						...Button
					}
				}
			}
		}
	}
`;

export const relatedCustomerStories = gql`
	relatedStories: entries(section: "customerStories", limit: 4, slug: ["not", $excludedSlug]) {
		...CardCustomerStories
	}
`;
