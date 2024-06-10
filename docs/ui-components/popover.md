# Popover

A generic and flexible modal component, inspired by https://headlessui.dev/vue/popover. The button
toggles open the panel (and overlay if present). When the user focuses or clicks outside the panel,
it is closed.

NOTE: To learn the difference between a modal (dialog) and a popover, read
https://headlessui.dev/vue/popover#when-to-use-a-popover.

**Main component:** `Popover.svelte`

## Props

-   `id` (string): Used to identify the popover content for assistive technologies. REQUIRED.
-   `open` (boolean): The state of the popover content. `true` is **open**, `false` is **closed**.
    DEFAULT: false.
-   `unmount` (boolean): Whether the panel and overlay should be unmounted or hidden based on the
    open state (see example usage). DEFAULT: false.
-   `hover` (boolean): Wether the panel and overlay should be toggled on hover (see example usage).
    DEFAULT: false.
-   `transitionDuration` (string): A css transition duration the will delay the visibility toggle if
    `unmount` is `false` (see example usage). DEFAULT: "0s"
-   `lockScroll` (boolean): Wether to lock the site scroll when the popover is open. DEFAULT: false.
-   `class` (string): Optional container classes.
-   readonly `close` (() => void): A function to close the popover that the parent component can
    bind to (see example usage). Cannot be reassigned.

## Slots

### Default

The default slot, mainly for the popover button.

Slot Props:

-   readonly `open` (boolean): Wether the popover is open or not.
-   readonly `close` (() => void): A function to close the popover.

### Content

The slot to render the panel and overlay.

Name: "content"

## Events

-   `on:open`: Fired when the popover opens.
-   `on:close`: Fired when the popover closes.

## Children components

### PopoverButton.svelte

The button to toggle the popover panel. Can be used inside the panel as well.

Props:

-   `class` (string): Optional classes.

### PopoverPanel.svelte

The panel that is shown or hidden and that holds the main content.

Props:

-   `as` (string): Optional panel tagname. Default: 'div'.
-   `class` (string): Optional classes.

### PopoverOverlay.svelte

An optional overlay the will close the panel when clicked.

Props:

-   `class` (string): Optional classes.

## Unmount

The `unmount` prop determines if the popover content is toggled via mounting/unmounting the elements
in the DOM or via css.

Generally, if the content is important to the website, like navigation links, it should be toggled
via css so it can still be accessed by search engines, as it will be better for the site's SEO.

## Toggling the panel

You can toggle the popover panel in several ways:

-   By using the `PopoverButton` component, which will always toggle the popover.
-   By using the `close` function passed as a prop to the `content` slot.
-   By binding the `close` prop on the `Popover` component. This is useful when you want your parent
    component to close the popover programmatically, like when navigating(see example usage).

## Transitions

Depending on wether the `unmount` prop is `true` or `false`, the transition strategy you will have
to employ will differ.

**If `unmount` is `false`**, the content is wrapped in a `div` that gets shown and hidden via css
`visibility`. You can then use the `open` slot prop to toggle classes to show/hide the panel and
overlay. To animate the content when closing the popover, you can delay the `visibility` toggle by
using the `transitionDuration` prop.

**If `unmount` is `true`**, the content will only appear in the DOM when `open` is true. You can
then wrap the panel and overlay in `div` elements and use Svelte transitions.

## Example usage

If `unmount` is `false` and the content is toggled via css `visibility`:

```html
<script lang="ts">
	import { navigating } from '$app/stores';
	import {
		Popover,
		PopoverButton,
		PopoverOverlay,
		PopoverPanel
	} from '$lib/components/ui/popover';

	let closeMenu;

	navigating.subscribe((nav) => {
		if (nav && closeMenu) {
			closeMenu();
		}
	});
</script>

<Popover id="my-dropdown" class="relative" transitionDuration="200ms" bind:close="{closeMenu}">
	<PopoverButton> Dropdown nav menu </PopoverButton>
	<svelte:fragment slot="content" let:open let:close>
		<PopoverOverlay
			class="{open ? 'opacity-100' : 'opacity-0'} bg-main fixed left-0 top-0 h-full
				w-full bg-opacity-50
				transition-opacity duration-200"
		/>
		<PopoverPanel
			class="{open ? 'opacity-100' : 'opacity-0'} absolute
				left-1/2 top-full
				transition-opacity duration-200"
		>
			<ul>
				{#each navItems as item}
				<li>// ... navigation link</li>
				{/each}
			</ul>
			<PopoverButton> Close this dropdown </PopoverButton>
			<button on:click="{close}">I can also close this dropdown</button>
		</PopoverPanel>
	</svelte:fragment>
</Popover>
```

If `unmount` is `true` and the content is toggled via mounting and unmounting in the DOM:

```html
<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import {
		Popover,
		PopoverButton,
		PopoverOverlay,
		PopoverPanel
	} from '$lib/components/ui/popover';

	let closeMenu;

	navigating.subscribe((nav) => {
		if (nav && closeMenu) {
			closeMenu();
		}
	});
</script>

<Popover id="my-dropdown" class="relative" bind:close="{closeMenu}" unmount>
	<PopoverButton> Dropdown nav menu </PopoverButton>
	<svelte:fragment slot="content" let:close>
		<div transition:fade>
			<PopoverOverlay
				class="bg-main fixed left-0 top-0 h-full w-full cursor-pointer bg-opacity-50"
			/>
		</div>
		<div transition:fly>
			<PopoverPanel class="absolute left-1/2 top-full">
				<ul>
					{#each navItems as item}
					<li>// ... navigation link</li>
					{/each}
				</ul>
				<PopoverButton class="relative z-30"> Close this dropdown </PopoverButton>
				<button on:click="{close}">I can also close this dropdown</button>
			</PopoverPanel>
		</div>
	</svelte:fragment>
</Popover>
```

If `hover` is `true` and the content is toggled on hover:

```html
<script lang="ts">
	import {
		Popover,
		PopoverButton,
		PopoverOverlay,
		PopoverPanel
	} from '$lib/components/ui/popover';
</script>

<Popover id="my-dropdown" class="relative" transitionDuration="200ms" hover>
	<!-- You can also display a link and keep the button visually hidden so keyboard users can still toggle the popover -->
	<a href="##">About</a>
	<!-- This will only show the button if it is focused by keyboard navigation -->
	<PopoverButton class="sr-only focus-visible:not-sr-only">
		<span class="sr-only">Open menu</span>
		<span>
			<!-- Menu Icon -->
		</span>
	</PopoverButton>
	<svelte:fragment slot="content" let:open let:close>
		<!-- If you show content on hover, don't forget to show it on focus as well -->
		<PopoverOverlay
			class="bg-main fixed left-0 top-0 h-full w-full bg-opacity-50 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 pointer:group-hover:opacity-100"
		/>
		<PopoverPanel
			class="absolute left-1/2 top-full opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 pointer:group-hover:opacity-100"
		>
			<ul>
				{#each navItems as item}
				<li>// ... navigation link</li>
				{/each}
			</ul>
			<PopoverButton> Close this dropdown </PopoverButton>
			<button on:click="{close}">I can also close this dropdown</button>
		</PopoverPanel>
	</svelte:fragment>
</Popover>
```
