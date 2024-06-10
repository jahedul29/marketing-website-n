import gql from '$gql/gql';
import {
	cardArticles,
	cardCustomerStories,
	cardResources,
	cardSuppliers
} from '$gql/fragments/cards';
import { media, mediaFull } from '$gql/fragments/ui';

export const moduleStats = gql`
	fragment ModuleStats on modules_stats_Entry {
		displayTitle
		plainText
		statItems {
			... on statItems_statItem_BlockType {
				text
			}
		}
	}
`;

export const moduleText = gql`
	fragment ModuleText on modules_text_Entry {
		displayTitle
		richText
	}
`;

export const moduleTextMedia = gql`
	fragment ModuleTextMedia on modules_textMedia_Entry {
		surtitle
		displayTitle
		richText
		button {
			...Button
		}
		media {
			...Media
		}
		reverse
		highlight
		highlightBackground
	}
`;

export const moduleMasonry = gql`
	fragment ModuleMasonry on modules_masonry_Entry {
		surtitle
		displayTitle
		plainText
		suppliers {
			...CardSuppliers
		}
		button {
			...Button
		}
	}
`;

export const moduleDrawers = gql`
	fragment ModuleDrawers on modules_drawers_Entry {
		displayTitle
		drawerItems {
			... on drawerItems_drawerItem_BlockType {
				id
				displayTitle
				richText
			}
		}
	}
`;

export const moduleMedia = gql`
	fragment ModuleMedia on modules_media_Entry {
		framed
		highlight
		highlightBackground
		surtitle
		displayTitle
		plainText
		media {
			...MediaFull
		}
		autoplay
		embedVideoUrl
		poster {
			...Media
		}
	}

	${mediaFull}
`;

export const moduleTestimonials = gql`
	fragment ModuleTestimonials on modules_testimonials_Entry {
		displayTitle
		quotes {
			... on quotes_Quote_BlockType {
				quote
				source
				role
				media {
					...Media
				}
				poster {
					...Image
				}
				logo {
					...Image
				}
			}
		}
	}
`;

export const moduleCta = gql`
	fragment ModuleCta on modules_ctaBigDaddy_Entry {
		surtitle
		displayTitle
		color
		image {
			...Image
		}
		button {
			...Button
		}
	}
`;

export const moduleGrid = gql`
	fragment ModuleGrid on modules_grid_Entry {
		surtitle
		displayTitle
		plainText
		gridItems {
			... on gridItems_gridItem_BlockType {
				color
				icon {
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
`;

export const moduleSlider = gql`
	fragment ModuleSlider on modules_slider_Entry {
		surtitle
		displayTitle
		plainText
		cardEntries {
			...CardSuppliers
			...CardArticles
			...CardResources
			...CardCustomerStories
		}
		button {
			...Button
		}
	}
`;

export const moduleLogos = gql`
	fragment ModuleLogos on modules_logos_Entry {
		logos {
			...Image
		}
		surtitle
		displayTitle
		plainText
	}
`;

export const moduleImageMarquee = gql`
	fragment ModuleImageMarquee on modules_imageMarquee_Entry {
		images {
			...Image
		}
	}
`;

export const moduleCenteredText = gql`
	fragment ModuleCenteredText on modules_centeredText_Entry {
		surtitle
		displayTitle
		simpleRichText
		button {
			...Button
		}
	}
`;

export const moduleEmbed = gql`
	fragment ModuleEmbed on modules_embed_Entry {
		surtitle
		displayTitle
		plainText
		embedCode
		button {
			...Button
		}
	}
`;

export const moduleVideo = gql`
	fragment ModuleVideo on modules_video_Entry {
		displayTitle
		video {
			__typename
			... on video_videoEmbed_BlockType {
				embedUrl
				poster {
					...Media
				}
				urlDash
				urlHls
				urlMp4
			}
			... on video_videoStream_BlockType {
				urlDash
				urlHls
				urlMp4
			}
			... on video_videoMp4_BlockType {
				media {
					...Media
				}
			}
		}
	}
`;

export const moduleFragmentsRef = `
	typeHandle
	...ModuleStats
	...ModuleText
	...ModuleTextMedia
	...ModuleMasonry
	...ModuleDrawers
	...ModuleMedia
	...ModuleTestimonials
	...ModuleCta
	...ModuleGrid
	...ModuleSlider
	...ModuleLogos
	...ModuleImageMarquee
	...ModuleCenteredText
	...ModuleEmbed
`;

export const moduleFragments = `
	${moduleStats}
	${moduleText}
	${moduleTextMedia}
	${moduleMasonry}
	${moduleDrawers}
	${moduleMedia}
	${moduleTestimonials}
	${moduleCta}
	${moduleGrid}
	${moduleSlider}
	${moduleLogos}
	${moduleImageMarquee}
	${moduleCenteredText}
	${moduleEmbed}
	
	${media}
	${cardSuppliers}
	${cardArticles}
	${cardResources}
	${cardCustomerStories}
`;
