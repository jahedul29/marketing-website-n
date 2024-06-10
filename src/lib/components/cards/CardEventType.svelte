<script lang="ts">
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import ArrowRight from '$com/svg/ArrowRight.svelte';
	import Image from '$com/ui/Image.svelte';
	import { autoUrl } from '$lib/utils/url/autoUrl';

	export let entry: PagesDefault;

	const title = entry?.surtitle;
	const image = entry?.image?.[0];
	const href = autoUrl(entry);
</script>

<HtmlLink {href} class="group grid overflow-hidden rounded-20 grid-stack">
	{#if image}
		<Image
			class="_image-scale aspect-[10/7] h-full w-full object-cover"
			{image}
			sizes={[{ width: '30rem' }]}
		/>
	{/if}
	{#if title}
		<div class="_image-veil flex items-end justify-between space-x-8 px-20 py-12 text-white">
			<div class="text-300 font-medium leading-10">{title}</div>
			<div>
				<ArrowRight />
			</div>
		</div>
	{/if}
</HtmlLink>
