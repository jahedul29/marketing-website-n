# Pagination Load More

### PaginationLoadMore.svelte

A "load more" button.

If you use this pagination strategy, your server query will have to ignore the `offset` parameter on
the initial query (on +page.server.ts).

#### Props

-   `class` (string): Optional base classes.
-   `classEnabled` (string): Optional enabled classes.
-   `classDisabled` (string): Optional disabled classes.

#### Slots

-   Default: The content of the button.

### PaginationInfiniteScroll.svelte

Loads items on scroll until no more items are found by observing a full screen div(`height: 100vh;`)
and loading new items at a specified threshold.

If you use this pagination strategy, your server query will have to ignore the `offset` parameter on
the initial query (on +page.server.ts).

#### Props

-   `threshold` (number): The intersection observer threshold, at which the component starts loading
    the next items. Default: `0.5`.

#### Slots

-   Default:
    -   Slot props:
        -   readonly `done` (`boolean`): Wether there are more items to load or not.

#### Exemple usage

We need to have 5 files:

-   Our initial query on `+page.server.ts`
-   Our endpoint to load more items when a click occurs on the load more button or we reached the
    threshold in `routes/api/get-my-items/+server.ts`
-   Our getItems function that accept `limit` and `offset` as an optional param
-   Our graphQL query
-   Our svelte component with the getItems query.

```+page.server.ts

import type { PageServerLoad } from './$types';
import type { PlacementsPortal_PlacementsPortal_Entry } from 'src/craft';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { blog } from '$gql/fragments/pages';
import { ARTICLES_PER_PAGE } from '$lib/constants';
import { getBlogArticles } from '$lib/server/getBlogArticles';

export const load: PageServerLoad = async (event) => {
	const { url } = event;
	const query = pageQueryBuilder('entry').withFragments({ blog })
	const data = await loadCraftPage<{
		entry: Blog_Portal;
	}>(event, query);

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = ARTICLES_PER_PAGE * page;

	const articlesData = await getBlogArticles({
		limit
	});

	return {
		...data,
		...articlesData
	};
};
```

```routes/api/get-blog-articles/+server.ts
import type { RequestHandler } from './$types';
import { ARTICLES_PER_PAGE } from '$lib/constants';
import { getBlogArticles } from '$lib/server/getBlogArticles';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const limit = ARTICLES_PER_PAGE;
		const offset = url.searchParams.get('offset');
		const data = await getBlogArticles({
			limit,
			offset: Number(offset) || 0
		});
		return json(data);
	} catch (error) {
		console.error(error);
		return json({ items: [], itemsTotal: 0 });
	}
};
```

```server/graphql/getBlogArticles.ts

import { GET_BLOG_ARTICLES } from '$gql/queries/blog';
import { fetchCraft } from './craft';

type Variables = {
	limit: number;
	offset?: number;
};

export const getBlogArticles = async (variables: Variables) => {
	try {
		const { data } = await fetchCraft<{
			items: Articles_Default_Entry[];
			itemsTotal: number;
		}>(GET_BLOG_ARTICLES, variables);

		return {
			items: data?.items || [],
			itemsTotal: data?.itemsTotal || 0
		};
	} catch (error) {
		console.error(error);
		return { items: [], itemsTotal: 0 };
	}
};
```

```server/graphql/queries/blog
import gql from '$gql/gql';

export const GET_BLOG_ARTICLES = gql`
	query getBlogArticles($limit: Int!, $offset: Int) {
		items: entries(section: "articles", limit: $limit, offset: $offset) {
			id
            displayTitle
            title
            ...
		}
		itemsTotal: entryCount(section: "articles")
	}
`;
```

```+page.svelte
	import { Pagination } from '$lib/components/ui/pagination';
	import PaginationLoadMore from '$com/ui/pagination/PaginationLoadMore.svelte';

    const { entry, items } = data || {};
    let initialItems = items;
	let itemsTotal = placementsCount || 0;

    const getItems = async (offset: Offset) => {
		try {
			const searchParams = new URLSearchParams({
				offset: offset.toString()
			});
			const res = await fetch(`/api/get-placements?${searchParams.toString()}`);
			const data = await res.json();

			itemsTotal = data?.placementsTotal || 0;
			return data;
		} catch (error) {
			console.error(error);
			return { items: [], itemsTotal: 0 };
		}
	};

    <Pagination
		{initialItems}
		{getItems}
		{itemsTotal}
		itemsPerPage={PLACEMENTS_ITEMS_PER_PAGE}
		let:items
		let:state
	>
        {#if items?.length}
            {#each items as item, index}
                <YourComponent {item} />
            {/each}
        {/if}
        <PaginationLoadMore
            class="rounded-full border-1 border-black px-12 py-4 text-40 uppercase bp:px-20 bp:py-8 bp:text-60"
        />
    </Pagination>
```
