<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/translations/global';
	import ContentBlocks from '$com/articles/ContentBlocks.svelte';
	import HeaderArticle from '$com/headers/HeaderArticle.svelte';
	import ShareSection from '$com/blog/ShareSection.svelte';
	import ArticleCta from '$com/articles/ArticleCta.svelte';
	import RelatedContent from '$com/articles/RelatedContent.svelte';
	import CardArticles from '$com/cards/CardArticles.svelte';

	export let data: PageData;

	const { entry, defaultCta, relatedArticles } = data || {};
	const { displayTitle, readTime, blogAuthor, postDate, embedUrl } = entry || {};
	const media = entry?.media?.[0];
	const thumbnail = entry?.thumbnail?.[0];
	const poster = entry?.poster?.[0];
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
	/>
	<div class="relative bg-white pt-60 bp:pt-120">
		<section
			class="mx-auto grid gap-60 px-20 pb-60 bp:max-w-1120 bp:grid-cols-3 bp:items-start bp:gap-80 bp:pb-120"
		>
			<div class="space-y-60 bp:col-span-2">
				<ContentBlocks {contentBlocks} />
				<ShareSection type="article" />
			</div>
			<ArticleCta entry={articleCta} />
		</section>
		<RelatedContent title={t('articles.relatedArticles')} items={relatedArticles} let:item>
			<CardArticles entry={item} />
		</RelatedContent>
	</div>
</article>
