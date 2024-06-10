<!--@docs
The FlowX node splits the available space horizontally between all of its
children, without ever shrinking content.
If required, the Row will outgrow its parent.
It spaces each children according to its `justify` and `gap` properties.

### Implementation

A single relative, flex-row nowrap HTMLElement.

### Example

```
<FlowX justify="between">
	<div class="bg-[red]">1</div>
	<div class="w-[288px] bg-[green]">2</div>
	<div class="bg-[blue]">3</div>
	<div class="bg-[yellow]">4</div>
</FlowX>
```
-->
<script lang="ts">
	import { tailwindify } from '$lib/tailwind/tailwind';
	import type { Align, Gap, Justify, PxUnit } from '$lib/tailwind/units';

	export let gap: Maybe<Gap> = null;
	export let rhythm: Maybe<PxUnit> = null;
	export let justify: Maybe<Justify> = null;
	export let align: Maybe<Align> = null;

	const classes = (): string => {
		let c = `relative min-w-0 max-w-full flex flex-initial flex-row flex-nowrap`;
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
