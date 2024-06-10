<script lang="ts">
	import type { CustomerStories_Default_Entry } from 'src/craft';
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import { SIZES_BP } from '$lib/utils/ui/imageSizes';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';
	import ArrowRight from '$com/svg/ArrowRight.svelte';

	export let story: CustomerStories_Default_Entry;

	const href = autoUrl(story);
	const { displayTitle } = story || {};
	const image = story?.thumbnail?.[0];
	const logo = story?.logo?.[0];
</script>

<HtmlLink
	class="group relative grid aspect-[3/2] w-full overflow-hidden rounded-16 text-white grid-stack bp:aspect-[7/3] bp:rounded-20"
	{href}
>
	{#if image}
		<div class="grid h-full w-full grid-stack">
			<Image
				class="_image-scale aspect-[3/4] h-full w-full object-cover bp:aspect-[auto]"
				{image}
				sizes={[{ width: '100vw' }, { mq: SIZES_BP, width: '80vw' }]}
			/>
			<div class="_image-veil" />
			{#if logo}
				<div class="relative self-start justify-self-start p-12 bp:p-20">
					<div
						class="flex items-center justify-center rounded-12 bg-grey-900 p-12 bp:min-w-200 bp:rounded-16 bp:py-40"
					>
						<Image class="w-84 bp:w-full" image={logo} />
					</div>
				</div>
			{/if}
		</div>
	{/if}
	<div class="relative flex flex-col p-12 bp:p-20">
		<div class="mt-auto flex items-end justify-between">
			<div class="max-w-3/4 space-y-8">
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
