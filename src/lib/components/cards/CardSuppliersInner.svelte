<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import { getDefaultSliderContext } from '$com/ui/DefaultSlider.svelte';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import Certified from '$com/svg/Certified.svelte';
	import Image from '$com/ui/Image.svelte';

	export let image: Maybe<Assets_Asset> = null;
	export let city: Maybe<string> = null;
	export let label: Maybe<string> = null;
	export let supplierName: Maybe<string> = null;
	export let isCertified: Maybe<boolean> = false;

	const slider = getDefaultSliderContext();
</script>

<div
	class="relative grid aspect-[3/4] w-full rounded-12 text-white grid-stack bp:rounded-20 {slider?.isFirstItem()
		? 'ml-8'
		: ''}"
>
	<div
		class="absolute -inset-[0.4rem] -z-1 rounded-16 bg-white-100-alpha transition-colors duration-300 group-hover:bg-black-100-alpha bp:-inset-[0.8rem] bp:rounded-24"
	/>
	{#if image}
		<div class="grid h-full w-full overflow-hidden rounded-12 grid-stack bp:rounded-20">
			<Image class="_image-scale h-full w-full object-cover" {image} sizes={SIZES_CARD} />
			<div class="_image-veil" />
		</div>
	{/if}
	<div class="relative flex flex-col items-start p-8 bp:p-12">
		{#if city}
			<p
				class="rounded-full bg-white-750-alpha px-8 py-4 text-14 font-medium leading-20 text-grey-900 backdrop-blur-700"
			>
				{city}
			</p>
		{/if}
		<div class="mt-auto space-y-4">
			{#if label}
				<p class="text-14 font-medium leading-20 text-white-900-alpha">
					{label}
				</p>
			{/if}
			{#if supplierName}
				<h3 class="text-20 font-medium leading-10 text-white bp:text-26">
					{supplierName}{#if isCertified}
						<span class="whitespace-nowrap align-middle" aria-hidden="true">
							&nbsp;<span class="inline-flex w-16 bp:w-20">
								<Certified />
							</span>
						</span>
					{/if}
				</h3>
			{/if}
		</div>
	</div>
</div>
