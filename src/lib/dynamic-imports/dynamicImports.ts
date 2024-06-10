/**@docs
 * This is the API to add your dynamic imports.
 * The `dynamicImports` array contains objects with the following form:
 *
 * ```ts
 * {
 *	key: string;
 *	getImport: (entry: EntryInterface) => Promise<SvelteComponent>;
 * }
 * ```
 * At each page load, these objects get evaluated against the data returned from the server load
 * function (in `+page.server.ts`). We then go recursively through every property until we find the one
 * corresponding to the provided key. If the value is an object or an array of objects, we will call
 * the associated `getImport` function to get the component and add a `svelteComponent` property on the
 * object(s), with the component as the value. This component can then be rendered in the templates,
 * usually with the `ComponentSelector.svelte` helper.
 *
 * The `key` property is a string describing the path, in dot notation, of the property you want
 * dynamically imported components for. For example, the key for a `modules` field on a CMS `entry`
 * property would be `'entry.modules'`, and the key for a `dynamicEntries` field inside of a module
 * would be `'entry.modules.dynamicEntries'` and so on. An empty string represents the data object
 * itself.
 *
 * The `getImport` property is a function that gets the object corresponding to the key as an argument
 * and returns the `import()` call for the component.
 *
 * IMPORTANT: do NOT `await` the import, it will not work. The 'awaiting' happens later.
 *
 * Moreover, Because of how Vite processes dynamic imports, there are several limitations to keep in
 * mind when writing the import path. They are listed here:
 * [https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations).
 *
 * Example:
 *
 * ```ts
 * {
 * 	key: 'relatedItems',
 * 	getImport: (entry: CraftModule) =>
 * 		import(`../cards/${capitalize(entry.typeHandle)}.svelte`)
 * }
 * // Dynamically import all modules components
 * {
 * 	key: 'entry.modules',
 * 	getImport: (entry: CraftModule) =>
 * 		import(`../modules/${capitalize(entry.typeHandle)}.svelte`)
 * },
 * // Dynamically import card components on a module
 * {
 * 	key: 'entry.modules.cardItems',
 * 	getImport: (entry: CraftModule) =>
 * 		import(`../cards/${capitalize(entry.typeHandle)}.svelte`)
 * },
 * // The properties can be at any level
 * {
 * 	key: 'entry.content.blocks.items.icons',
 * 	getImport: (entry: CraftModule) =>
 * 		import(`../icons/${capitalize(entry.typeHandle)}.svelte`)
 * }
 * ```
 */
import { capitalize } from '$lib/utils/string/capitalize';

export const dynamicImports: DynamicImport[] = [
	{
		key: 'entry.modules',
		getImport: (entry) => {
			return import(`../modules/${capitalize(entry?.typeHandle || '')}.svelte`);
		}
	},
	{
		key: 'entry.headerModules',
		getImport: (entry) => {
			return import(`../modules/${capitalize(entry?.typeHandle || '')}.svelte`);
		}
	},
	{
		key: 'entry.contentBlocks',
		getImport: (entry) => {
			return import(`../content-blocks/Block${capitalize(entry?.typeHandle || '')}.svelte`);
		}
	},
	{
		key: 'entry.modules.cardEntries',
		getImport: (entry) => {
			return import(
				`../components/cards/Card${capitalize(entry?.sectionHandle || '')}.svelte`
			);
		}
	},
	{
		key: 'entry.teamStories',
		getImport: (entry) => {
			return import(
				`../components/cards/Card${capitalize(entry?.sectionHandle || '')}.svelte`
			);
		}
	}
];
