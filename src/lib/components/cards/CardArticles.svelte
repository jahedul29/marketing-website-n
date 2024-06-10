<script lang="ts">
	import type { Articles_Default_Entry } from 'src/craft';
	import { t } from '$lib/translations/global';
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import ArrowLinkInner from '$com/buttons/ArrowLinkInner.svelte';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';

	export let entry: Articles_Default_Entry;

	const href = autoUrl(entry);
	const image = entry?.thumbnail?.[0];
	const title = entry?.displayTitle;
	const text = entry?.excerpt;
	const readTime = entry?.readTime;
</script>

<HtmlLink class="group flex w-full flex-col items-start space-y-20 rounded-16 bp:rounded-20" {href}>
	{#if image}
		<div class="relative aspect-[4/3] w-full overflow-hidden rounded-16 bp:rounded-20">
			<Image class="_image-scale h-full w-full object-cover" {image} sizes={SIZES_CARD} />
			{#if readTime}
				<div class="_read-time-pill">
					{readTime}
				</div>
			{/if}
		</div>
	{/if}
	{#if title}
		<div class="text-400 font-medium leading-20">
			{title}
		</div>
	{/if}
	{#if text}
		<div class="line-clamp-3 w-full text-ellipsis text-16 leading-30 text-black-750-alpha">
			{text}
		</div>
	{/if}
	<div>
		<ArrowLinkInner label={t('cards.readArticle')} />
	</div>
</HtmlLink>
