export const image = `
	fragment Image on assets_Asset {
		url @transform(immediately: true, quality: 80)
		width
		height
		alt
		srcset(sizes: ["100", "200", "300", "400", "600", "800", "1000", "1200", "1600", "2000"])
		kind
		hasFocalPoint
		focalPoint
	}
`;

export const media = `
	fragment Media on assets_Asset {
		url @transform(immediately: true, quality: 80)
		width
		height
		alt
		srcset(sizes: ["100", "200", "300", "400", "600", "800", "1000", "1200", "1600", "2000"])
		kind
		hasFocalPoint
		focalPoint
	}
`;

export const mediaFull = `
	fragment MediaFull on assets_Asset {
		url @transform(immediately: true, quality: 100)
		width
		height
		alt
		kind
		hasFocalPoint
		focalPoint
	}
`;

export const button = `
	fragment Button on buttons_default_Entry {
		__typename
		label
		externalUrl
		siteEntry {
			... on EntryInterface {
				id
				uri
				language
				__typename
			}
		}
		siteCategory {
			uri
			language
		}
		modalEmbed {
			... on modalEmbed_modalEmbed_BlockType {
				id
				text
				logosTitle
				logos {
					...Image
				}
				embedCode
				embedSubtitle
				backgroundImage {
					...Image
				}
				bgWhite
			}
		}
	}
`;

export const seo = `
	fragment SEO on seo_seo_BlockType {
		shareTitle
		shareDescription
		shareImage {
			...Image
		}
		noIndex
	}
`;
