# Tailwind Types

You can generate types from your Tailwind config by running `npm run codegen`. The script will
generate a `tailwind.d.ts` file that will contain all the properties and values from the config
under the `TW` namespace.

To use the types in your project, you can access the `TW` namespace anywhere, then use dot notation
to access the property you want to use as type.

```ts
export let colors: TW.Colors = 'brand';
```
