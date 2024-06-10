<script lang="ts">
	import type { Filters, Offset } from '$com/ui/pagination/Pagination.svelte';
	import { page } from '$app/stores';
	import { Pagination } from '$com/ui/pagination';
	import { BLOG_PAGINATION_ITEMS_PER_PAGE } from '$lib/constants';
	import { t } from '$lib/translations/global';
	import DefaultPaginationNav from './DefaultPaginationNav.svelte';
	import PaginationFilters from '$com/ui/pagination/PaginationFilters.svelte';
	import CardNewsletter from '$com/blog/CardNewsletter.svelte';

	interface $$Slots {
		item: { item: PaginationItem };
		filters: Record<string, never>;
	}

	export let itemType: 'articles' | 'resources';
	export let title: Maybe<string> = null;

	const initialItems = $page.data.items || [];
	let itemsTotal = $page.data.itemsTotal || 0;

	const getItems = async (offset: Offset, filters: Filters) => {
		try {
			const searchParams = new URLSearchParams({
				offset: offset.toString(),
				...Object.entries(filters).reduce((obj, [key, value]) => {
					obj[key] = value?.[0] || '';
					return obj;
				}, {})
			});
			const res = await fetch(`/api/get-${itemType}?${searchParams.toString()}`);
			const data = await res.json();
			itemsTotal = data?.itemsTotal || 0;
			return data;
		} catch (error) {
			console.error(error);
			return { items: [], itemsTotal: 0 };
		}
	};
</script>

<Pagination
	{initialItems}
	{itemsTotal}
	{getItems}
	itemsPerPage={BLOG_PAGINATION_ITEMS_PER_PAGE}
	let:items
	let:state
>
	<div class="mx-auto space-y-40 px-20 bp:max-w-max bp:space-y-60 bp:px-120">
		<div
			class="flex flex-col items-start justify-between space-y-24 bp:flex-row bp:items-center bp:space-y-0"
		>
			{#if title}
				<h2>
					<span class="text-700 font-medium leading-10">{title}</span>
					<sup class="text-500 font-medium text-black-750-alpha">({itemsTotal})</sup>
				</h2>
			{/if}
			<PaginationFilters
				class="relative flex w-full flex-col space-y-16 bp:w-auto bp:flex-row bp:items-center bp:space-x-20 bp:space-y-0"
			>
				<slot name="filters" />
				<svelte:fragment slot="submit">
					<button
						class="text-300 w-full rounded-8 bg-grey-900 px-12 py-8 text-center font-medium leading-10 text-white bp:absolute bp:bottom-1/2 bp:left-full bp:w-auto bp:translate-y-1/2"
						type="submit"
					>
						{t('pagination.filter')}
					</button>
				</svelte:fragment>
			</PaginationFilters>
		</div>
		{#if items?.length}
			<ul
				class="grid gap-x-32 gap-y-60 transition-opacity bp:grid-cols-4 bp:gap-y-80"
				class:opacity-50={state === 'loading'}
			>
				{#each items as item, i (item.id)}
					<li>
						<slot name="item" {item} />
					</li>
					{#if i === 5 || (items.length < 7 && i === items.length - 1)}
						<li>
							<CardNewsletter />
						</li>
					{/if}
				{/each}
			</ul>
		{:else}
			<h3
				class="text-600 mx-auto w-fit rounded-16 bg-wheat-500 px-48 py-24 text-center font-medium leading-10"
			>
				{t('blog.noResults')}
			</h3>
		{/if}
		<DefaultPaginationNav />
	</div>
</Pagination>
