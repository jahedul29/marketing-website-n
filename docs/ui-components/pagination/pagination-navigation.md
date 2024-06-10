### PaginationNav.svelte

A pagination navigation with step links (previous and next pages) and page links. It if the next and
previous page links around the current page number exceed the allowed neighbours quantity, an
ellipsis is rendered instead.

Cannot be used at the same time as `PaginationLoadMore.svelte` or `PaginationInfiniteScroll.svelte`.

#### Props

-   `label` (string): The `aria-label` of the nav element. DEFAULT: "Pagination".
-   `neighbours` (number): The quantity of allowed page links around the current page number before
    an ellipsis is shown. DEFAULT: 2.
-   `ellipsis` (boolean): Wether or not to display ellpsises.
-   `class` (string): Optional nav classes.
-   `classLink` (string): Optional base page links classes.
-   `classLinkEnabled` (string): Optional enabled page links classes.
-   `classLinkCurrent` (string): Optional disabled page links (current page number) classes.
-   `classStep` (string): Optional base step links (previous and next page links) classes.
-   `classStepEnabled` (string): Optional enabled step links classes.
-   `classStepDisabled` (string): Optional disabled step links classes.
-   `classEllipsis` (string): Optional ellipsis classes.

#### Slots

-   Prev: The previous page link
    -   Name: "prev"
-   Next: The next page link
    -   Name: "next"
-   Link: The page links and current page number
    -   Name: "link"
    -   Slot props:
        -   readonly `page`: The associated page number
-   Ellipsis: All the ellipsises
    -   Name: "ellipsis"
-   Override: Allows overriding the default nav markup. If present, no other slots will be rendered.
    -   Name: "override"
    -   Slot props:
        -   readonly `currentPage`: The current page number
        -   readonly `prevPage`: The previous page number
        -   readonly `nextPage`: The next page number
        -   readonly `totalPages`: The total pages number
        -   readonly `allPages`: An array of all the currently displayed page numbers, starting from
            the lowest neighbour to the highest, and including the current page.

#### Events

-   `click` (`CustomEvent<{ page: number }>`): A custom `click` event emited when a pagination link
    is clicked and will trigger an update. The `detail` property of the event contains the selected
    page number.

### PaginationLink.svelte

Used internally by `PaginationNav.svelte`. Should be used in the `override` slot of the
`PaginationNav` component. It renders an anchor tag when enabled, and a `span` when disabled.

#### Props

-   page (number): The link's page number. REQUIRED
-   disabled (boolean): Wether the link is disabled or not. Default: `false`.
-   class (string): Optional classes.
-   classLink (string): Optional classes only applied to the link.
-   classDisabled (string): Optional classes only applied to the `span` (when in disabled state).
-   on (`{ [key: string]: (event: Event) => void; }`): An object of event listeners to add on the
    link. The keys are the event and the values are the event handlers.

```svelte
<PaginationLink on={{ click: myClickHandler }} />
```

#### Slots

-   Default: The default slot to add any markup inside the link and `span`.

## Example usage with Filter and Nav

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import { Pagination, PaginationLink, PaginationNav } from '$lib/components/ui/pagination';

	const news = [
		/* ... */
	];
	const newsCount = 288;
	const NEWS_PER_PAGE = 12;
	const getItems = async (offset, filters) => {
		// Make a request to Craft, get the news with the provided offset and filters and return them along with the entry count.
		return { items: fetchedNews, itemsTotal: fetchedNewsCount };
	};
</script>

<Pagination
	initialItems={news}
	{getItems}
	itemsTotal={newsCount}
	itemsPerPage={NEWS_PER_PAGE}
	let:items
	let:state
>
	<PaginationFilters let:activeFilters let:filter>
		<!-- Single value filter -->
		<select name="category" on:change={filter}>
			{#each categories as category}
				<option
					value={category.slug}
					selected={!!activeFilters.find(
						(filter) => filter.key === 'category' && filter.value === category.slug
					)}
				>
					{category.title}
				</option>
			{/each}
		</select>
		<!-- Multiple values filter -->
		{#each themes as theme}
			<label>
				<input
					type="checkbox"
					name="theme"
					value={theme.slug}
					checked={!!activeFilters.find(
						(filter) => filter.key === 'category' && filter.value === category.slug
					)}
					on:change={filter}
				/>
				<span>{theme.title}</span>
			</label>
		{/each}
	</PaginationFilters>
	{#if state === 'idle'}
		<div in:fade={{ duration: 200 }}>
			{#each items as item}
				<!-- Display items... -->
			{/each}
		</div>
	{/if}
	{#if state === 'loading'}
		<!-- Display loading state -->
	{/if}
	{#if state === 'error'}
		<!-- Display error state -->
	{/if}
	<PaginationNav
		class="flex items-center justify-center space-x-60 py-100 text-60"
		classStep="px-60 py-30 rounded-10 bg-[turquoise] text-[darkblue]"
		classStepEnabled="hover:bg-[darkblue] hover:text-[turquoise]"
		classStepDisabled="opacity-30"
		classLink="hover:text-[turquoise]"
		classLinkCurrent="text-[turquoise]"
	>
		<svelte:fragment slot="prev">
			<!-- Arrow svg -->
			<ArrowRight class="w-90 h-auto rotate-180" />
		</svelte:fragment>
		<svelte:fragment slot="next">
			<!-- Arrow svg -->
			<ArrowRight class="w-90 h-auto" />
		</svelte:fragment>
	</PaginationNav>
</Pagination>
```
