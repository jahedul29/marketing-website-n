# Error page

If a page entry is not found, the `+error.svelte` component is used Sveltekit to render a 404 page.

In dev mode, it will show the status code, error message and error stack for easier debugging.

To customize the site's error page, you can write any markup you need in the `<!--:else}-->` clause
of the template.

```svelte
<!--#when dev-->
<div class="mx-auto xs:max-w-320">
	<h1 class="text-90">{status}</h1>
	<h2 class="text-70">{error.message}</h2>

	{#if error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>
<!--:else-->
<!-- Customized 404 page markup goes here -->
<h1>404 Page not found</h1>
<!--/when-->
```
