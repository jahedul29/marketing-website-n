<!--@docs
The Fixed node contraints its children to be laid out on top of its siblings
and positioned according to its `positon` property.
The Fixed node is not affected by the scroll position, and remains always visible.

### Implementation

A single fixed HTMLElement.

### Example

```
<Fixed position="top-left">
	...
</Fixed>
```
-->
<script lang="ts">
	import { property } from '$lib/tailwind/properties';
	import type { Position } from '$lib/tailwind/units';

	export let position: Position = 'auto';

	const classes = (): string => {
		const c = `fixed`;
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
