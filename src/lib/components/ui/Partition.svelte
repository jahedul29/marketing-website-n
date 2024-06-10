<!--@docs
The Partition node splits the available space into equal chunks.
It spaces each children according to its `justify` and `gap` properties.

### Implementation

A single relative, display grid HTMLElement with cols number of 1fr columns as template.

### Example

```
<Partition cols="4" gap="40" justify="between">
	<div class="bg-[red]">1</div>
	<div class="bg-[green]">2</div>
	<div class="bg-[blue]">3</div>
	<div class="bg-[yellow]">4</div>
</Partition>
```
-->
<script lang="ts">
	import { tailwindify } from '$lib/tailwind/tailwind';
	import type { Gap, Cols, Justify, PxUnit, Align } from '$lib/tailwind/units';

	export let cols: Cols = '1';
	export let justify: Maybe<Justify> = null;
	export let align: Maybe<Align> = null;
	export let gap: Maybe<Gap> = null;
	export let rhythm: Maybe<PxUnit> = null;

	const classes = (): string => {
		let c = `relative min-w-0 max-w-full grid ${tailwindify('grid-cols', cols)}`;
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
