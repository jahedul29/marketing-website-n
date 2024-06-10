<!--@docs
The DockTo node contraints its children to be laid out on top of its siblings
and positioned according to its `positon` property.

### Implementation

A single absolute HTMLElement.

### Example

```
<Building height="96">
	<DockTo position="middle-center">
		<div class="w-288 bg-[red]">Content</div>
	</DockTo>
</Building>
```
-->
<script lang="ts">
	import { property } from '$lib/tailwind/properties';
	import type { Position } from '$lib/tailwind/units';

	export let position: Position = 'auto';

	const classes = (): string => {
		const c = `absolute`;
		const p = property('position', position);
		if (p) {
			return `${c} ${p}`;
		}

		return c;
	};
</script>

<div class={classes()}>
	<slot />
</div>
