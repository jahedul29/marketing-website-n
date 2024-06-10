<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/translations/global';
	import ContentBlocks from '$com/articles/ContentBlocks.svelte';
	import HeaderArticle from '$com/headers/HeaderArticle.svelte';
	import ShareSection from '$com/blog/ShareSection.svelte';
	import Image from '$com/ui/Image.svelte';
	import ArticleCta from '$com/articles/ArticleCta.svelte';
	import RelatedContent from '$com/articles/RelatedContent.svelte';
	import CardResources from '$com/cards/CardResources.svelte';

	export let data: PageData;

	const { entry, defaultCta, relatedResources } = data || {};
	const { displayTitle, readTime, blogAuthor, postDate, embedUrl } = entry || {};
	const media = entry?.media?.[0];
	const thumbnail = entry?.thumbnail?.[0];
	const poster = entry?.poster?.[0];
	const type = entry?.resourceType?.[0];
	const contentBlocks = entry?.contentBlocks;
	const articleCta = entry?.articleCta?.[0] || defaultCta?.articleCta?.[0];
</script>

<article>
	<HeaderArticle
		surtitle={t('articles.blogArticle')}
		title={displayTitle}
		{readTime}
		author={blogAuthor?.[0]}
		{postDate}
		media={media || thumbnail}
		{embedUrl}
		{poster}
		dark
	>
		<svelte:fragment slot="category">
			{#if type}
				{@const icon = type?.icon?.[0]}
				{@const title = type?.title}
				<p class="flex items-center space-x-16">
					{#if icon}
						<Image class="w-16" image={icon} />
					{/if}
					{#if title}
						<span class="text-200">{title}</span>
					{/if}
				</p>
			{/if}
		</svelte:fragment>
	</HeaderArticle>
	<div class="relative bg-white pt-60 bp:pt-120">
		<section
			class="mx-auto grid gap-60 px-20 pb-60 bp:max-w-1120 bp:grid-cols-3 bp:items-start bp:gap-80 bp:pb-120"
		>
			<div class="space-y-60 bp:col-span-2 bp:space-y-120">
				<ContentBlocks {contentBlocks} />
				<ShareSection type="resource" />
			</div>
			<ArticleCta entry={articleCta} />
		</section>
		<RelatedContent title={t('articles.relatedResources')} items={relatedResources} let:item>
			<CardResources entry={item} />
		</RelatedContent>
	</div>
</article>
