<!--@doc
@include pagination.md
-->
<script lang="ts" context="module">
	import { readonly, type Readable } from 'svelte/store';
	import { getContext } from 'svelte';

	export type PaginationState = 'idle' | 'loading' | 'error';
	export type Filters = Record<string, string[]>;
	export type ActiveFilter = {
		key: string;
		value: string;
		clear: () => void;
	};
	export type ActiveFilters = ActiveFilter[];
	export type Offset = number;

	export type UpdateArgs = { page?: number; filters?: Filters };

	export interface PagesStore {
		current: number;
		prev: number;
		next: number;
		total: number;
		itemsTotal: number;
		filters: Filters;
	}

	export interface PaginationInternalApi {
		update: (params: UpdateArgs) => void;
		setInitialFilters: (filters: Filters) => void;
		pages: Readable<PagesStore>;
		pageKey: string;
		itemsPerPage: number;
		setKeepItems: () => void;
	}

	export interface PaginationApi<TItem> {
		items: Readable<TItem[]>;
		state: Readable<PaginationState>;
		hasActiveFilters: Readable<boolean>;
	}

	const INTERNAL_CONTEXT_KEY = '__pagination-internal__';
	const PUBLIC_CONTEXT_KEY = '__pagination__';

	export const getInternalPaginationContext = () =>
		getContext<PaginationInternalApi>(INTERNAL_CONTEXT_KEY);

	// Using a function declaration because svelte-check doesn't like generics in arrow functions
	export const getPaginationContext = function <TItem>() {
		return getContext<PaginationApi<TItem>>(PUBLIC_CONTEXT_KEY);
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import machine from 'svelte-fsm';
	import { page } from '$app/stores';
	import { mounted } from '$lib/stores/mounted';

	type Item = $$Generic;
	type Items = Item[];
	type ItemsData = { items: Items; itemsTotal: number };
	type GetItemsFunction = (offset: Offset, filters?: Filters) => ItemsData | Promise<ItemsData>;

	interface $$Slots {
		default: { items: Items; state: PaginationState; hasActiveFilters: boolean };
	}

	export let getItems: GetItemsFunction;
	export let initialItems: Items;
	export let itemsTotal: number;
	export let itemsPerPage = 12;
	export let pageKey = 'page';
	export let updateUrl = true;

	let keepItems = false;

	const items = writable<Items>(initialItems);

	const initialPage = Number($page.url.searchParams.get(pageKey)) || 1;

	const pages = writable<PagesStore>({
		current: initialPage,
		prev: initialPage - 1,
		next: initialPage + 1,
		total: Math.ceil(itemsTotal / itemsPerPage),
		itemsTotal,
		filters: {}
	});

	const hasActiveFilters = derived(pages, (p) => {
		return Object.values(p.filters).flat().filter(Boolean).length > 0;
	});

	const setKeepItems = () => {
		keepItems = true;
	};

	const setInitialFilters = (filters: Filters) => {
		pages.update((p) => {
			return {
				...p,
				filters: {
					...(p.filters || {}),
					...filters
				}
			};
		});
	};

	const updateQueryString = (params: Record<string, string | string[] | null>) => {
		const query = new URLSearchParams(window.location.search);
		Object.entries(params).forEach(([key, value]) => {
			const isFirstPage = key === pageKey && value === '1';
			if (!value?.length || isFirstPage) {
				query.delete(key);
				return;
			}
			if (Array.isArray(value)) {
				query.delete(key);
				value.forEach((v) => {
					query.append(key, v);
				});
			} else {
				query.set(key, value);
			}
		});
		const qs = query.toString();
		const url = qs ? `?${qs}` : $page.url.pathname;
		// We must forward the history state because Sveltekit uses it to track navigations
		window.history.replaceState(window.history.state, '', url);
	};

	const update = (params: UpdateArgs) => {
		state.update(params);
	};

	const state = machine('idle', {
		idle: {
			update: () => {
				if (!$mounted) {
					return;
				}
				return 'loading';
			}
		},
		loading: {
			async _enter({ args }) {
				const { page, filters }: UpdateArgs = args[0];
				try {
					const currentPage = page || 1;
					const updatedFilters = { ...$pages.filters, ...filters };
					if (updateUrl) {
						updateQueryString({
							[pageKey]: `${currentPage}`,
							...updatedFilters
						});
					}
					const offset = Math.ceil((currentPage - 1) * itemsPerPage);
					const itemsData = await getItems(offset, updatedFilters);
					$items = keepItems ? [...$items, ...itemsData.items] : itemsData.items;

					pages.set({
						total: Math.ceil(itemsData.itemsTotal / itemsPerPage),
						itemsTotal: itemsData.itemsTotal,
						current: currentPage,
						prev: currentPage - 1,
						next: currentPage + 1,
						filters: updatedFilters
					});
					this.success();
				} catch (error) {
					this.error();
				}
			},
			success: 'idle',
			error: 'error'
		},
		error: {
			update: 'loading'
		}
	});

	setContext<PaginationInternalApi>(INTERNAL_CONTEXT_KEY, {
		update,
		setInitialFilters,
		pages: readonly(pages),
		pageKey,
		itemsPerPage,
		setKeepItems
	});

	setContext<PaginationApi<Item>>(PUBLIC_CONTEXT_KEY, {
		state,
		items: readonly(items),
		hasActiveFilters
	});
</script>

<slot items={$items} state={$state} hasActiveFilters={$hasActiveFilters} />
