/**@docs
 * This is where we process the dynamic imports.
 *
 * The `runDynamicImports` function is meant to be called inside the
 * `+page.ts` `load` function on the `data` object. It returns the data with the
 * dynamically imported components.
 */

import { browser } from '$app/environment';
import { dynamicImports } from '$lib/dynamic-imports/dynamicImports';

const getAllImports = (
	obj: CraftEntryWithSvelteComponent,
	parts: string[],
	getImport: DynamicImport['getImport']
) => {
	let imports: (() => Promise<void>)[] = [];
	const firstPart = parts[0];
	let value = firstPart ? obj[firstPart] : obj;
	if (!value) {
		return imports;
	}
	while (parts.length > 1 && typeof value === 'object') {
		parts.shift();
		if (Array.isArray(value)) {
			const newImports = (value as CraftEntryWithSvelteComponent[]).flatMap((item) => {
				return getAllImports(item, parts.slice(), getImport);
			});
			imports = [...imports, ...newImports];
		}
		value = value?.[parts[0]];
	}
	if (Array.isArray(value)) {
		const newImports = (value as CraftEntryWithSvelteComponent[]).map((item) => {
			if (!!item && typeof item === 'object') {
				const newImport = async () => {
					item.svelteComponent = (await getImport(item))?.default;
				};
				return newImport;
			}
			return () => Promise.resolve();
		});
		imports = [...imports, ...newImports];
	} else if (!!value && typeof value === 'object') {
		const newImport = async () => {
			(value as CraftEntryWithSvelteComponent).svelteComponent = (
				await getImport(value as CraftEntryWithSvelteComponent)
			)?.default;
		};
		imports.push(newImport);
	}
	return imports.flat();
};

const getComponentsImports = (entry: CraftEntryWithSvelteComponent) => {
	return dynamicImports
		.map(({ key, getImport }) => {
			return getAllImports(entry, key.split('.'), getImport);
		})
		.flat();
};

export const runDynamicImports = async <TEntry extends DynamicImportEntry>(entry: TEntry) => {
	if (!entry) {
		return entry;
	}
	// @TODO find a better way to copy objects
	const entryCopy = JSON.parse(JSON.stringify(entry)) as CraftEntryWithSvelteComponent<TEntry>;
	try {
		const imports = getComponentsImports(entryCopy);
		await Promise.allSettled(
			imports.map(async (runImport) => {
				return runImport();
			})
		);
		return entryCopy;
	} catch (error) {
		if (!browser) {
			console.error(error);
		}
		return entryCopy;
	}
};
