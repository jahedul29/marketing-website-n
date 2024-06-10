# Environment and constant variables

## Constant variables

Any global constant variables that your project needs can be written in and exported from
[constants.ts](../src/lib/constants.ts).

You should also update the `SUPPORTED_LOCALES` according to your project's needs. Make sure to put
the default locale first in the array, so that `DEFAULT_LOCALE` and `DEFAULT_LANGUAGE` do not need
any ajustement. `SUPPORTED_LANGUAGES` is able to work with the provided locales. If the logic does
not suits your need, you can change accordingly.

By default, the only supported region is `'ca'`. Make sure to adjust the `Region` type if you need
to create a `Locale` in another region. The type is located in [i18n.d.ts](../src/i18n.d.ts).

This is also where you would configure your project's `TIMEZONE` and `START_OF_DAY`, which are used
as default values for all `intl` and `i18n` related apis.

## Environment variables

Environment variables can be statically declared in `.env.*` files, which also provides default
values for build and runtime environnement variables. Values in `.env.local` are always used. If a
value needs to change depending on vite's mode (production/development), configure it in both
`.env.development.local` and `.env.production.local` files. Keep in mind that _all_ builds on Vercel
are in production mode and values from `.env.*` files will be used if not exported by the real
environnement. See [Create a new project](00-create-new-project.md) for required environnement
variable overrides.

All variables are considered private by default and won't be accessible from the client. If you need
to access a variable in the browser, you _MUST_ prefix it with `PUBLIC_`.

### Example in `.env.local`:

```
# Private variable
SERVER_APY_KEY=private_value

# Public variable
PUBLIC_CLIENT_API_KEY=public_value
```

You can then access your variables by importing them from
[Sveltekit's env modules](https://kit.svelte.dev/docs/modules#$env-dynamic-private).

The starterkit already exposes some convenient variables split into two files.

env-public.ts:

-   ENV (`'development' | 'production'`): The current environment.
-   SITE_URL (string): The current environment site url
-   isProduction (`() => boolean`): Returns `true` if the current environment is `production`.
-   isPreview (`() => boolean`): Returns `true` if the current environment is not `production`.

env-private.ts:

-   CMS_URL (string): The CMS url.
-   API_URL (string): The Graphql api url.

All those values can be consulted at the `/env` endpoint, except on production builds.
