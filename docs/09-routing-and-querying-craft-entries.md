# Routing and querying craft entries

## Routing

Routing is done by creating Sveltekit route folders in `src/routes`. For a localized site, all page
routes should be inside `src/routes/[locale=lang]`, otherwise they can be directly in the routes
folder.

For localized sites, we use [param matchers](https://kit.svelte.dev/docs/advanced-routing#matching)
to translate the slugs.

For example, if we have a slug that is `blog` in english and `blogue` in french, we create a matcher
called `blog` (to match the primary site's slug).

`params/blog.ts`

```ts
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return ['blog', 'blogue'].includes(param);
};
```

We can then use the matcher in the route folder name: `[uri=blog]`.

## Querying craft entries

Everything related to querying Craft CMS is found in the `$lib/server` folder.

### graphql/queries

This is the folder where you can put all your project's queries as template literal strings. The
only one already present is `GET_GLOBAL_SETS` in `globals.ts`, used by the root layout to fetch the
site's global data.

For consistency, you should name all your queries in all caps snake case. Additionnally, you can use
the `gql` helper tag from `$gql/gql` to get syntax highlighting and auto-formatting when writing
queries.

### graphql/fragments

The fragments folder is there for you to organize your graphql fragments
(https://blog.logrocket.com/graphql-fragments-explained/).

Fragments are useful for re-using certain query formats across multiple queries.

### craft.ts

This module exports the `fetchCraft` function, a useful wrapper that makes a fetch call to Craft CMS
with the provided query and variables.

### loadCraftPage.ts

This module exports two essential functions to query CMS data for the site's pages:

#### `pageQueryBuilder`

Builds a basic page query and returns an API to modify it.

**Params**:

-   Type (`'entry'` | `'category'`): The type of element to query.

**Returns**:

The builder API:

-   `withParams`: Allows you to add params to the query.
-   `withArguments`: Allows you to add arguments to the query.
-   `withFragments`: Allows you to add fragments to the query.
-   `withQueries`: Allows you to add extra queries to the query.

#### `loadCraftPage`

Queries the Craft entry using a query from `pageQueryBuilder` and returns it. It handles errors and
preview mode for you.

**params**:

-   event (`RequestEvent`): The request event from the route's load function.
-   query (`ReturnType<typeof pageQueryBuilder>`): A query built with the `pageQueryBuilder`
    function.
-   variables (`Record<string, string>`): An optional object of variables to pass along the query if
    you added any params to the query.

**Returns**:

The data object returned from the query.

#### Using the functions

Every page route `+page.server.ts` file should use at minimum `pageQueryBuilder` to construct a page
query and `loadCraftPage` to fetch the data. You can add other queries related to the route
afterwards if needed.

Example:

In `+page.server.ts`:

```ts
import type { PageServerLoad } from './$types';
import type { Pages_Default_Entry } from 'src/craft';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { pagesDefault } from '$gql/fragments/pages';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ pagesDefault });
	return loadCraftPage<{ entry: Pages_Default_Entry }>(event, query);
};
```

Another more complex example using multiple queries and params would be:

In `+page.server.ts`:

```ts
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { jobPosting } from '$gql/fragments/pages';
import type { JobPostings_Default_Entry } from 'src/craft';
import { GET_JOBS } from '$gql/queries/getJobs.js';

export const load = async (event) => {
	const slug = event.params.slug;
	const query = pageQueryBuilder('entry')
		.withFragments({ jobPosting })
		.withQueries([GET_JOBS]) // Here we are adding a new query to the basic one which has a parameter exceptSlug
		.withParams({ exceptSlug: 'String' }); // we add the param to the query

	return loadCraftPage<{
		entry: JobPostings_Default_Entry;
		jobPostings: JobPostings_Default_Entry[];
	}>(event, query, { exceptSlug: slug }); // And we add the slug here as loadCraftPage last argument.
};
```

In `getJobs.ts`:

```ts
import gql from '$gql/gql';

export const GET_JOBS = gql`
	jobPostings: entries(site: $site, section: "jobPostings", slug: ["not", $exceptSlug]) {
		... on jobPostings_default_Entry {
			id
			uri
			language
			displayTitle
		}
	}
`;
```

#### `moduleQueries`

Since you have access to the load function, its pretty simple to query any additional data. A common
use case is to fetch some data for a particular module from the entry. For that, you can use the
`moduleQueries` functions.

`moduleQueries` (inside `$lib/server`) is an object with the keys being a module's `typeHandle` and
the values are functions where you can fetch the data you need. These functions get the module and
page entry as first and second parameters respectively, and they must return the module entry. You
can add your data as new properties on the module object itself and return it.

The module queries will only be run if a field with a handle containing the word 'module' is present
in the entry (no matter how deeply nested), and if a module in this field corresponds to a query.

For example, the following fields would match: `modules`, `articleModules`, `singleModule`, etc.
These fields can also be nested, meaning they can come from a related entry/category or a matrix
field.

```ts
const services: ModuleQuery<ModuleServices> = async (mod, entry) => {
	try {
		const { data } = await fetchCraft<ServicesEntries>(GET_SERVICES, {
			site: entry.language
		});
		mod.services = data?.services || [];
	} catch (error) {
		console.error(error);
		mod.services = [];
	}
	return mod;
};

export const moduleQueries: ModuleQueries = {
	services
};
```

### Dynamic imports

If your route requires [dynamic imports](./28-dynamic-imports.md), create a `+page.ts` file in your
route folder and use the `runDynamicImports` function.

In `+page.ts`:

```ts
import type { PageLoad } from './$types';
import { runDynamicImports } from '$lib/dynamic-imports/runDynamicImports';

export const load: PageLoad = async ({ data }) => {
	const entry = await runDynamicImports(data?.entry);
	return {
		...(data || {}),
		entry
	};
};
```

## Automatic routes generation

All this is quite a bit of boilerplate. That's why we have a script that will generate all of this
automatically from the `routes.config.json` file.

The config file is an object with a root route folder and an array of routes containing the
following properties:

```ts
		{
			"typeName": string | string[], // The GraphqlQL __typename(s) generated by Craft CMS
			"uri": string[], // An array if the section's uri formats, found in the section settings in Craft, or of Sveltekit route names.
			"dynamicImports": boolean, // Wether the route requires dynamic imports or not.
			"layoutGroup": string // The layout group name that the route should be placed in (without parantheses).
		},
```

The root property tells the script in which folder to create the routes.

Example:

```json
{
	"root": "[locale=lang]",
	"routes": [
		{
			"typeName": ["Pages_Default_Entry", "Pages_StoryTelling_Entry"],
			"uri": ["[...uri]"],
			"dynamicImports": true
		},
		{
			"typeName": "Blog_Blog_Entry",
			"uri": ["blog", "blogue"],
			"dynamicImports": true
		},
		{
			"typeName": "Articles_Default_Entry",
			"uri": ["blog/{slug}", "blogue/{slug}"]
		},
		{
			"typeName": "Contact_Contact_Entry",
			"uri": ["contact"]
		},
		{
			"typeName": "ProjectsPortal_ProjectsPortal_Entry",
			"uri": ["projects", "projet"],
			"layoutGroup": "projects"
		},
		{
			"typeName": "Projects_Default_Entry",
			"uri": ["projects/{slug}", "projet/{slug}"],
			"layoutGroup": "projects"
		}
	]
}
```

You can run the script by using the command `npm run routes`. This will scaffold a route folder with
all the necessary code already in place. It will also generate param matchers for routes that have
multiple different uri formats.

After that, the only thing left to do is to create and export a GraphQL fragment for every route
generated inside `$gql/fragments/pages.ts`.
