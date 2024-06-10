<script lang="ts">
	import { getInternalPaginationContext } from '$lib/components/ui/pagination/Pagination.svelte';

	export let threshold: IntersectionObserverInit['threshold'] = 0.5;

	const pagination = getInternalPaginationContext();

	const { pages, update, itemsPerPage, setKeepItems } = pagination;

	setKeepItems();

	$: nextPage = $pages.next;
	$: pagesTotal = $pages.total;
	$: itemsTotal = $pages.itemsTotal;
	$: done = itemsTotal <= itemsPerPage || nextPage > pagesTotal;

	const onScroll: IntersectionObserverCallback = ([entry]) => {
		if (entry.isIntersecting) {
			update({ page: Number(nextPage) });
		}
	};

	const setup = (node: HTMLElement) => {
		const observer = new IntersectionObserver(onScroll, {
			threshold
		});
		observer.observe(node);

		return {
			destroy: () => {
				observer.disconnect();
			}
		};
	};
</script>

{#if pagination}
	<slot {done} />
	{#if !done}
		<div style="height: 100vh;" use:setup />
	{/if}
{/if}
