# Svelte actions

You can group your svelte actions (https://svelte.dev/docs#use_action) inside the `src/lib/actions`
folder.

Present by default in the folder are:

-   `slide.ts`: A slide animation that you can use for drawers, for example (used in
    `Drawer.svelte`).
-   `tabNav.ts`: Keyboard arrow navigation for tabs to put on tablists elements (used in
    `Tabs.svelte`).
-   `trapFocus.ts`: Use this actions to trap focus inside a container, like an open dialog (used in
    `Modal.svelte`).
-   `clickOutside.ts`: Runs a callback whenever a click outside the container is detected (used in
    `Modal.svelte` and `Popover.svelte`).
-   `portal.ts`: Renders the node in another parent. If no parent is specified, the node is rendered
    at the end of the body (used in `Modal.svelte`).
-   `scrollLock.ts`: Locks the scroll when the node is rendered and unlocks it when the node is
    destroyed (used in `Modal.svelte` and `Popover.svelte`).
-   `inViewport.ts`: Manages a pool of `IntersectionObserver` instances and runs the provided
    callback when the element is visible.
-   `autofocus.ts`: Autofocuses a node.
-   `autofocusAfterTick.ts`: Autofocuses a node after `tick()` resolves.
-   `autofocusWithDelay.ts`: Autofocuses a node after a delay.
-   `scrollIntoView.ts`: Scrolls a node into view.
-   `setListeners.ts`: Programmatically sets event listeners on a node.
-   `ytThumbnailFallback.ts`: Loads a fallback thumbnail when Youtube can't find an image associated
    with the resolution queried.
-   `forms/enhancePost`: Handles POST forms submissions. See [forms](./19-forms.md).
-   `forms/enhanceGet`: Handles GET forms submissions. See [forms](./19-forms.md).
-   `parallax`: Adds parallax effect (with css translate) on a node. Accepts a `speed` parameter
    (which can be negative to reverse the direction) and an `onScroll` callback, which takes a
    `scrollPercent` number as parameter.
