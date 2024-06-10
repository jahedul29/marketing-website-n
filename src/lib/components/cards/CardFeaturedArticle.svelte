<script lang="ts">
	import type { Articles_Default_Entry } from 'src/craft';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import { SIZES_BP } from '$lib/utils/ui/imageSizes';
	import Image from '$com/ui/Image.svelte';
	import ArrowRight from '$com/svg/ArrowRight.svelte';

	export let article: Articles_Default_Entry;

	const href = autoUrl(article);
	const { displayTitle, excerpt, readTime } = article || {};
	const image = article?.thumbnail?.[0];
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
			<div class="space-y-8 bp:max-w-3/4">
				{#if displayTitle}
					<div class="text-500 font-medium leading-20">{displayTitle}</div>
				{/if}
				{#if excerpt}
					<div class="text-14 font-medium leading-20 bp:text-16">{excerpt}</div>
				{/if}
			</div>
			<div class="w-16">
				<ArrowRight />
			</div>
		</div>
	</div>
</HtmlLink>
