<script lang="ts">
	import { getInternalPaginationContext } from './Pagination.svelte';
	import type { Listeners } from '$lib/actions/setListeners';
	import { page as pageStore } from '$app/stores';
	import { setListeners } from '$lib/actions/setListeners';

	export let page: number;
	export let disabled = false;
	let classes = '';
	export { classes as class };
	export let classLink = '';
	export let classDisabled = '';
	export let on: Maybe<Listeners> = null;

	const { pageKey } = getInternalPaginationContext();

	// Copy page query to avoid mutating it
	const query = new URLSearchParams($pageStore.url.search);
	query.set(pageKey, `${page}`);
	const href = `?${query.toString()}`;
</script>

{#if disabled}
	<span class="{classes} {classDisabled}">
		<slot />
	</span>
{:else}
	<a
		{href}
		data-sveltekit-preload-code="off"
		data-sveltekit-preload-data="off"
		data-page={page}
		class="{classes} {classLink}"
		use:setListeners={on}
	>
		<slot />
	</a>
{/if}
