<script lang="ts">
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { t } from '$lib/translations/global';
	import ArticleCategoriesSlider from '$com/blog/ArticleCategoriesSlider.svelte';
	import HeaderBlog from '$com/headers/HeaderBlog.svelte';
	import CardFeaturedArticle from '$com/cards/CardFeaturedArticle.svelte';
	import DefaultPagination from '$com/pagination/DefaultPagination.svelte';
	import CardArticles from '$com/cards/CardArticles.svelte';
	import DefaultPaginationFilter from '$com/pagination/DefaultPaginationFilter.svelte';
	import FeaturedGrid from '$com/blog/FeaturedGrid.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';

	export let data: PageData;

	const { entry, categories, cities, roles, industries } = data || {};
	const { surtitle, displayTitle, plainText, color, featuredArticles, modules } = entry || {};
	const image = entry?.image?.[0];
	const mask = entry?.blogMask?.[0];

	setContext('theme-color', color);
</script>

<DefaultRythm>
	<HeaderBlog {surtitle} {displayTitle} {plainText} {color} {image} {mask} />
	<ArticleCategoriesSlider {categories} />
	{#if featuredArticles?.length}
		<FeaturedGrid
			title={t(
				featuredArticles.length > 1 ? 'blog.featuredArticles' : 'blog.featuredArticle'
			)}
		>
			{#each featuredArticles as article}
				<CardFeaturedArticle {article} />
			{/each}
		</FeaturedGrid>
	{/if}
	<DefaultPagination itemType="articles" title={t('blog.allArticles')}>
		<svelte:fragment slot="item" let:item>
			{#if item.__typename === 'articles_default_Entry'}
				<CardArticles entry={item} />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="filters">
			<DefaultPaginationFilter
				name="city"
				defaultLabel={t('blog.filters.allCities')}
				options={cities}
			/>
			<DefaultPaginationFilter
				name="industry"
				defaultLabel={t('blog.filters.allIndustries')}
				options={industries}
			/>
			<DefaultPaginationFilter
				name="role"
				defaultLabel={t('blog.filters.allRoles')}
				options={roles}
			/>
		</svelte:fragment>
	</DefaultPagination>
	<ComponentSelector entries={modules} />
</DefaultRythm>
