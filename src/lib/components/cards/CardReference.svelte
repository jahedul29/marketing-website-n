<script lang="ts">
	import type { References_Reference_BlockType } from 'src/craft';
	import { t } from '$lib/translations/global';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';
	import ArrowLinkInner from '$com/buttons/ArrowLinkInner.svelte';

	export let entry: Maybe<References_Reference_BlockType>;

	const logo = entry?.logo?.[0];
	const title = entry?.displayTitle;
	const href = entry?.externalUrl;
	const label = entry?.label || t('cards.readArticle');
</script>

{#if href}
	<HtmlLink
		{href}
		class="group flex h-full flex-col items-start rounded-24 border-1 border-black-250-alpha p-24 bp:p-32"
	>
		{#if logo}
			<Image image={logo} class="w-1/2" sizes={[{ width: '10rem' }]} />
		{/if}
		{#if title}
			<h3 class="text-400 mb-32 mt-24 font-medium leading-20 bp:mb-40">{title}</h3>
		{/if}
		<div class="mt-auto">
			<ArrowLinkInner {label} />
		</div>
	</HtmlLink>
{/if}
