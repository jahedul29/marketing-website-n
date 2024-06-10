<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/translations/global';
	import ContentBlocks from '$com/articles/ContentBlocks.svelte';
	import RelatedContent from '$com/articles/RelatedContent.svelte';
	import CardCustomerStories from '$com/cards/CardCustomerStories.svelte';
	import HeaderCustomStories from '$com/headers/HeaderCustomStories.svelte';

	export let data: PageData;

	const { entry, relatedStories } = data || {};
	const { displayTitle, readTime, embedUrl, contentBlocks, projectInfo } = entry || {};
	const logo = entry?.logo?.[0];
	const media = entry?.media?.[0];
	const poster = entry?.poster?.[0];
	const thumbnail = entry?.thumbnail?.[0];
</script>

<article>
	<HeaderCustomStories
		title={displayTitle}
		{readTime}
		{logo}
		media={media || thumbnail}
		{embedUrl}
		{poster}
	/>
	<div class="relative bg-white pt-60 bp:pt-120">
		<section
			class="mx-auto grid gap-60 px-20 pb-60 bp:max-w-1120 bp:grid-cols-3 bp:items-start bp:gap-80 bp:pb-120"
		>
			<div>
				{#if projectInfo?.length}
					<dl class="space-y-32">
						{#each projectInfo as info}
							{@const { infoTitle, infoText } = info || {}}
							<div class="space-y-8">
								{#if infoTitle}
									<dt class="text-400 font-medium leading-20">{infoTitle}</dt>
								{/if}
								{#if infoText}
									<dd class="text-300 text-black-750-alpha">{infoText}</dd>
								{/if}
							</div>
						{/each}
					</dl>
				{/if}
			</div>
			<div class="space-y-60 bp:col-span-2 bp:space-y-120">
				<ContentBlocks {contentBlocks} />
			</div>
		</section>
		<RelatedContent title={t('articles.relatedStories')} items={relatedStories} let:item>
			<CardCustomerStories entry={item} />
		</RelatedContent>
	</div>
</article>
