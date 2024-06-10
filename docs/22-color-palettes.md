# Color palettes

When creating the mock ups, designer will create symbolic colors in order to create a fixed set of
colors to use in the interface. They pick the color values for those symbolic colors from a larger
set, called a palette. Palettes have name, like `black-smoke` and represent a range of specific
values in a gradient.

In our code, we want to mimic what's in the designer's head, so are using the same symbolic names as
colors in tailwind. The default ones are:
`"main", "alt", "mid", "shade-400", "shade-300", "shade-200", "shade-100", "main-invert", "alt-invert", "mid-invert", "shade-400-invert", "shade-300-invert", "shade-200-invert", "shade-100-invert", "brand"`.
Tailwind then generates classes like `text-main` or `bg-main-invert`. It also works well with
[Tailwind's vscode extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

To make is easy to edit, the data is stored `tailwind/palettes.json`. We can then let designers
defined the mapping. They are encouraged to create pull requests to edit the file.

Each symbolic values resolves to a palette color using the dot notation, `palette.color`.

## Prefer color scheme

Symbolic colors always have 2 real values: one for the light mode and another for the dark mode.
Designers should then provide values for both cases.

## Inverted Theme

It is possible to invert the theme (changing from light to dark or vice versa) by using the Frame's
`invertedTheme` property or the `inverted-theme` css class. Make sure to **set a proper background**
on the element that inverts the context.

## Adding new symbolic values

Simply add them in the json file. Then make sure to tell typescript about it, by tweaking the
`ColorValue` type in `$lib/tailwind/units.ts`.
