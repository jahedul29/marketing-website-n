<!--@docs
The Matrix node splits the available space customizable fractions.
Fractions can be expressed in many ways and can be used to customize columns,
row or both.

It spaces each children according to its `justify` and `gap` properties.

### Implementation

A single relative, display grid HTMLElement with custom cols and rows templates.

### Example

```
<Matrix colsTemplate="40%,60%" rowsTemplate="2fr,1fr" gap="40" justify="between">
	<div class="bg-[red]">1</div>
	<div class="bg-[green]">2</div>
	<div class="bg-[blue]">3</div>
	<div class="bg-[yellow]">4</div>
</Matrix>
```
-->
<script lang="ts">
	import { tailwindify } from '$lib/tailwind/tailwind';
	import type { Align, Gap, GridTemplate, Justify, PxUnit } from '$lib/tailwind/units';

	export let colsTemplate: Maybe<GridTemplate> = null;
	export let rowsTemplate: Maybe<GridTemplate> = null;
	export let gap: Maybe<Gap> = null;
	export let rhythm: Maybe<PxUnit> = null;
	export let justify: Maybe<Justify> = null;
	export let align: Maybe<Align> = null;

	const cols = () => `[${colsTemplate}]`;
	const rows = () => `[${rowsTemplate}]`;

	const classes = (): string => {
		let c = `relative min-w-0 max-w-full h-full grid`;
		if (colsTemplate) {
			c = `${c} ${tailwindify('grid-cols', cols())}`;
		}
		if (rowsTemplate) {
			c = `${c} ${tailwindify('grid-rows', rows())}`;
		}
		if (gap) {
			c = `${c} ${tailwindify('gap', gap)}`;
		}
		if (rhythm) {
			c = `${c} ${tailwindify('pt', rhythm)}`;
		}
		if (justify) {
			c = `${c} ${tailwindify('justify', justify)}`;
		}
		if (align) {
			c = `${c} ${tailwindify('content', align)}`;
		}
		return c;
	};
</script>

<div class={classes()}>
	<slot />
</div>
