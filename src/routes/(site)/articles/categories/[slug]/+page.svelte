<script lang="ts">
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { t } from '$lib/translations/global';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderBlog from '$com/headers/HeaderBlog.svelte';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import ArticleCategoriesSlider from '$com/blog/ArticleCategoriesSlider.svelte';
	import DefaultPagination from '$com/pagination/DefaultPagination.svelte';
	import CardArticles from '$com/cards/CardArticles.svelte';
	import DefaultPaginationFilter from '$com/pagination/DefaultPaginationFilter.svelte';
	import ArrowRight from '$com/svg/ArrowRight.svelte';

	export let data: PageData;

	const { entry, categories, cities, roles, industries } = data || {};
	const { title, plainText, color } = entry || {};
	const image = entry?.image?.[0];
	const mask = entry?.blogMask?.[0];

	setContext('theme-color', color);
</script>

<DefaultRythm>
	<HeaderBlog displayTitle={title} {plainText} {color} {image} {mask}>
		<HtmlLink
			slot="surtitle"
			href="/blog"
			class="text-300 group mb-8 flex items-center leading-10 text-black-750-alpha transition-colors hover:text-grey-900"
		>
			<span
				class="w-12 rotate-180 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1/4"
			>
				<ArrowRight />
			</span>
			<span>&nbsp;{t('blog.goToBlog')}</span>
		</HtmlLink>
	</HeaderBlog>
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
	<ArticleCategoriesSlider {categories} />
</DefaultRythm>
