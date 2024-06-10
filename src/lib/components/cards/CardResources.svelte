<script lang="ts">
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';

	export let entry: ResourcesDefault;

	const href = autoUrl(entry);
	const image = entry?.thumbnail?.[0];
	const title = entry?.displayTitle;
	const type = entry?.resourceType?.[0];
	const readTime = entry?.readTime;
</script>

<HtmlLink class="group flex w-full flex-col rounded-16 bg-grey-900 text-white bp:rounded-20" {href}>
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
	<div class="flex flex-grow flex-col p-20">
		{#if title}
			<div class="text-400 mb-auto font-medium leading-20">
				{title}
			</div>
		{/if}
		{#if type}
			{@const icon = type?.icon?.[0]}
			{@const title = type?.title}
			<div class="mt-48 flex items-center space-x-12">
				{#if icon}
					<Image class="h-20 w-20" image={icon} />
				{/if}
				{#if title}
					<div class="text-200">{title}</div>
				{/if}
			</div>
		{/if}
	</div>
</HtmlLink>
