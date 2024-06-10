<!--@docs
Renders a HTML link (anchor).
It will apply the `noopener noreferrer` rel attribute to external links.
It will also apply the `_blank` target attribute to them.

Warns in dev when not url is provided.

### Example

@exec Example.svelte
```svelte
<HtmlLink href="https://deuxhuithuit.com">
	This is my link
</HtmlLink>
```
-->
<script lang="ts">
	import { isExternalUrl } from '$lib/utils/url/isExternalUrl';
	//#if dev
	import MissingAttributes from '$lib/components/dev/MissingAttributes.svelte';
	///if

	export let href: Maybe<string>;
	export let rel: Maybe<string> = null;
	export let target: Maybe<string> = null;

	const isExternal = href && isExternalUrl(href);
</script>

{#if href}
	<a
		{href}
		rel={isExternal ? 'noopener noreferrer' : rel}
		target={target || isExternal ? '_blank' : null}
		{...$$restProps}
	>
		<slot external={isExternal} {href} />
	</a>
	<!--#if dev-->
{:else}
	<MissingAttributes component="HtmlLink" attributes="href" />
	<!--/if-->
{/if}
