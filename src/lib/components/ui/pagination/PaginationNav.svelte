<script lang="ts">
	import {
		getInternalPaginationContext,
		type PagesStore
	} from '$lib/components/ui/pagination/Pagination.svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/translations/global';
	import PaginationLink from '$lib/components/ui/pagination/PaginationLink.svelte';

	interface $$Events {
		click: CustomEvent<{ page: number }>;
	}

	interface $$Slots {
		override: {
			currentPage: PagesStore['current'];
			prevPage: PagesStore['prev'];
			nextPage: PagesStore['next'];
			totalPages: PagesStore['total'];
			allPages: number[];
		};
		prev: Record<string, never>;
		next: Record<string, never>;
		link: { page: number };
		ellipsis: Record<string, never>;
	}

	export let label = 'Pagination';
	export let neighbours = 2;
	export let ellipsis = true;
	let classes = '';
	export { classes as class };
	export let classLink = '';
	export let classLinkEnabled = '';
	export let classLinkCurrent = '';
	export let classStep = '';
	export let classStepEnabled = '';
	export let classStepDisabled = '';
	export let classEllipsis = '';

	const dispatch = createEventDispatcher();

	const pagination = getInternalPaginationContext();

	const { pages, update, itemsPerPage } = pagination;

	const firstPage = 1;

	$: itemsTotal = $pages.itemsTotal;
	$: lastPage = $pages.total;

	const onPaginationClick = (e: Event) => {
		const target = e.target as HTMLElement;
		const link = target.closest('a[data-page]') as HTMLAnchorElement;
		if (!link) {
			return;
		}
		const page = link.dataset.page;
		if (!page) {
			return;
		}
		const pageNum = Number(page);
		dispatch('click', { page: pageNum });
		update({ page: pageNum });
	};

	const getPages = (current: number) => {
		const prevLinks: number[] = [];
		const nextLinks: number[] = [];
		for (let i = neighbours; i > 0; i--) {
			const page = current - i;
			if (page > 0) {
				prevLinks.push(page);
			}
		}
		for (let i = 1; i <= neighbours; i++) {
			const page = current + i;
			if (page <= lastPage) {
				nextLinks.push(page);
			}
		}
		return [...prevLinks, current, ...nextLinks];
	};

	$: allPages = getPages($pages.current);
</script>

{#if pagination && itemsTotal > itemsPerPage}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<nav class={classes} aria-label={label} on:click|preventDefault={onPaginationClick}>
		{#if $$slots.override}
			<slot
				name="override"
				currentPage={$pages.current}
				prevPage={$pages.prev}
				nextPage={$pages.next}
				totalPages={$pages.total}
				{allPages}
			/>
		{:else}
			<!-- Prev -->
			<PaginationLink
				page={$pages.prev}
				disabled={$pages.prev <= 0}
				class={classStep}
				classLink={classStepEnabled}
				classDisabled={classStepDisabled}
			>
				<span class="sr-only">{t('pagination.prevPage')}</span>
				<span aria-hidden="true">
					<slot name="prev">&larr;</slot>
				</span>
			</PaginationLink>
			<!-- First -->
			{#if $pages.current - neighbours > firstPage}
				<PaginationLink
					page={firstPage}
					disabled={$pages.current === firstPage}
					class={classLink}
					classLink={classLinkEnabled}
					classDisabled={classLinkCurrent}
				>
					<span class="sr-only">Page {firstPage}</span>
					<span aria-hidden="true">
						<slot name="link" page={firstPage}>
							{firstPage}
						</slot>
					</span>
				</PaginationLink>
			{/if}
			<!-- Ellipsis before current -->
			{#if ellipsis && $pages.current - neighbours > firstPage + 1}
				<span aria-hidden="true" class={classEllipsis}>
					<slot name="ellipsis">&hellip;</slot>
				</span>
			{/if}
			<!-- Links -->
			{#each allPages as page (page)}
				<PaginationLink
					{page}
					disabled={$pages.current === page}
					class={classLink}
					classLink={classLinkEnabled}
					classDisabled={classLinkCurrent}
				>
					<span class="sr-only">Page {page}</span>
					<span aria-hidden="true">
						<slot name="link" {page}>
							{page}
						</slot>
					</span>
				</PaginationLink>
			{/each}
			<!-- Ellipsis after current -->
			{#if ellipsis && $pages.total - $pages.current > neighbours + 1}
				<span aria-hidden="true" class={classEllipsis}>
					<slot name="ellipsis">&hellip;</slot>
				</span>
			{/if}
			<!-- Last -->
			{#if $pages.current + neighbours < lastPage}
				<PaginationLink
					page={lastPage}
					disabled={$pages.current === lastPage}
					class={classLink}
					classLink={classLinkEnabled}
					classDisabled={classLinkCurrent}
				>
					<span class="sr-only">Page {lastPage}</span>
					<span aria-hidden="true">
						<slot name="link" page={lastPage}>
							{lastPage}
						</slot>
					</span>
				</PaginationLink>
			{/if}
			<!-- Next -->
			<PaginationLink
				page={$pages.next}
				disabled={$pages.next > $pages.total}
				class={classStep}
				classLink={classStepEnabled}
				classDisabled={classStepDisabled}
			>
				<span class="sr-only">{t('pagination.nextPage')}</span>
				<span aria-hidden="true">
					<slot name="next">&rarr;</slot>
				</span>
			</PaginationLink>
		{/if}
	</nav>
{/if}
