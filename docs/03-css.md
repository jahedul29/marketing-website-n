# CSS

This starter kit uses Tailwind, but also allows for custom css.

You can use a `<style>` tag in every Svelte component to write some custom styles. They will be
scoped to the component.

If you need globally available custom styles, you can put them in `.css` files in the `src/lib/css`
directory. This starter already has several global custom css files by default.

If you need to write custom classes, you should prefix them with `_` (e.g., `._my-custom-class`) so
we can distinguish them easily from Tailwind classes.

## main.css

This is where the Tailwind styles and all custom css files are imported (using the `postcss-import`
package). If you create a new css file, you have to import it here.

This file is directly imported in `+layout.svelte` and is loaded as a global css file in production.

## fonts.css

Use this file to declare all your `@font-face` rules.

### A note on fonts

All your font files should be found in the `src/lib/fonts` directory.

You can use the `font-setup.js` script to automatically lowercase font files and generate
`@font-face` rules in `fonts.css` with the following command:

```
npm run font-setup
```

## reset.css

This file adds some custom css resets to the Tailwind preflight.

## site.css

This file is for all basic custom styles not already provided by Tailwind. This is also where we
apply responsive font sizes.

### A note on font size

With our default setup, the font size is `1rem` = `10px` at exactly 800px and at 1600px and above.

When the screen size is outside of these breakpoints, `1rem` becomes a value calculated with the
viewport width, so that all spacing and size values scale with the viewport.

## prose.css

This is where you can put all the markdown/rich text styles. Modify according to your project needs.

## utils.css

Here you can put every utility you need that Tailwind cannot provide.

## watchdog.css

This is a collection of known problems we want to avoid at all cost. By using the `.WATCHDOG` class,
we get a nasty overlay and a message on offending elements. Please, contribute to this file when you
encounter a combination of classes or html elements that are invalid or problematic.

## Tailwind plugins

You can write your own custom Tailwind plugins inside the `tailwind/plugins` folder. There should be
only one plugin per file.

Present by default are:

-   `flex-grid`: A plugin to quickly create a flexbox grid using negative margins on the parent and
    padding on the children. The values found in the `spacing` property of the config are used.
-   `palette`: A plugin to externalise symbolic color name resolution. It uses a special file called
    `tailwind/palettes.json`. See [color palettes](22-color-palettes.md) for more informations.
-   `watchdog`: A plugin that creates two components classes, .WATCHDOG and .WATCHDOG-BEFORE, used
    in `watchdog.css`. This plugin in only loaded when `NODE_ENV` (and `NODE_ENV_OVERRIDE`) is not
    `production`.
