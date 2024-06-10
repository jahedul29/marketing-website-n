<script lang="ts">
	import type { Offices_Office_BlockType } from 'src/craft';
	import { t } from '$lib/translations/global';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';
	import ArrowLinkInner from '$com/buttons/ArrowLinkInner.svelte';

	export let entry: Maybe<Offices_Office_BlockType>;

	const image = entry?.image?.[0];
	const city = entry?.city;
	const address = entry?.address;
	const mapsUrl = entry?.googleMapsUrl;
	const mapsLabel = entry?.googleMapsLabel || t('contact.googleMapsLabel');
</script>

{#if mapsUrl}
	<HtmlLink href={mapsUrl} class="group grid grid-cols-3 gap-20 bp:grid-cols-1">
		{#if image}
			<div class="aspect-1 overflow-hidden rounded-16 bp:rounded-24">
				<Image {image} class="_image-scale h-full w-full object-cover" sizes={SIZES_CARD} />
			</div>
		{/if}
		<div class="col-span-2 flex h-full flex-col items-start">
			{#if city}
				<h3 class="text-500 font-medium leading-10">{city}</h3>
			{/if}
			{#if address}
				<address
					class="text-200 mb-auto mt-8 font-medium leading-20 text-black-750-alpha bp:mt-16"
				>
					{address}
				</address>
			{/if}

			<div class="mt-16 bp:mt-32">
				<ArrowLinkInner label={mapsLabel} />
			</div>
		</div>
	</HtmlLink>
{/if}
