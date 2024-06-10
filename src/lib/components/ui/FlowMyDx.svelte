<!--@docs
The FlowMyDx node splits the available space (vertically on mobile | horizontally on desktop)
between all of its children, without ever shrinking content.
It spaces each children according to its `justify` and `gap` properties.

### Implementation

A single relative, flex-col sm:flex-row nowrap HTMLElement.

### Example

```
<FlowMyDx gap="40">
	<div class="bg-[red]">1</div>
	<div class="bg-[green] w-288">2</div>
	<div class="bg-[blue]">3</div>
	<div class="bg-[yellow]">4</div>
</FlowMyDx>
```
-->
<script lang="ts">
	import { tailwindify } from '$lib/tailwind/tailwind';
	import type { Align, Gap, Justify, PxUnit } from '$lib/tailwind/units';

	export let gap: Maybe<Gap> = null;
	export let rhythm: Maybe<PxUnit> = null;
	export let justify: Maybe<Justify> = null;
	export let align: Maybe<Align> = null;
	export let reverse = false;

	const classes = (): string => {
		let direction = reverse ? 'bp:flex-row-reverse' : 'bp:flex-row';
		let c = `relative min-w-0 max-w-full flex flex-initial flex-col ${direction} flex-nowrap`;
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
