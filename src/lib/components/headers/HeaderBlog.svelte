<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import { SIZES_FULL_MOBILE_HALF_DESKTOP } from '$lib/utils/ui/imageSizes';
	import Image from '$com/ui/Image.svelte';

	export let surtitle: Maybe<string> = null;
	export let displayTitle: Maybe<string> = null;
	export let plainText: Maybe<string> = null;
	export let image: Maybe<Assets_Asset> = null;
	export let mask: Maybe<Assets_Asset> = null;
	export let color: Maybe<string> = null;
</script>

<section class="px-20">
	<div
		class="_intro-fade-in relative overflow-hidden rounded-16 bp:rounded-24"
		data-theme-color={color || ''}
		style="--section: 0;"
	>
		{#if image && mask}
			<div
				class="_image-mask _intro-fade-in h-320 bp:absolute bp:right-0 bp:top-0 bp:h-full bp:w-1/2"
				style="--section: 2; --mask: url({mask.url});"
			>
				<Image
					class="_intro-img-scale-down h-full w-full object-cover"
					{image}
					sizes={SIZES_FULL_MOBILE_HALF_DESKTOP}
				/>
			</div>
		{/if}
		<div class="relative flex flex-col items-start p-20 bp:max-w-700 bp:p-100">
			<div class="_intro-reveal-sm" style="--section: 1;">
				<slot name="surtitle">
					{#if surtitle}
						<p class="mb-8 text-16 font-medium leading-10">
							{surtitle}
						</p>
					{/if}
				</slot>
				{#if displayTitle}
					<h1 class="text-900 font-medium leading-10">{displayTitle}</h1>
				{/if}
			</div>
			{#if plainText}
				<p
					class="text-300 _intro-reveal-sm mt-32 leading-30 text-black-750-alpha"
					style="--section: 2;"
				>
					{plainText}
				</p>
			{/if}
		</div>
	</div>
</section>

<style lang="postcss">
	._image-mask {
		mask-image: var(--mask);
		mask-repeat: no-repeat;
		mask-size: 150%;
		mask-position: 20% 100%;

		@screen bp {
			mask-position: -10% 80%;
		}
	}
</style>
