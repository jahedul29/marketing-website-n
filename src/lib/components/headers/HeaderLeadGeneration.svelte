<script lang="ts">
	import type { Assets_Asset, Buttons_Default_Entry } from 'src/craft';
	import { page } from '$app/stores';
	import { forceExecuteScript } from '$lib/actions/forceExecuteScript';
	import { mounted } from '$lib/stores/mounted';
	import { SIZES_FULL_MOBILE_HALF_DESKTOP } from '$lib/utils/ui/imageSizes';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import LeadGenerationForm from '$com/forms/LeadGenerationForm.svelte';
	import TitleLines from '$com/svg/TitleLines.svelte';
	import DefaultVideoEmbed from '$com/ui/DefaultVideoEmbed.svelte';
	import Media from '$com/ui/Media.svelte';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';

	export let surtitle: Maybe<string> = null;
	export let displayTitle: Maybe<string> = null;
	export let plainText: Maybe<string> = null;
	export let buttons: Maybe<Buttons_Default_Entry>[] = [];
	export let color: Maybe<string> = null;
	export let hubspotFormId: Maybe<string> = null;
	export let embedCode: Maybe<string> = null;
	export let label: Maybe<string> = null;
	export let media: Maybe<Assets_Asset> = null;
	export let fullHeightMedia: Maybe<boolean> = false;
	export let embedVideoUrl: Maybe<string> = null;
	export let logosTitle: Maybe<string> = null;
	export let logos: Maybe<Assets_Asset>[] = [];

	$: entry = $page.data?.entry;
</script>

{#if !entry?.simplified}
	<section
		class="mx-auto grid gap-32 px-20 py-60 bp:grid-cols-2 bp:items-start bp:p-120"
		class:relative={fullHeightMedia}
		data-theme-color={color || 'white'}
	>
		<div class="_intro-reveal-sm flex flex-col items-start bp:max-w-800" style="--section: 2;">
			{#if surtitle}
				<p
					class="text-100 mb-16 rounded-full bg-wheat-500 px-8 py-4 font-medium leading-10 text-wheat-700"
				>
					{surtitle}
				</p>
			{/if}
			{#if displayTitle}
				<h1 class="text-900 font-medium leading-10">{displayTitle}<TitleLines /></h1>
			{/if}
			{#if plainText}
				<p class="text-300 mt-32 text-black-750-alpha bp:max-w-700">{plainText}</p>
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
			<div class="mt-48 w-full max-w-500">
				{#if hubspotFormId}
					<LeadGenerationForm {hubspotFormId} grey />
				{:else if embedCode && $mounted}
					<div use:forceExecuteScript>
						{@html embedCode}
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
		{#if media}
			<div
				class="_intro-reveal-sm grid w-full overflow-hidden rounded-8 grid-stack {fullHeightMedia
					? 'bp:absolute bp:right-0 bp:top-0 bp:h-full bp:w-1/2 bp:rounded-0'
					: 'aspect-[16/9] bp:rounded-20'}"
				style="--section: 3;"
			>
				{#if embedVideoUrl}
					<div class="flex h-full w-full items-center justify-center">
						<DefaultVideoEmbed url={embedVideoUrl} {label} poster={media} />
					</div>
				{:else}
					<Media
						class="_intro-img-scale-down h-full w-full object-cover"
						{media}
						sizes={SIZES_FULL_MOBILE_HALF_DESKTOP}
					/>
				{/if}
			</div>
		{/if}
	</section>
{/if}
