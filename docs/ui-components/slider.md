# Slider

A lightweight slider that uses native browser scroll and css scroll-snap (optional). It also
supports sliding with buttons and auto-sliding on long button press.

## Slider.svelte

The main component that wraps all children components.

Props:

-   `widthBuffer` (`number`): This prop is mostly useful when animating the slider items along the x
    axis. Animating them in such a way creates an overflow even when the items themselves are not
    overflowing the container. This in turn enables the nav buttons even though no scroll can occur.
    This prop represents the number of additional pixels to add to the slider viewport
    (`clientWidth`) to evaluate if the nav buttons should be enabled. For example, if you animate
    the items with a 40px translation from the side, you should use a width buffer of 40.
    Default: 0.

Slot props:

-   readonly `navEnabled` (`boolean`): Wether scrolling can occur on the slider. This also
    determines wether the buttons and pagination components are rendered or not.

## SliderItems.svelte

Used to render the items container.

Props:

-   `items` (`T[]`): An array of items to render the slides.
-   `itemsWidth` (string | number): Optional width applied directly on the items containers. Useful
    if you want to use percentages.
-   `snap` ('start' | 'center' | 'end' | 'align-none'): The snap alignment. You can combine any of
    these values with a `|` to specify a mobile and a desktop value (see is our
    [responsive syntax](../16-tailwind-property-syntax.md#responsiveness)). For example,
    'center|start' means the slides are aligned to start on mobile and center on desktop.
    'align-none' will disable scroll-snap and allow free scroll. Default: 'center|start'.
-   `snapFirst` ('start' | 'center' | 'end' | 'align-none'): The snap alignment of the first slide.
    Default: `snap`.
-   `snapLast` ('start' | 'center' | 'end' | 'align-none'): The snap alignment of the last slide.
    Default: `snap`.
-   `spaceBetween` (string | number): The width (in px) of the space between the slides.
-   `spaceBefore` (string | number): The width (in px) of the space before the slides. Default:
    `spaceBetween`.
-   `spaceAfter` (string | number): The width (in px) of the space after the slides. Default:
    `spaceBetween`.
-   `label` (string): Optional `aria-label` to identify the slider for assistive technologies.
-   `noscrollbar` (boolean): Hides the scrollbar. Default: `false`.

Slot props:

-   readonly `item` (any): The current item in the loop.
-   readonly `index` (number): The current index in the loop.

## SliderButton.svelte

Used to render a button that controls the slider. The button will be hidden if no scrolling can
occur.

Props:

-   `direction` ('next' | 'prev'): The direction the slider scrolls when the button is pressed.
    Default: 'next'.
-   `class`: Optional button classes.

## SliderPagination.svelte

Used to render a slider pagination. The component only renders a `<slot />` (unless `clickable` is
true) for each step so you can have complete freedom on how you want to style the pagination. The
pagination will be hidden if no scrolling can occur.

Props

-   `clickable` (`boolean`): If true, the step `<slot />` will be wrapped in a `<button />` so users
    can click it to skip to a further step.

Slot props:

-   `index` (`number`): The step index.
-   `active` (`active`): Wether the step is the current step or not.

## Styling the scrollbar

If the `noscrollbar` option is `false`, the slides container (in `SliderItems.svelte`) will have a
class of `slider-items-scrollbar` that you can use to style the scrollbar.

```html
<style lang="postcss">
	/* Chrome, Edge and Safari */
	:global(.slider-items-scrollbar)::-webkit-scrollbar {
		width: 12px;
		background-color: theme('colors.main');
	}

	/* Firefox */
	:global(.slider-items-scrollbar) {
		scrollbar-color: theme('colors.main');
	}
</style>
```

## Example usage

```svelte
<script lang="ts">
	import { Slider, SliderButton, SliderItems } from '$lib/components/ui/slider';
</script>

<Slider>
	<SliderButton direction="prev" let:disabled>
		<span class:opacity-50={disabled}>Previous</span>
	</SliderButton>
	<SliderItems
		snap="center"
		snapLast="end"
		snapFirst="start"
		spaceBetween="48|72"
		spaceBefore="48|400"
		label="My articles"
		noscrollbar
		{items}
		let:item
		let:index
	>
		<article class="flex h-248 w-248 items-center justify-center border-2 font-bold">
			{index + 1}: {item.title}
		</article>
	</SliderItems>
	<SliderButton direction="next" let:disabled>
		<span class:opacity-50={disabled}>Next</span>
	</SliderButton>
	<div class="flex items-center justify-center space-x-4 py-24">
		<SliderPagination let:active clickable>
			<div class="bg-shade-400 h-8 w-8 rounded-full" class:bg-main={active} />
		</SliderPagination>
	</div>
</Slider>
```
