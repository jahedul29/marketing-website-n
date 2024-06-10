import gql from '$gql/gql';
import { button, image, seo } from '$gql/fragments/ui';
import { footerCtas } from '$gql/fragments/footer-ctas';

export const GET_GLOBAL_SETS = gql`
	query getGlobalSets($site: [String]!) {
		config: globalSet(handle: "configuration", site: $site) {
			... on configuration_GlobalSet {
				seo {
					...SEO
				}
				twitterHandle
				organization {
					... on organization_organization_BlockType {
						organizationName
						organizationLogo {
							...Image
						}
						organizationAddress
						organizationEmail
						organizationPhone
					}
				}
				socials {
					... on socials_platform_BlockType {
						platformName
						platformUrl
						platformLogo {
							...Image
						}
					}
				}
			}
		}
		banner: globalSet(handle: "banner", site: $site) {
			... on banner_GlobalSet {
				bannerText
				dateUpdated
			}
		}
		header: globalSet(handle: "header", site: $site) {
			... on header_GlobalSet {
				mainNav {
					__typename
					... on mainNav_link_BlockType {
						button {
							...Button
						}
					}
					... on mainNav_subMenu_BlockType {
						id
						label
						subMenuSections {
							typeHandle
							... on subMenuSection_default_Entry {
								displayTitle
								buttons {
									...Button
								}
								button {
									...Button
								}
							}
							... on subMenuSection_cta_Entry {
								displayTitle
								image {
									...Image
								}
								plainText
								button {
									...Button
								}
							}
							... on subMenuSection_releases_Entry {
								displayTitle
								releasesLinks {
									... on releasesLinks_link_BlockType {
										tag
										text
										button {
											...Button
										}
									}
								}
							}
							... on subMenuSection_iconLinks_Entry {
								displayTitle
								iconLinks {
									... on iconLinks_link_BlockType {
										icon {
											...Image
										}
										button {
											...Button
										}
										text
									}
								}
							}
							... on subMenuSection_imageLinks_Entry {
								displayTitle
								imageLinks {
									... on imageLinks_link_BlockType {
										image {
											...Image
										}
										button {
											...Button
										}
									}
								}
							}
							... on subMenuSection_cardLinks_Entry {
								displayTitle
								cardLinks {
									... on cardLinks_link_BlockType {
										image {
											...Image
										}
										button {
											...Button
										}
										text
									}
								}
							}
						}
					}
				}
				secondaryNav {
					...Button
				}
				mainCta {
					...Button
				}
				mainCtaMobile {
					...Button
				}
			}
		}
		footer: globalSet(handle: "footer", site: $site) {
			... on footer_GlobalSet {
				footerDrawersTitle
				footerDrawers {
					... on footerDrawers_drawer_BlockType {
						id
						label
						buttons {
							...Button
						}
					}
				}
				footerLinkGroups {
					... on footerLinkGroups_linkGroup_BlockType {
						label
						buttons {
							...Button
						}
					}
				}
				legalNav {
					...Button
				}
				footerCtas {
					...FooterCtas
				}
			}
		}
		newsletter: globalSet(handle: "newsletter", site: $site) {
			... on newsletter_GlobalSet {
				newsletterTitle
				newsletterText
			}
		}
		search: globalSet(handle: "search", site: $site) {
			... on search_GlobalSet {
				searchApiKey
			}
		}
		eventTypes: categories(group: "eventTypes") {
			title
			slug
		}
	}

	${image}
	${button}
	${seo}
	${footerCtas}
`;
