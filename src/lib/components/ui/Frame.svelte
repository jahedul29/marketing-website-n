<!--@docs
The Frame node is responsible for visual apperances that might affect
the layout, such as padding and borders, or might propagate to their children
like a background or color.

### Implementation

A single relative, full width, full height, border box HTMLElement.

### Example

```
<Frame padding="20">
	...
</Frame>
```
-->
<script lang="ts">
	import { tailwindify, tailwindifyWithMin } from '$lib/tailwind/tailwind';
	import type {
		BorderUnit,
		Color,
		SizeUnit,
		PxUnit,
		RadiusUnit,
		FontUnit,
		LineUnit
	} from '$lib/tailwind/units';

	export let padding: Maybe<PxUnit> = null;
	export let background: Maybe<Color> = null;
	export let color: Maybe<Color> = null;
	export let text: Maybe<FontUnit> = null;
	export let lineHeight: Maybe<LineUnit> = null;
	export let width: Maybe<SizeUnit> = null;
	export let height: Maybe<SizeUnit> = null;
	export let border: Maybe<BorderUnit> = null;
	export let radius: Maybe<RadiusUnit> = null;
	export let borderColor: Maybe<Color> = null;
	export let borderStyle: Maybe<'solid'> = 'solid';
	export let invertedTheme = false;

	const classes = (): string => {
		let c = `relative block box-border`;
		if (width) {
			c = `${c} ${tailwindifyWithMin('w', width)}`;
		} else {
			c = `${c} min-w-0 w-full max-w-full`;
		}
		if (height) {
			c = `${c} ${tailwindifyWithMin('h', height)}`;
		} else {
			c = `${c} min-h-full h-full`;
		}
		if (padding) {
			c = `${c} ${tailwindify('p', padding)}`;
		}
		if (border && borderStyle) {
			c = `${c} ${tailwindify('border', borderStyle)} ${tailwindify('border', border)}`;
		}
		if (borderColor) {
			c = `${c} ${tailwindify('border', borderColor)}`;
		}
		if (radius) {
			c = `${c} isolate overflow-hidden ${tailwindify('rounded', radius)}`;
		}
		if (background) {
			c = `${c} ${tailwindify('bg', background)}`;
		}
		if (text) {
			c = `${c} ${tailwindify('text', text)}`;
		}
		if (color) {
			c = `${c} ${tailwindify('text', color)}`;
		}
		if (lineHeight) {
			c = `${c} ${tailwindify('leading', lineHeight)}`;
		}
		if (invertedTheme) {
			c = `${c} inverted-theme`;
		}
		return c;
	};
</script>

<div class={classes()}>
	<slot />
</div>
