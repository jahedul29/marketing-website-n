import type { EntryInterface } from 'src/craft';

type ModuleQuery<TModule extends EntryInterface = EntryInterface> = (
	module: TModule,
	entry: NormalizedCraftPage
) => Promise<TModule>;

type ModuleQueries = {
	[key: string]: ModuleQuery;
};

export const moduleQueries: ModuleQueries = {};
