<!--@docs
The Stack node is the most basic type of node and represents html's
implicit layout.
It renders children on top of each others.

It has a single propery: `rhythm`

### Implementation

A single relative HTMLElement.

### Example

```
<Stack rhythm="12">
	<div class="bg-[red]">1</div>
	<div class="bg-[green]">2</div>
	<div class="bg-[blue]">3</div>
	<div class="bg-[yellow]">4</div>
</Stack>
```
-->
<script lang="ts">
	import type { PxUnit } from '$lib/tailwind/units';

	export let rhythm: Maybe<PxUnit> = null;

	const classes = (): string => {
		let c = `relative min-w-0 max-w-full`;
		if (rhythm) {
			c = `${c} pt-${rhythm}`;
		}
		return c;
	};
</script>

<div class={classes()}>
	<slot />
</div>
