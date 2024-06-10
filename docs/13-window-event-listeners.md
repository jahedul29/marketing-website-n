# Window event listeners

In order to avoid putting to many event listeners on the window, which can affect the site's
performance, you can use `createWindowEventStore`, which returns a [Svelte readable store]
(https://svelte.dev/docs#readable, and export it from the `src/lib/stores/window` folder.

A Svelte readable store will not run the callback function passed to it unless there is at least one
subscriber. If no component is using the `keydown` store, for example, on the current page, no
`keydown` event listener will be registered on the window. If that component is destroyed, the event
listener will be removed as well. If more than one component is using the store, there will still be
only one event listener on the window.

The events available by default are `resize`, `keydown`, `click`, `scroll`, `pointerdown`, `focus`
and `clickUseCapture` (same as `click` but with `capture: true`).

You can use these stores in your components like this:

```ts
import { keydown } from '$lib/stores/window/keydown';

keydown.subscribe((e: KeyboardEvent) => {
	// whatever happens on keydown
});
```
