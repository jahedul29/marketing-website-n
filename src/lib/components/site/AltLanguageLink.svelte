<script lang="ts">
	import { page } from '$app/stores';
	import { SUPPORTED_LANGUAGES } from '$lib/constants';
	import { autoUrl } from '$lib/utils/url/autoUrl';

	//#if dev
	import MissingAttributes from '$lib/components/dev/MissingAttributes.svelte';
	///if

	let classes = '';
	export { classes as class };

	const altLangs = SUPPORTED_LANGUAGES.filter((lang) => lang !== $page.data?.language);
	$: altEntries = $page.data.entry?.localized || [];
</script>

{#each altEntries as altEntry (altEntry.id)}
	{@const href = autoUrl(altEntry) || `/${altEntry.language}`}
	<a class={classes} {href} rel="alternate external" hreflang={altEntry.language}>
		<slot {altEntry} language={altEntry.language}>
			{altEntry.language}
		</slot>
	</a>
{:else}
	<!-- No alt entries found, fallback to altLangs -->
	{#each altLangs as altLang}
		<a class={classes} href="/{altLang}" rel="alternate external" hreflang={altLang}>
			<slot language={altLang}>
				{altLang}
			</slot>
		</a>
	{/each}
{/each}
<!--#if dev-->
{#if !altEntries.length}
	<MissingAttributes component="AltLanguageLink" attributes="altEntries" />
{/if}
<!--/if-->
