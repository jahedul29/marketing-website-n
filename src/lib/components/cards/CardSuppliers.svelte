<script lang="ts">
	import type { Suppliers_Default_Entry } from 'src/craft';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import CardSuppliersInner from './CardSuppliersInner.svelte';

	export let entry: Suppliers_Default_Entry;
	export let disableLink = false;

	const { externalUrl, supplierName, isCertified } = entry || {};
	const image = entry?.image?.[0];
	const city = entry?.city?.[0]?.title;
	const label = entry?.activityArea?.[0]?.title;
</script>

{#if disableLink}
	<CardSuppliersInner {image} {city} {label} {supplierName} {isCertified} />
{:else}
	<HtmlLink href={externalUrl || null} class="group flex h-full w-full">
		<CardSuppliersInner {image} {city} {label} {supplierName} {isCertified} />
	</HtmlLink>
{/if}
