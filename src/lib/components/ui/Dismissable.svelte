<!--@docs
This component shows its content after an optional timeout and registers dismissals in browser
storage. It supports both a maximum age and a last update date. The content will show up again if
the dismissal is expired or if the content has been updated since the last dismissal.

It is useful for a banner or a cookie consent popup, for example.

##### Examples

The default storage is `localStorage`, but you can also use `sessionStorage`.

@exec DismissableForever.svelte

```svelte
<Dismissable key="forever" browserStorage="session" let:close>
	<div>This content can be dismissed once per session.</div>
	<button on:click={close}>Dismiss</button>
</Dismissable>
```

You can dismiss the content based on a maximum age in seconds.

@exec DismissableMaxAge.svelte

```svelte
<Dismissable key="maxage" maxAge={5} let:close>
	<div>This content can be dismissed for 5 seconds</div>
	<button on:click={close}>Dismiss</button>
</Dismissable>
```

The content will be back as soon as `lastUpdatedAt` prop is sooner then the last dismissal.

@exec DismissableLastUpdated.svelte

```svelte
<Dismissable key="lastUpdate" maxAge={300} lastUpdatedAt={new Date(Date.now() + 1000)} let:close>
	<div>
		This content can be dismissed for 300 seconds,
		but it won't since its lastUpdatedAt is in the future.
	</div>
	<button on:click={close}>Dismiss</button>
</Dismissable>
```

You can also use animations in or out.

@exec DismissableAnimated.svelte

```svelte
<script lang="ts">
	import Dismissable from '$com/ui/Dismissable.svelte';
	import { fly } from 'svelte/transition';
</script>
<Dismissable key="animated" maxAge={5} let:close>
	<div in:fly={{y:0, duration: 500}} out:fly={{y: -100, duration: 200}}>
		<button on:click={close}>Dismiss</button>
	</div>
</Dismissable>
```
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { navigating } from '$app/stores';

	/**
	 * Used to identify the content being dismissed in browser storage.
	 */
	export let key: string;
	/**
	 * The delay in ms before the content shows up.
	 */
	export let timeout = 0;
	/**
	 * The date of the last update of the content.
	 */
	export let lastUpdatedAt: Maybe<Date> = null;
	/**
	 * The maximum age of the dismissal in seconds.
	 * The content will show up again after this time has past.
	 */
	export let maxAge = 0;
	/**
	 * Wether to use `sessionStorage` or `localStorage`.
	 */
	export let browserStorage: 'local' | 'session' = 'local';
	/**
	 * Wether to close the content when navigating to another page.
	 */
	export let closeOnNav = false;

	const storageKey = `${key}-dismissed`;
	const storage = (): Storage => window[`${browserStorage}Storage`];
	const FOREVER = 'true';
	let open = false;
	$: dismissed = false;

	const getExpiryDate = () => {
		if (maxAge) {
			return new Date(Date.now() - maxAge * 1000);
		}
		return null;
	};

	const stringToValidDate = (value: Maybe<string>) => {
		if (!value) {
			return null;
		}
		const date = new Date(value);
		if (date && isNaN(date.getTime())) {
			if (dev) {
				console.warn(`Invalid date: ${value}`);
			}
			return null;
		}
		return date;
	};

	const checkIfDismissed = (value: Maybe<string>) => {
		// Not in storage, so not dismissed
		if (!value) {
			return false;
		}

		// The default value 'true' means it has been dismissed 'forever'
		if (value === FOREVER) {
			return true;
		}

		// If we have a value other than 'true', it must be the last dismiss date
		const lastDismissed = stringToValidDate(value);

		// If it was dismissed before the last update, it is not dismissed anymore
		if (lastDismissed && lastUpdatedAt && lastDismissed.getTime() < lastUpdatedAt.getTime()) {
			return false;
		}

		// We check if the dismissal is expired
		const expiryDate = getExpiryDate();
		const isExpired =
			lastDismissed && expiryDate && lastDismissed.getTime() < expiryDate.getTime();
		if (isExpired) {
			return false;
		}

		// If we got here, it is dismissed
		return true;
	};

	/**
	 * A function to close the popup without persistance.
	 */
	export const close = () => {
		open = false;
	};

	/**
	 * A function to dismiss the popup for the provided maxAge.
	 */
	export const dismiss = () => {
		close();
		// If an expiry date is needed, the value is the date. Otherwise, the value remains 'true'
		const storageValue = maxAge || lastUpdatedAt ? new Date().toISOString() : FOREVER;
		storage().setItem(storageKey, storageValue);
	};

	/**
	 * A function to check if the popup is dismissed.
	 */
	export const isDismissed = () => dismissed;

	onMount(() => {
		// Check if previously dismissed
		dismissed = checkIfDismissed(storage().getItem(storageKey));
		if (dismissed) {
			return;
		}

		// Clear the storage
		storage().removeItem(storageKey);

		// Show after timeout
		const timer = setTimeout(() => (open = true), timeout);

		// Maybe close on navigation
		let navUnsubscribe: () => void;
		if (closeOnNav) {
			navUnsubscribe = navigating.subscribe((nav) => {
				if (nav) {
					open = false;
				}
			});
		}

		return () => {
			clearTimeout(timer);
			navUnsubscribe?.();
		};
	});
</script>

{#if open}
	<!--@docs
##### Slot props

-   readonly `close` (`() => void`): A function to close the popup.
	-->
	<slot {close} {dismiss} {dismissed} />
{/if}
