<script lang="ts">
	import type { Assets_Asset, People_Authors_Entry } from 'src/craft';
	import { t } from '$lib/translations/global';
	import ArticleShares from '$com/blog/ArticleShares.svelte';
	import DefaultVideo from '$com/ui/DefaultVideo.svelte';
	import DefaultVideoEmbed from '$com/ui/DefaultVideoEmbed.svelte';
	import Image from '$com/ui/Image.svelte';
	import Time from '$com/ui/Time.svelte';

	interface $$Slots {
		category: Record<string, never>;
	}

	export let surtitle: string;
	export let readTime: Maybe<string> = null;
	export let title: Maybe<string> = null;
	export let author: Maybe<People_Authors_Entry> = null;
	export let media: Maybe<Assets_Asset> = null;
	export let embedUrl: Maybe<string> = null;
	export let poster: Maybe<Assets_Asset> = null;
	export let postDate: Maybe<string> = null;
	export let dark = false;
</script>

<section class="bp:px-20 pointer:sticky pointer:top-64">
	<div
		class="flex flex-col items-center rounded-t-16 p-40 pb-52 text-center bp:items-start bp:rounded-t-20 bp:p-100 bp:text-left {dark
			? 'bg-grey-900 text-white'
			: 'bg-grey-100'}"
		style="--section: 2;"
	>
		<div
			class="_intro-reveal-sm mb-20 flex w-full flex-col items-center space-y-20 bp:mb-60 bp:flex-row bp:justify-between bp:space-y-0"
		>
			<div class="bp:hidden">
				<slot name="category" />
			</div>
			<p
				class="text-300 flex flex-col items-center space-y-8 font-medium leading-10 bp:flex-row bp:space-y-0"
			>
				<span>{surtitle}</span>
				{#if readTime}
					<span class="hidden bp:inline">&nbsp;&bull;&nbsp;</span>
					<span class="opacity-70">
						{readTime}&nbsp;{t('articles.readTimeLabel')}
					</span>
				{/if}
			</p>
			<div class="hidden bp:block">
				<slot name="category" />
			</div>
		</div>
		{#if title}
			<h1 class="text-900 _intro-reveal-sm font-medium leading-10 bp:max-w-900">
				{title}
			</h1>
		{/if}
		<div
			class="_intro-reveal-sm mt-40 flex w-full flex-col items-center space-y-32 bp:flex-row bp:items-end bp:justify-between bp:space-y-0"
		>
			<div
				class="text-300 flex flex-col items-center space-y-16 font-medium bp:flex-row bp:space-x-16 bp:space-y-0"
			>
				{#if author}
					{#if author.image?.[0]}
						<Image
							class="h-64 w-64 rounded-full border-4 border-white object-cover"
							image={author.image[0]}
						/>
					{/if}
					<div>
						<p>
							<span>
								{author.firstName}&nbsp;{author.lastName}
							</span>
						</p>
						{#if postDate}
							<p class="opacity-70">
								{t('articles.writtenOn')}
								<Time date={new Date(postDate)} />
							</p>
						{/if}
					</div>
				{/if}
			</div>
			<div class="_intro-reveal-sm" style="--section: 3;">
				<ArticleShares {dark} />
			</div>
		</div>
	</div>
</section>
{#if embedUrl || media}
	<div class="relative bg-white bp:px-20">
		<div class="{dark ? 'bg-grey-900' : 'bg-grey-100'} rounded-b-16 bp:rounded-b-20">
			<div class="relative aspect-[3/2] bp:aspect-[7/3]">
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
