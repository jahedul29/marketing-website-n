<script lang="ts">
	import { page } from '$app/stores';
	import { isProduction } from '$lib/env-public';
	import { getEntryUrl } from '$lib/utils/url/getEntryUrl';
	import { t } from '$lib/translations/global';

	const config = $page.data.config;
	const org = config?.organization?.[0];
	const seo = config?.seo?.[0];
	const twitterHandle = config?.twitterHandle;
	const orgName = org?.organizationName;

	$: entry = $page.data.entry || null;
	$: altEntries = entry?.localized;
	$: pageTitle = $page.error
		? t('error', { status: $page.status })
		: entry?.seo?.[0]?.shareTitle || entry?.title || seo?.shareTitle || '';
	$: title = `${pageTitle}${orgName ? ` | ${orgName}` : ''}`;
	$: description = entry?.seo?.[0]?.shareDescription || seo?.shareDescription;
	$: image = entry?.seo?.[0]?.shareImage?.[0] || seo?.shareImage?.[0];
	$: imageUrl = image?.url;
	$: imageWidth = image?.width;
	$: imageHeight = image?.height;
	$: noIndex = entry?.seo?.[0]?.noIndex;
	$: entryUrl = getEntryUrl(entry).toAbsolute();
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
		<meta name="title" content={title} />
		<meta property="og:title" content={title} />
		<meta name="twitter:title" content={title} />
	{/if}
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta name="twitter:image" content={imageUrl} />
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
	{#if imageWidth}
		<meta property="og:image:width" content={`${imageWidth}`} />
	{/if}
	{#if imageHeight}
		<meta property="og:image:height" content={`${imageHeight}`} />
	{/if}
	<meta property="og:type" content="website" />

	{#if twitterHandle}
		<meta name="twitter:site" content="@{twitterHandle}" />
	{/if}
	{#if entryUrl}
		<meta property="og:url" content={entryUrl} />
		<link rel="canonical" href={entryUrl} />
	{/if}
	{#if altEntries?.length}
		<link rel="alternate" href={entryUrl} hreflang={entry?.language} />
		{#each altEntries as altEntry}
			{@const href = getEntryUrl(altEntry).toAbsolute()}
			<link rel="alternate" {href} hreflang={altEntry.language} />
		{/each}
	{/if}
	{#if !isProduction() || noIndex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>
