import type {
	CategoryInterface,
	EntryInterface,
	MatrixBlockInterface,
	Seo_Seo_BlockType
} from 'src/craft';
import type { ComponentType } from 'svelte';

declare global {
	type AltEntry = {
		id: string;
		uri: string;
		language: string;
	};

	type CraftModule = Maybe<EntryInterface>;

	type WithModule = { modules?: CraftModule[] };

	type CraftEntry = EntryInterface & WithModule;

	type CraftCategory = CategoryInterface & WithModule;

	type CraftPage = CraftEntry | CraftCategory;

	type NormalizedCraftPage = CraftPage & {
		typeHandle?: string;
		displayTitle?: Maybe<string>;
		seo?: Maybe<Seo_Seo_BlockType>[];
		footerCtas?: Maybe<FooterCtas_MatrixField>[];
		simplified?: Maybe<boolean>;
	};

	type DynamicImportEntry = {
		[key: string]:
			| Maybe<string>
			| Maybe<number>
			| Maybe<boolean>
			| Maybe<EntryInterface>
			| Maybe<EntryInterface>[]
			| Maybe<CategoryInterface>
			| Maybe<CategoryInterface>[]
			| Maybe<ElementInterface>
			| Maybe<ElementInterface>[]
			| Maybe<MatrixBlockInterface>
			| Maybe<MatrixBlockInterface>[]
			| Maybe<DynamicImportEntry>
			| Maybe<DynamicImportEntry>[];
	};

	type CraftEntryWithSvelteComponent<TEntry extends DynamicImportEntry = DynamicImportEntry> =
		TEntry & {
			svelteComponent?: ComponentType;
		};

	type DynamicImport = {
		key: string;
		getImport: <TEntry extends CraftEntryWithSvelteComponent>(
			entry: TEntry
		) => Promise<{ default: ComponentType }>;
	};
}
