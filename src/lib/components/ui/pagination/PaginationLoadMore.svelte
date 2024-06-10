<script lang="ts">
	import { getInternalPaginationContext } from '$lib/components/ui/pagination/Pagination.svelte';
	import { t } from '$lib/translations/global';
	import PaginationLink from '$lib/components/ui/pagination/PaginationLink.svelte';

	let classes = '';
	export { classes as class };
	export let classEnabled = '';
	export let classDisabled = '';

	const pagination = getInternalPaginationContext();

	const { pages, update, itemsPerPage, setKeepItems } = pagination;

	setKeepItems();

	const onLoadMoreClick = (e: Event) => {
		e.preventDefault();
		update({ page: Number($pages.next) });
	};

	$: itemsTotal = $pages.itemsTotal;
</script>

{#if pagination && itemsTotal > itemsPerPage}
	<PaginationLink
		page={$pages.next}
		disabled={$pages.next > $pages.total}
		class={classes}
		classLink={classEnabled}
		{classDisabled}
		on={{ click: onLoadMoreClick }}
	>
		<slot>
			{t('pagination.loadMore')}
		</slot>
	</PaginationLink>
{/if}
