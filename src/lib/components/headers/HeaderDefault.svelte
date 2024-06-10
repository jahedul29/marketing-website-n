<script lang="ts">
	import type { Assets_Asset, Bubbles_Bubble_BlockType, Buttons_Default_Entry } from 'src/craft';
	import { page } from '$app/stores';
	import { SIZES_FULL_MOBILE_HALF_DESKTOP } from '$lib/utils/ui/imageSizes';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import Bubbles from '$com/ui/Bubbles.svelte';
	import TitleLines from '$com/svg/TitleLines.svelte';
	import Image from '$com/ui/Image.svelte';
	import LeadGenerationForm from '$com/forms/LeadGenerationForm.svelte';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';

	export let displayTitle: Maybe<string> = null;
	export let plainText: Maybe<string> = null;
	export let surtitle: Maybe<string> = null;
	export let buttons: Maybe<Buttons_Default_Entry>[] = [];
	export let bubbles: Maybe<Bubbles_Bubble_BlockType>[] = [];
	export let image: Maybe<Assets_Asset> = null;
	export let mask: Maybe<Assets_Asset> = null;
	export let color: Maybe<string> = null;
	export let showModules = false;
	export let hubspotFormId: Maybe<string> = null;
	export let logosTitle: Maybe<string> = null;
	export let logos: Maybe<Assets_Asset>[] = [];

	$: entry = $page.data?.entry;
</script>

<div class="rounded-b-32" data-theme-color={color || ''}>
	{#if !entry?.simplified}
		<section class="relative mx-auto max-w-hd pb-60 text-center bp:pb-0 bp:text-left">
			<div
				class="relative grid h-300 grid-stack bp:absolute bp:right-0 bp:top-0 bp:h-full bp:w-1/2 bp:-translate-y-64"
			>
				{#if image && mask}
					<div
						class="_image-mask _intro-fade-in"
						style="--section: 3; --mask: url({mask.url});"
					>
						<Image
							class="_intro-img-scale-down h-full w-full object-cover bp:h-full"
							{image}
							sizes={SIZES_FULL_MOBILE_HALF_DESKTOP}
						/>
					</div>
				{/if}
				{#if bubbles?.length}
					<Bubbles {bubbles} />
				{/if}
			</div>
			<div class="relative px-20 pt-32 bp:px-120 bp:py-112">
				<div
					class="_intro-reveal flex flex-col items-center bp:max-w-600 bp:items-start"
					style="--section: 2;"
				>
					{#if surtitle}
						<p
							class="mb-8 text-16 font-medium leading-10 bp:mb-24 {color
								? 'text-grey-900'
								: 'text-blue-500'}"
						>
							{surtitle}
						</p>
					{/if}
					{#if displayTitle}
						<h1 class="text-900 font-medium leading-10">
							{displayTitle}<TitleLines />
						</h1>
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
					{#if hubspotFormId}
						<div class="_intro-reveal-sm mt-60 w-full max-w-500" style="--section: 3;">
							<LeadGenerationForm {hubspotFormId} grey />
						</div>
					{/if}
					{#if logos?.length}
						<div
							class="_intro-reveal-sm pointer-events-auto mt-80 bp:max-w-700"
							style="--section: 3;"
						>
							<HeaderLogos {logosTitle} {logos} />
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}
	{#if showModules}
		<section class="relative bp:px-20 bp:pb-20">
			<div class="rounded-24 bg-white py-60 bp:px-20 bp:py-120">
				<slot name="modules" />
			</div>
		</section>
	{/if}
</div>
