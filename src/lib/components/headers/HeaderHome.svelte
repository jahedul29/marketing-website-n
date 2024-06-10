<script lang="ts">
	import type { Assets_Asset, Buttons_Default_Entry } from 'src/craft';
	import { SIZES_FULL_MOBILE_HALF_DESKTOP } from '$lib/utils/ui/imageSizes';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import TitleLines from '$com/svg/TitleLines.svelte';
	import Media from '$com/ui/Media.svelte';
	import VideoModal from '$com/ui/VideoModal.svelte';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';

	export let displayTitle: Maybe<string> = null;
	export let plainText: Maybe<string> = null;
	export let surtitle: Maybe<string> = null;
	export let buttons: Maybe<Buttons_Default_Entry>[] = [];
	export let logosTitle: Maybe<string> = null;
	export let logos: Maybe<Assets_Asset>[] = [];
	export let media: Maybe<Assets_Asset> = null;
	export let mask: Maybe<Assets_Asset> = null;
	export let embedVideoUrl: Maybe<string> = null;
	export let label: Maybe<string> = null;
	export let showModules = false;
</script>

<div class="rounded-b-32">
	<section class="relative mx-auto max-w-hd pb-60 text-center bp:pb-0 bp:text-left">
		<div
			class="_intro-fade-in relative grid h-300 grid-stack bp:absolute bp:right-0 bp:top-0 bp:h-full bp:w-1/2 bp:-translate-y-64"
			style="--section: 3;"
		>
			{#if media && mask}
				<div class="_image-mask grid grid-stack" style="--mask: url({mask.url});">
					<Media
						class="_intro-img-scale-down h-full w-full object-cover"
						{media}
						sizes={SIZES_FULL_MOBILE_HALF_DESKTOP}
					/>
					<div class="z-10 h-full w-full bg-black-250-alpha" />
				</div>
			{/if}
			{#if embedVideoUrl}
				<VideoModal
					id="hero-modal"
					{embedVideoUrl}
					label={label || undefined}
					transparent
				/>
			{/if}
		</div>
		<div class="pointer-events-none relative px-20 pt-32 bp:px-120 bp:py-112">
			<div
				class="_intro-reveal pointer-events-auto flex flex-col items-center bp:max-w-600 bp:items-start"
				style="--section: 2;"
			>
				{#if surtitle}
					<p class="mb-8 text-16 font-medium leading-10 text-grey-900 bp:mb-24">
						{surtitle}
					</p>
				{/if}
				{#if displayTitle}
					<h1 class="text-900 font-medium leading-10">{displayTitle}<TitleLines /></h1>
				{/if}
				{#if plainText}
					<p class="text-400 mt-12 leading-30 text-black-750-alpha bp:mt-32">
						{plainText}
					</p>
				{/if}
				{#if buttons?.length}
					<div class="mt-32 flex space-x-16">
						{#each buttons as button, i}
							<ButtonPrimary
								{button}
								color="black"
								size="lg"
								type={i === 0 ? 'filled' : 'outlined'}
							/>
						{/each}
					</div>
				{/if}
			</div>
			{#if logos?.length}
				<div
					class="_intro-reveal-sm pointer-events-auto mt-80 bp:max-w-700"
					style="--section: 3;"
				>
					<HeaderLogos {logosTitle} {logos} />
				</div>
			{/if}
		</div>
	</section>
	{#if showModules}
		<section class="relative bp:px-20 bp:pb-20">
			<div class="rounded-24 bg-white py-60 bp:px-20 bp:py-120">
				<slot name="modules" />
			</div>
		</section>
	{/if}
</div>
