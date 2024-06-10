<script lang="ts">
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import { SIZES_BP } from '$lib/utils/ui/imageSizes';
	import Image from '$com/ui/Image.svelte';
	import ArrowRight from '$com/svg/ArrowRight.svelte';

	export let resource: ResourcesDefault;

	const href = autoUrl(resource);
	const { displayTitle, readTime } = resource || {};
	const image = resource?.thumbnail?.[0];
	const type = resource?.resourceType?.[0];
</script>

<HtmlLink
	class="group relative grid aspect-[3/2] w-full overflow-hidden rounded-16 text-white grid-stack bp:aspect-[7/3] bp:rounded-20"
	{href}
>
	{#if image}
		<Image
			class="_image-scale aspect-[3/4] h-full w-full object-cover bp:aspect-[auto]"
			{image}
			sizes={[{ width: '100vw' }, { mq: SIZES_BP, width: '80vw' }]}
		/>
		<div class="_image-veil" />
		{#if readTime}
			<div class="_read-time-pill">
				{readTime}
			</div>
		{/if}
	{/if}
	<div class="relative flex flex-col p-12 bp:p-20">
		<div class="mt-auto flex items-end justify-between">
			<div class="max-w-3/4 space-y-8">
				{#if type}
					{@const icon = type?.icon?.[0]}
					{@const title = type?.title}
					<div class="mt-48 flex items-center space-x-16">
						{#if icon}
							<Image class="w-16" image={icon} />
						{/if}
						{#if title}
							<div class="text-200">{title}</div>
						{/if}
					</div>
				{/if}
				{#if displayTitle}
					<div class="text-500 font-medium leading-20">{displayTitle}</div>
				{/if}
			</div>
			<div class="w-16">
				<ArrowRight />
			</div>
		</div>
	</div>
</HtmlLink>
