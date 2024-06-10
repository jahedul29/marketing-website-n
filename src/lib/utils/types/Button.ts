import type { Entry } from '$lib/utils/types/Entry';
import type { Asset } from '$lib/utils/types/Asset';
import type { EntryInterface, ModalEmbed_MatrixField } from 'src/craft';

export interface Button {
	label?: Maybe<string>;
	siteEntry?: Maybe<Entry>[];
	siteCategory?: Maybe<Entry>[];
	asset?: Maybe<Asset>[];
	download?: Maybe<boolean>;
	hash?: Maybe<string>;
	externalUrl?: Maybe<string>;
	modalEmbed?: Maybe<ModalEmbed_MatrixField>[];
}

export interface ButtonAttributes {
	href: string;
	rel: Maybe<string>;
	target: Maybe<'_blank'>;
	download: Maybe<''>;
}

export const toButtonEntry = (button?: Maybe<EntryInterface>) => button as Maybe<Button>;
