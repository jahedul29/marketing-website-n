<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import { t } from '$lib/translations/global';
	import DefaultVideo from '$com/ui/DefaultVideo.svelte';
	import DefaultVideoEmbed from '$com/ui/DefaultVideoEmbed.svelte';
	import Image from '$com/ui/Image.svelte';

	interface $$Slots {
		category: Record<string, never>;
	}

	export let readTime: Maybe<string> = null;
	export let title: Maybe<string> = null;
	export let logo: Maybe<Assets_Asset> = null;
	export let media: Maybe<Assets_Asset> = null;
	export let embedUrl: Maybe<string> = null;
	export let poster: Maybe<Assets_Asset> = null;
</script>

<section class="bp:px-20 pointer:sticky pointer:top-64">
	<div class="rounded-t-16 bg-grey-900 text-white bp:rounded-t-20">
		<div class="flex flex-col items-center p-40 pb-52 text-center bp:p-100">
			<p
				class="text-300 flex flex-col items-center space-y-8 font-medium leading-10 bp:flex-row bp:space-y-0"
			>
				<span>{t('articles.customerStory')}</span>
				{#if readTime}
					<span class="hidden bp:inline">&nbsp;&bull;&nbsp;</span>
					<span class="opacity-70">
						{readTime}&nbsp;{t('articles.readTimeLabel')}
					</span>
				{/if}
			</p>
			{#if title}
				<h1 class="text-800 mt-20 font-medium leading-10 bp:max-w-900">{title}</h1>
			{/if}
			{#if logo}
				<div class="mt-40 bp:mt-80">
					<Image image={logo} sizes={[{ width: '10rem' }]} />
				</div>
			{/if}
		</div>
	</div>
</section>
{#if embedUrl || media}
	<div class="relative bg-white bp:px-20">
		<div class="rounded-b-16 bg-grey-900 bp:rounded-b-20">
			<div
				class="relative aspect-[3/2] overflow-hidden rounded-16 bp:aspect-[7/3] bp:rounded-20"
			>
				{#if embedUrl}
					<DefaultVideoEmbed url={embedUrl} {poster} />
				{:else if media?.kind === 'video'}
					<DefaultVideo {media} {poster} />
				{:else if media?.kind === 'image'}
					<Image
						class="h-full w-full rounded-16 object-cover bp:rounded-20"
						image={media}
					/>
				{/if}
			</div>
		</div>
	</div>
{/if}
