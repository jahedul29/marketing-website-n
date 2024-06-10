<!--@docs
The Sticky node contraints its children to be laid out on top of its siblings
and positioned according to its `positon` property.
The Sticky node will be reposition inside its parent, in order to remain
visible on scroll, but never get out of its parent's boundaries.

### Implementation

A single sticky HTMLElement.

### Example

```
<Sticky position="top-left">
	...
</Sticky>
```
-->
<script lang="ts">
	import { property } from '$lib/tailwind/properties';
	import type { Position } from '$lib/tailwind/units';

	export let position: Position = 'auto';

	const classes = (): string => {
		const c = `sticky`;
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
