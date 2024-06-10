<script lang="ts">
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { t } from '$lib/translations/global';
	import HeaderBlog from '$com/headers/HeaderBlog.svelte';
	import FeaturedGrid from '$com/blog/FeaturedGrid.svelte';
	import CardFeaturedResource from '$com/cards/CardFeaturedResource.svelte';
	import FeaturedResourcesSeries from '$com/blog/FeaturedResourcesSeries.svelte';
	import DefaultPagination from '$com/pagination/DefaultPagination.svelte';
	import CardResources from '$com/cards/CardResources.svelte';
	import DefaultPaginationFilter from '$com/pagination/DefaultPaginationFilter.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';

	export let data: PageData;

	const { entry, types } = data || {};
	const {
		surtitle,
		displayTitle,
		plainText,
		color,
		featuredResources,
		featuredResourceSeries,
		modules
	} = entry || {};
	const image = entry?.image?.[0];
	const mask = entry?.blogMask?.[0];

	setContext('theme-color', color);
</script>

<DefaultRythm>
	<HeaderBlog {surtitle} {displayTitle} {plainText} {color} {image} {mask} />
	{#if featuredResources?.length}
		<FeaturedGrid
			title={t(
				featuredResources.length > 1 ? 'blog.featuredResources' : 'blog.featuredResource'
			)}
		>
			{#each featuredResources as resource}
				<CardFeaturedResource {resource} />
			{/each}
		</FeaturedGrid>
	{/if}
	{#if featuredResourceSeries?.length}
		<FeaturedResourcesSeries block={featuredResourceSeries[0]} />
	{/if}
	<DefaultPagination itemType="resources" title={t('blog.allResources')}>
		<svelte:fragment slot="item" let:item>
			{#if item.__typename === 'resources_default_Entry'}
				<CardResources entry={item} />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="filters">
			<DefaultPaginationFilter
				name="type"
				defaultLabel={t('blog.filters.allTypes')}
				options={types}
			/>
		</svelte:fragment>
	</DefaultPagination>
	<ComponentSelector entries={modules} />
</DefaultRythm>
