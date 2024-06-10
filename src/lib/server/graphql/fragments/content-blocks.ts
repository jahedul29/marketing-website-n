import gql from '$gql/gql';

const base = `
	typeHandle
	anchorLabel
`;

export const contentBlocksRef = gql`
	... on contentBlocks_text_BlockType {
		${base}
		richText
	}
	... on contentBlocks_textMedia_BlockType {
		${base}
		richText
		media {
			...Media
		}
		caption
	}
	... on contentBlocks_emphasis_BlockType {
		${base}
		headline
		text
		color
	}
	... on contentBlocks_quote_BlockType {
		${base}
		quote
		sourceName
		sourceRole
	}
	... on contentBlocks_media_BlockType {
		${base}
		media {
			...Media
		}
		caption
	}
	... on contentBlocks_embedVideo_BlockType {
		${base}
		videoUrl
		videoThumbnail {
			...Image
		}
		caption
	}
	... on contentBlocks_stats_BlockType {
		${base}
		stats {
			stat
			text
		}
	}
	... on contentBlocks_singleButton_BlockType {
		${base}
		button {
			...Button
		}
	}
	... on contentBlocks_cta_BlockType {
		${base}
		displayTitle
		image {
			...Image
		}
		color
		button {
			...Button
		}
	}
`;
