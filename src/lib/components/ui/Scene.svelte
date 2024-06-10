<!--@docs
The Scene node is responsible for fixed height in vh, called `elevation`.
It clips content that renders outside.

### Implementation

A single relative, overflow hidden HTMLElement.

### Example

```
<Scene elevation="20">
	<div class="bg-[red]">1</div>
	<div class="bg-[green]">2</div>
	<div class="bg-[blue]">3</div>
	<div class="bg-[yellow]">4</div>
</Scene>
```
-->
<script lang="ts">
	import { vhify } from '$lib/tailwind/tailwind';
	import type { VwUnit, PxUnit } from '$lib/tailwind/units';

	export let elevation: VwUnit = '100';
	export let rhythm: Maybe<PxUnit> = null;

	const classes = (): string => {
		let c = `relative min-w-0 max-w-full overflow-hidden`;
		if (elevation) {
			c = `${c} h-${vhify(elevation)}`;
		}
		if (rhythm) {
			c = `${c} pt-${rhythm}`;
		}
		return c;
	};
</script>

<div class={classes()}>
	<slot />
</div>
