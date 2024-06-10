<!--@docs
After having imported the components with [`runDynamicImports`](./dynamic-imports/runDynamicImports.ts), we need to render them. To do so, you can use the
ComponentSelector.svelte helper.

IMPORTANT: In order for the imported components to receive the data, they HAVE to export en `entry`
prop.

You can also use the default slot to render the components in any way you like. The slot receives the `component` and `entry` props. 

### Example usage

```svelte
<script lang="ts">
	import ComponentSelector from '$lib/ComponentSelector.svelte';

	export let data;

	const { modules } = data?.entry || {};
</script>

<ComponentSelector entries={modules} />

<ComponentSelector entries={modules} let:component let:entry>
	<section>
		<svelte:component this={component} {entry} darkMode />
	</section>
</ComponentSelector>
```
-->

<script lang="ts">
	import { dev } from '$app/environment';

	type TEntry = $$Generic<DynamicImportEntry>;
	type ComponentSelectorEntry = Maybe<CraftEntryWithSvelteComponent<TEntry>>;

	export let entries: ComponentSelectorEntry[] = [];
</script>

{#if entries?.length}
	{#each entries as entry}
		{@const component = entry?.svelteComponent}
		{#if component}
			<slot {component} {entry}>
				<svelte:component this={component} {entry} />
			</slot>
		{:else if dev}
			<div>
				Error importing component for entry: <pre>{JSON.stringify(entry, null, 4)}</pre>
			</div>
		{/if}
	{/each}
{/if}
