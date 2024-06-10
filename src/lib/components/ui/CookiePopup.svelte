<!--@docs
A cookie popup behavior component. Provides `accept` and `deny` methods to deal with the user's choice.

**This file is not meant to be changed**: You should edit the `SiteCookiePopup.svelte` file instead.

@exec CookiePopup.svelte

```svelte
<CookiePopup key="my-project-cookie-banner" gtmConsentEvent="consent" timeout={500} let:accept let:deny>
	<div>
		<p>
			This site uses cookies
		</p>
		<button on:click={deny}>
			Deny
		</button>
		<button on:click={accept}>
			Accept
		</button>
	</div>
</CookiePopup>
```
-->
<script lang="ts">
	import Dismissable from '$com/ui/Dismissable.svelte';
	import { onMount } from 'svelte';

	/**
	 * The consent event pushed to the dataLayer when the user accepts cookies
	 */
	export let gtmConsentEvent: string;
	/**
	 * The storage key used to persist the popup dismissal. Default: 'cookie-popup'
	 */
	export let key = 'cookie-popup';
	/**
	 * How long the cookie popup should take to re-appear when dismissed.
	 * Default: 30 days
	 */
	export let maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
	/**
	 * How long the popup should take to show up on the page
	 * Default: 0
	 */
	export let timeout = 0;

	let dismiss: () => void;
	let isDismissed: () => boolean;

	const pushConsent = () => {
		if (window.dataLayer && gtmConsentEvent) {
			window.dataLayer.push({ event: gtmConsentEvent });
		}
	};

	const accept = () => {
		pushConsent();
		dismiss();
	};

	onMount(() => {
		// Send consent if the popup is already dismissed
		if (isDismissed()) {
			pushConsent();
		}
	});
</script>

<Dismissable {key} {maxAge} {timeout} let:close bind:dismiss bind:isDismissed>
	<!--@docs
	#### Slot props

	- readonly `accept` (`() => void`): The function to call when the user accepts cookies
	- readonly `deny` (`() => void`): The function to call when the user denies cookies
	-->
	<slot {accept} deny={close} />
</Dismissable>
