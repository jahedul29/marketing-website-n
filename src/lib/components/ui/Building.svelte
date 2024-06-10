<!--@docs
The Building node is responsible for fixed height in px nodes.
It clips (overflow: hidden) content that renders outside.

### Implementation

A single relative, overflow hidden HTMLElement.

### Example

@exec Example.svelte
```
<Building height="288">
	<div class="bg-[red]">1</div>
	<div class="bg-[green]">2</div>
	<div class="bg-[blue]">3</div>
	<div class="bg-[yellow]">4</div>
</Building>
```
-->
<script lang="ts">
	import { tailwindify, tailwindifyWithMin } from '$lib/tailwind/tailwind';
	import type { PxUnit } from '$lib/tailwind/units';

	export let height: Maybe<PxUnit> = null;
	export let rhythm: Maybe<PxUnit> = null;

	const classes = (): string => {
		let c = `relative min-w-0 max-w-full overflow-hidden`;
		if (height) {
			c = `${c} ${tailwindifyWithMin('h', height)}`;
		}
		if (rhythm) {
			c = `${c} ${tailwindify('pt', rhythm)}`;
		}
		return c;
	};
</script>

<div class={classes()}>
	<slot />
</div>
