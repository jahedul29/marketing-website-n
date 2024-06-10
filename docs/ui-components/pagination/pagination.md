# Pagination

## Pagination strategies

-   [Pagination navigation](pagination-navigation.md)
-   [Pagination load-more & infinite scroll](pagination-load-more.md)

## Props

-   `getItems` (`GetItemsFunction`): Function that receives the current offset (calculated from the
    requested page) and currently selected filters as parameter and returns the new items to display
    as well as the updated items count. REQUIRED.
-   `initialItems` (`any[]`): The items to display on first page load. REQUIRED.
-   `itemsTotal` (number): The total items count. REQUIRED.
-   `itemsPerPage` (number): The number of items displayed on one page. DEFAULT: 12.
-   `pageKey` (string): The page property key used in the query string (i.e., `?page=3`). DEFAULT:
    "page".
-   `updateUrl` (boolean): Wether to update the url query string (using `history.replaceState`) with
    pagination and filter values. DEFAULT: `true`.

```ts
type ItemsData = { items: Items; itemsTotal: number };
type Filters = Record<string, string | string[]>;
type GetItemsFunction = (offset: number, filters?: Filters) => ItemsData | Promise<ItemsData>;
```

## Slots

### Default

Slot props:

-   readonly `items` (`any[]`): The items of the current page.
-   readonly `state` (`'idle' | 'loading' | 'error'`): The current state of the component.
-   readonly `hasActiveFilters (`boolean`): Wether the pagination currently has active filters.

## Children components

### PaginationFilters.svelte

A `GET` form containing the form elements that will serve as filters. When the form is submitted,
either through a submit button or the `filter` slot prop, the selected filter values will be
appended in the query string and the `getItems` function will be called with the updated values.

In order for your element to get picked up as a filter, it must have a name attribute, which will
correspond to its key in the query string. For example, `<select name="theme">` will correspond to
`?theme=<selected theme>`.

Filters can have single (select, radio, etc.) or multiple values (select with `multiple` attribute,
checkboxes, etc.). In any case, the value passed to the `getItems` function will be an array of the
values as strings.

It will also work without javascript since the native behavior of a `GET` form is to append the form
data in the query string and reload the page when submitted. To allow the form to be submitted, a
default button of type `submit` will be rendered and then removed once the component is hydrated. If
you still wish to have a submit button (like, for exemple, an "Apply filters" button), you can use
the `submit` slot, which will replace the default submit button.

#### Props

-   class (string): Optional form classes.

#### Slots

Default: The default slot where you can add form elements.

-   Slot props:
    -   readonly `activeFilters` (`{ key: string; value: string; clear: () => void }[]`): An array
        of all the currently selected filter values. Each value is an object containing the filter
        group `key` (corresponding to the `name` attribute of the filter input), the `value` (the
        currently selected value) and a `clear` function to clear the value from the active filters.
    -   readonly `filter` (`() => void`): A function to submit the filters form. This will trigger a
        call the `getItems` function with the updated filters and update the items.

Submit: The slot for the submit button of the form.

-   Name: "submit"

#### Events

-   `filter` (`CustomEvent<{ event: Event }>`): A custom `filter` event emited when the form is
    submitted. The `detail` property of the custom event contains the DOM `submit` event.
-   `reset` (`CustomEvent<{ event: Event }>`): A custom `reset` event emited when the form is reset,
    usually when a button of type "reset" is clicked. The `detail` property of the custom event
    contains the DOM `reset` event.

#### Context

Obtainable with the `getPaginationFiltersContext` function exported by the component.

-   `activeFilters` (`Readable<{ key: string; value: string; clear: () => void }[]>`): A readable
    store of an array of all the currently selected filter values. Each value is an object
    containing the filter group `key` (corresponding to the `name` attribute of the filter input),
    the `value` (the currently selected value) and a `clear` function to clear the value from the
    active filters.
-   `filter` (`() => void`): A function to submit the filters form. This will trigger a call the
    `getItems` function with the updated filters and update the items.

## Querying entries

The Craft GraphQL Api is poorly documented, especially regarding `relatedTo` queries, so here is a
some helpful information regarding the queries you have to make to use this component to the
fullest.

Let's say we have to fetch all the articles of a CMS.

Our basic query could look like this:

```graphql
query getArticles($siteId: [QueryArgument]!) {
	entries(section: ["article"], siteId: $siteId, orderBy: "postDate") {
		id
		title
	}
}
```

With this, we fetch all articles from the current site in one query. But we want to paginate them so
we don't have to potentially load hundreds of article everytime!

### Paginated queries

To get paginated articles, we need to add 2 parameters to the query: `offset` and `limit`.

The `offset` is the number of entries (in our case, articles) that will be skipped. If we have an
offset of 12, we will get all the entries except from the first 12. This parameter is provided by
the `Pagination.svelte` component in the `getItems` function so you can use it in your query.

The `limit` is the number of entries we want to get back. This is a constant you determine. It also
corresponds to the `itemsPerPage` prop of the `Pagination.svelte` component.

Combined, these parameters allow us to query entries within a certain range. For exemple, we can
query 10 articles, starting from the 30th. That will give us the 31st to the 40th articles.

Our query should now look like this:

```graphql
query getArticles($siteId: [QueryArgument]!, $offset: Int, $limit: Int) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		offset: $offset
		limit: $limit
	) {
		id
		title
	}
}
```

### Filtered queries

We now want users to be able to filter the articles. In the `getItems` function, you get the
selected filters as a second argument. You can use these values and pass them to your query.

Assuming you are filtering entries using Craft's categories, you can filter your query like this:

```graphql
query getArticles($siteId: [QueryArgument]!, $category: [String]) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		relatedToCategories: [{ group: ["categories"], slug: $category }]
	) {
		id
		title
	}
}
```

We use the `relatedToCategories` argument, which is an array of objects. You can add as many objects
as you want, each representing a specific category/filter. The `group` property is the handle of the
category. The `slug` property is an array of all the slugs you want to filter the articles with.

Here is an example with multiple categories:

```graphql
query getArticles($siteId: [QueryArgument]!, $category: [String], $theme: [String]) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		relatedToCategories: [
			{ group: ["categories"], slug: $category }
			{ group: ["themes"], slug: $theme }
		]
	) {
		id
		title
	}
}
```

IMPORTANT: If one of the category values is `null` or `undefined` (e.g.: no filter is selected for
that category), you need to pass `"*"` as the category slug. Otherwise, Craft won't return any
entry.

### Getting the entry count

The pagination component also expects you to provide the total entry count in order to calculate the
number of pages. You can get it along with your entries query like this:

```graphql
query getArticles($siteId: [QueryArgument]!) {
	entries(section: ["article"], siteId: $siteId, orderBy: "postDate") {
		id
		title
	}
	entryCount(section: ["article"], siteId: $siteId)
}
```

The count will now be accessible in the returned `data` property as `entryCount`.

If you filter the entries by category, the filter arguments also need to be present in the entry
count query, because you need the filtered entries count, not the total entries count.

```graphql
query getArticles($siteId: [QueryArgument]!, $category: [String], $theme: [String]) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		relatedToCategories: [
			{ group: ["categories"], slug: $category }
			{ group: ["themes"], slug: $theme }
		]
	) {
		id
		title
	}
	entryCount(
		section: ["article"]
		siteId: $siteId
		relatedToCategories: [
			{ group: ["categories"], slug: $category }
			{ group: ["themes"], slug: $theme }
		]
	)
}
```

### Putting it all together

We now have all the elements to build our query, which now looks like this:

```graphql
query getArticles(
	$siteId: [QueryArgument]!
	$offset: Int
	$limit: Int
	$category: [String]
	$theme: [String]
) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		offset: $offset
		limit: $limit
		relatedToCategories: [
			{ group: ["categories"], slug: $category }
			{ group: ["themes"], slug: $theme }
		]
	) {
		id
		title
	}
	entryCount(
		section: ["article"]
		siteId: $siteId
		relatedToCategories: [
			{ group: ["categories"], slug: $category }
			{ group: ["themes"], slug: $theme }
		]
	)
}
```
