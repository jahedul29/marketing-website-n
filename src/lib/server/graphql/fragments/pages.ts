import gql from '$gql/gql';
import { moduleFragments, moduleFragmentsRef } from '$gql/fragments/modules';
import { button, image, media, seo } from '$gql/fragments/ui';
import { footerCtas } from '$gql/fragments/footer-ctas';
import { contentBlocksRef } from '$gql/fragments/content-blocks';

export const pagesDefault = gql`
	fragment PagesDefault on pages_default_Entry {
		__typename
		seo {
			...SEO
		}
		pageType
		simplified
		color
		surtitle
		displayTitle
		plainText
		buttons(limit: 2) {
			...Button
		}
		hubspotFormId
		embedCode
		embedVideoUrl
		label
		media {
			...Media
		}
		pageMask {
			url
		}
		image {
			...Image
		}
		bubbles {
			... on bubbles_bubble_BlockType {
				image {
					...Image
				}
				tagIcon {
					...Image
				}
				tag
				xPosition
				yPosition
			}
		}
		logosTitle
		homeLogos {
			...Image
		}
		fullHeightMedia
		headerModules {
			${moduleFragmentsRef}
		}
		modules {
			${moduleFragmentsRef}
		}
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${moduleFragments}
	${footerCtas}
`;

export const pagesComparison = gql`
	fragment PagesComparison on pages_comparison_Entry {
		__typename
		seo {
			...SEO
		}
		displayTitle
		simpleRichText
		buttons {
			...Button
		}
		logosTitle
		logos {
			...Image
		}
		comparedMedias {
			...Media
		}
		featuresListTitle
		richTextList {
			... on richTextList_text_BlockType {
				simpleRichText
			}
		}
		surtitle
		plainTitle
		comparedCompanies {
			... on companies_default_Entry {
				id
				displayTitle
				description
				featured
			}
		}
		companyFeatureGroups {
			... on companyFeatureGroups_featureGroup_BlockType {
				displayTitle
				features {
					... on companyFeatures_default_Entry {
						displayTitle
						description
						availableFor {
							... on availableFor_company_BlockType {
								company {
									id
								}
								text
								tooltip
								unknown
							}
						}
					}
				}
			}
		}
		modules {
			${moduleFragmentsRef}
		}
		footerCtas {
			...FooterCtas
		}
	}
`;

export const home = gql`
	fragment Home on home_home_Entry {
		seo {
			...SEO
		}
		displayTitle
		plainText
		buttons(limit: 2) {
			...Button
		}
		media {
			...Media
		}
		pageMask {
			url
		}
		embedVideoUrl
		label
		logosTitle
		homeLogos {
			...Image
			...Image
		}
		headerModules {
			${moduleFragmentsRef}
		}
		modules {
			${moduleFragmentsRef}
		}
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${moduleFragments}
	${footerCtas}
`;

export const articles = gql`
	fragment Articles on articles_default_Entry {
		slug
		seo {
			...SEO
		}
		articleCategory {
			slug
		}
		postDate
		readTime
		blogAuthor {
			... on people_authors_Entry {
				firstName
				lastName
				image {
					...Image
				}
			}
		}
		displayTitle
		media {
			...Media
		}
		embedUrl
		poster {
			...Image
		}
		thumbnail {
			...Image
		}
		articleCta {
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
		contentBlocks {
			${contentBlocksRef}
		}
	}

	${seo}
	${image}
	${media}
	${button}
`;

export const customerStories = gql`
	fragment CustomerStories on customerStories_default_Entry {
		slug
		seo {
			...SEO
		}
		readTime
		displayTitle
		media {
			...Media
		}
		embedUrl
		poster {
			...Image
		}
		thumbnail {
			...Image
		}
		logo {
			...Image
		}
		projectInfo {
			... on projectInfo_info_BlockType {
				infoTitle
				infoText
			}
		}
		contentBlocks {
			${contentBlocksRef}
		}
	}

	${seo}
	${button}
	${image}
	${media}
`;

export const resources = gql`
	fragment Resources on resources_default_Entry {
		slug
		seo {
			...SEO
		}
		postDate
		readTime
		resourceType {
			... on resourceTypes_Category {
				title
				icon {
					...Image
				}
			}
		}
		blogAuthor {
			... on people_authors_Entry {
				firstName
				lastName
				image {
					...Image
				}
			}
		}
		displayTitle
		media {
			...Media
		}
		embedUrl
		poster {
			...Image
		}
		thumbnail {
			...Image
		}
		articleCta {
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
		contentBlocks {
			${contentBlocksRef}
		}
	}

	${seo}
	${button}
	${image}
	${media}
`;

export const blog = gql`
	fragment Blog on blog_blog_Entry {
		seo {
			...SEO
		}
		color
		surtitle
		displayTitle
		plainText
		image {
			...Image
		}
		blogMask {
			url
		}
		featuredArticles {
			...CardArticles
		}
		modules {
			${moduleFragmentsRef}
		}
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${moduleFragments}
	${footerCtas}
`;

export const resourcePortals = gql`
	fragment ResourcePortals on resourcePortals_default_Entry {
		seo {
			...SEO
		}
		color
		surtitle
		displayTitle
		plainText
		image {
			...Image
		}
		blogMask {
			url
		}
		resourceCategory
		featuredResources {
			...CardResources
		}
		featuredResourceSeries {
			... on featuredResourceSeries_series_BlockType {
				displayTitle
				plainText
				resources {
					...CardResources
				}
			}
		}
		modules {
			${moduleFragmentsRef}
		}
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${moduleFragments}
	${footerCtas}
`;

export const customerStoriesPortal = gql`
	fragment CustomerStoriesPortal on customerStoriesPortal_customerStoriesPortal_Entry {
		seo {
			...SEO
		}
		color
		surtitle
		displayTitle
		plainText
		image {
			...Image
		}
		blogMask {
			url
		}
		featuredStories {
			... on customerStories_default_Entry {
				...CardCustomerStories
			}
		}
		modules {
			${moduleFragmentsRef}
		}
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${moduleFragments}
	${footerCtas}
`;

export const legalPages = gql`
	fragment LegalPages on legalPages_default_Entry {
		displayTitle
		richText
	}
`;

export const articlesCategory = gql`
	fragment ArticlesCategory on articles_Category {
		title
		color
		plainText
		image {
			...Image
		}
		blogMask {
			url
		}
	}

	${image}
`;

export const pricing = gql`
	fragment Pricing on pricing_pricing_Entry {
		seo {
			...SEO
		}
		surtitle
		displayTitle
		plainText
		pricingTableTitle
		modules {
			${moduleFragmentsRef}
		}
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${moduleFragments}
	${footerCtas}
`;

export const press = gql`
	fragment Press on press_press_Entry {
		seo {
			...SEO
		}
		surtitle
		displayTitle
		richText
		assetKits {
			... on assetKits_kit_BlockType {
				displayTitle
				image {
					...Image
				}
				assets {
					url
				}
			}
		}
		referencesTotal: _count(field: "references")
		references(limit: $limit) {
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

	${seo}
	${image}
`;

export const contact = gql`
	fragment Contact on contact_contact_Entry {
		seo {
			...SEO
		}
		surtitle
		displayTitle
		plainText
		privacyPolicyText
		offices {
			... on offices_office_BlockType {
				image {
					...Image
				}
				city
				address
				googleMapsUrl
				googleMapsLabel
			}
		}
		sideCtas {
			... on sideCtas_cta_BlockType {
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
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${footerCtas}
`;

export const contactSuppliers = gql`
	fragment ContactSuppliers on contactUsSuppliers_contactUsSuppliers_Entry {
		seo {
			...SEO
		}
		surtitle
		displayTitle
		plainText
		privacyPolicyText
		offices {
			... on offices_office_BlockType {
				image {
					...Image
				}
				city
				address
				googleMapsUrl
				googleMapsLabel
			}
		}
		sideCtas {
			... on sideCtas_cta_BlockType {
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
		footerCtas {
			...FooterCtas
		}
	}

	${seo}
	${image}
	${button}
	${footerCtas}
`;

export const careers = gql`
	fragment Careers on careers_careers_Entry {
		seo {
			...SEO
		}
		surtitle
		displayTitle
		modules {
			${moduleFragmentsRef}
		}
		benefitsTitle
		benefits {
			... on benefits_benefit_BlockType {
				icon {
					...Image
				}
				color
				text
			}
		}
		jobsTitle
		teamStoriesTitle
		teamStories {
			...CardArticles
			...CardResources
			...CardCustomerStories
		}
	}

	${seo}
	${button}
	${image}
	${moduleFragments}
`;
