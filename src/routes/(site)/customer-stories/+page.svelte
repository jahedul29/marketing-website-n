<script lang="ts">
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { t } from '$lib/translations/global';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderBlog from '$com/headers/HeaderBlog.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import FeaturedGrid from '$com/blog/FeaturedGrid.svelte';
	import CardFeaturedStory from '$com/cards/CardFeaturedStory.svelte';
	import CardCustomerStories from '$com/cards/CardCustomerStories.svelte';

	export let data: PageData;

	const { entry, stories } = data || {};
	const { surtitle, displayTitle, plainText, color, modules, featuredStories } = entry || {};
	const image = entry?.image?.[0];
	const mask = entry?.blogMask?.[0];

	setContext('theme-color', color);
</script>

<DefaultRythm>
	<HeaderBlog {surtitle} {displayTitle} {plainText} {color} {image} {mask} />
	{#if featuredStories?.length}
		<FeaturedGrid
			title={t(featuredStories.length > 1 ? 'blog.featuredStories' : 'blog.featuredStory')}
		>
			{#each featuredStories as story}
				<CardFeaturedStory {story} />
			{/each}
		</FeaturedGrid>
	{/if}
	{#if stories?.length}
		<div class="mx-auto space-y-40 px-20 bp:max-w-max bp:space-y-60 bp:px-120">
			<h2>
				<span class="text-700 font-medium leading-10">{t('blog.allStories')}</span>
			</h2>
			<ul class="grid gap-x-32 gap-y-60 transition-opacity bp:grid-cols-4 bp:gap-y-80">
				{#each stories as entry}
					<li class="max-w-240 bp:max-w-none">
						<CardCustomerStories {entry} />
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<ComponentSelector entries={modules} />
</DefaultRythm>
