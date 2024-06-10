# File structure

## test

This is where our unit and component tests live.

## scripts

These scripts help us with setting up projects quickly.

## tailwind

This is where our custom Tailwind plugins are found, as well as some scripts.

## static

The `static` folder contains the static assets used for the project, like icons, images, humans.txt,
etc. They will be directly copied to the build output directory without any processing.

## src

This is where most of the project development takes place. We will only document what is specific to
the starterkit, as the rest is explained very well in
[Sveltekit's documentation](https://kit.svelte.dev/docs/project-structure).

### .d.ts files

These files contain our global types. They are declared in the `global` scope so we don't have to
import them to use them. We recommend adding files for project specific types when possible instead
of overwriting the existing files.

#### app.d.ts

This a Sveltekit specific file, documented here: https://kit.svelte.dev/docs/types#app.

#### global.d.ts

Types representing the global data loaded from the cms.

#### cms.d.ts

These are helper types that we use to type entries we fetch from the cms.

#### craft.d.ts

All the Craft's schema types generated in the `codegen` script (see
[01-getting-started](./01-getting-started.md)).

#### tailwind.d.ts

All the types generated from the Tailwind config in the `codegen` script (see
[01-getting-started](./01-getting-started.md)).

#### lang.d.ts

Contains helper types `Maybe` and `MaybeUndefined`.

#### svelte-jsx.d.ts

This file is used to declare html attributes that are unknown to Svelte and custom events. Not
declaring them results in a type error, even though the attribute or event may be valid.

### hooks.server.ts

This a Sveltekit specific file, documented here: https://kit.svelte.dev/docs/hooks#server-hooks.

The order in the sequence is **absolutely critical**: since handles are processed in a chain, the
output of one handle becomes the input of the next. We start with handles that add utility data and
functions in the `event.locals` object, then run the handles that rewrites requests. We end with
handles that modify the responses.

While you can add as many `handle` functions as you need, reasons for new handlers in a client
project are scarce. _Make sure to put your handler in the proper place in the sequence._

The `sequence` function does the following:

1. Utility data and functions

    - `langRedirect`: If the site is localized, requests to the root url will be redirected to the
      preferred user language. Adds the request `language` to locals.
    - `cacheApi`: Adds the required api to control edge/browser caching of responses.
    - `translationApi`: Provides a `t` function to use translations server side.

2. Request rewriters
    - `preview`: Loads the previewed entry if in preview mode (see [Previews](14-previews.md)).
3. Html transforms
    - `lang`: Gets the user language and appropriate translation data. It also modifies the page
      markup (if any) to output the correct lang attribute on the `html` element.
    - `gtm`: Replaces the %gtm.body% and %gtm.head% placeholders with either empty string (dev,
      preview modes, no GTM_ID env var) or the default GTM script and noscript tags.
    - `date`: Replaces the %request.date% placeholder with the current UTC date.
    - `themeColor`: Replaces the %theme-color.light% and %theme-color.dark% placeholders with the
      `theme-color` properties from `palettes.json`.
4. Response modifiers
    - `cacheHeaders`: Adds the required caching headers to the response.

## src/lib

### actions

This is where you can put your Svelte actions (https://svelte.dev/docs#use_action).

### server

This is where you can find all the Graphql related files (see
[Querying Craft entries](09-querying-craft-entries.md)), as well as some server only functions. Note
that since the folder is named 'server', importing any module from it in client-side code will throw
an error.

### components

Here is where most of the `.svelte` components are found (except for page components, which are in
the `src/routes` folder).

This folder contains sub-folder to organize your components and their names are pretty
self-explanatory. These can be modified to suit your project needs.

### css

See [Css](03-css.md).

### stores

This is where you can put all your Svelte stores (https://svelte.dev/docs#svelte_store). We already
have some [stores](./31-stores.md) that you can use.

### translations

See [Languages and translations](06-languages-and-translations.md).

### dynamic-imports

See [dynamic imports](./28-dynamic-imports.md).

### tailwind

Here we keep some runtime functions and types related to Tailwind. See
[Tailwind property syntax](./16-tailwind-property-syntax.md).

### layouts and modules

These are Svelte components that are dynamically imported in the `routes`.

### utils

See [Utility functions](12-utility-functions.md)

### constants.ts, env-private.ts and env-public.ts

See [Environment and constant variables](04-environment-and-constant-variables.md).

### ComponentSelector.svelte

A helper component to output dynamically imported components. See
[dynamic imports](./28-dynamic-imports.md).

## src/routes

This is where the site pages live. See [Pages and routing](08-pages-and-routing.md).
