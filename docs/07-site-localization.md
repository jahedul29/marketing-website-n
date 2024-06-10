# Site localization

By default, this starter is setup to support a localized site. We attach a `Locale` to every
request, and this `Locale` is a combination of supported `Language` and `Region`.

`Language` is mostly what you want to use for all things translations and urls. A `Locale` is
suitable for apis that require more precision, such as date/time and price formatting.

Localization is specially important when dealing with prices and dates. Make sure to use the
provided formatting utils for all your formatting needs.

If your project only supports a single locale and you don't want to have `/en` or `/fr` in the url,
you can adjust the code with the following steps:

-   Remove extra locales in the `SUPPORTED_LOCALES` array in `src/constants.ts`. Only leave the
    site's locale.
-   Change the `root` property in `routes.config.json` to an empty string. This will make the script
    generate the route folders directly in `src/routes`.
-   Move all the routes present in `src/routes/[locale=lang]` to `src/routes`, overwriting the
    sitemap route.
