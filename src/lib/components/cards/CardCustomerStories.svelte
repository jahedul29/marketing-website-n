<script lang="ts">
	import type { CustomerStories_Default_Entry } from 'src/craft';
	import { t } from '$lib/translations/global';
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import ArrowLinkInner from '$com/buttons/ArrowLinkInner.svelte';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';

	export let entry: CustomerStories_Default_Entry;

	const href = autoUrl(entry);
	const image = entry?.thumbnail?.[0];
	const logo = entry?.logo?.[0];
	const title = entry?.displayTitle;
</script>

<HtmlLink class="group flex flex-col items-start space-y-20 rounded-20" {href}>
	{#if image}
		<div class="grid h-252 w-full overflow-hidden rounded-20 grid-stack">
			<Image class="_image-scale h-full w-full object-cover" {image} />
			{#if logo}
				<div class="relative self-end justify-self-start p-12">
					<div class="rounded-16 bg-grey-900 p-16">
						<Image class="w-84" image={logo} sizes={SIZES_CARD} />
					</div>
				</div>
			{/if}
		</div>
	{/if}
	{#if title}
		<div class="text-400 font-medium leading-20">
			{title}
		</div>
	{/if}
	<div>
		<ArrowLinkInner label={t('cards.readStory')} />
	</div>
</HtmlLink>
