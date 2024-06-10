# Languages and translations

While most of the text content should come from the CMS, certain short labels are better handled
when hardcoded. Error messages must also come from hardcoded translations. To be able to translate
them, you can use this system.

For every language available in your project's CMS, there should be a `.ts` file associated with it
in every `src/lib/translations/*` directories.

Each directory contains both `en.ts` and `fr.ts` files. These files export a variable of the same
name containing an object of translations. Property names are what you reference in the templates,
and the string values are what will be displayed.

The "global" directory is reserved for global translations, available throughout the whole site, on
every page as well as on the server. These translations are loaded from the top layout server load
function.

The "filesize" directory is required by the [`humanSize`](../src/lib/utils/ui/humanSize.ts) module.
It is **not** included by default and [requires setup](#setting-up-translations).

The "duration" directory is required by the
[`humanDuration`](../src/lib/utils/format/humanDuration.ts) module. It is **not** included by
default and [requires setup](#setting-up-translations).

## Writing translations

By default, this starter comes with some translations. You can add your own in the "global"
directory and overwrite the default ones by writing them in the `PROJECT` object. Remember that
global transitions are returned to the client for every request made.

You have to add the same property in every translation files with the appropriate value.

To help with consistency across files, a `Translation.Global` type is derived from the `en` object.
If you cast your exported objects from other translation files with this type, Typescript will
indicate an error if properties don't match. For example:

In [`global/en.ts`](../src/lib/translations/global/en.ts):

```ts
const PROJECT = {
	articleShare: 'Share this article',
	pageNotFound: 'Page non trouvée'
};
```

In [`global/fr.ts`](../src/lib/translations/global/fr.ts):

```ts
const PROJECT: Translation.Project = {
	articleShare: 'Partager cet article',

	// Typescript will show an error for properties that are not found in en.ts
	unknownProperty: ''

	// Typescript will show an error for properties that are missing, according to those found in en.ts
};
```

## Using translations

To use these translations in your project, wether it be in a Svelte component or a `.ts` file, you
can import the `t` function from
[`$lib/translations/global`](../src/lib/translations/global/index.ts). If you need this function in
a server endpoint, use `event.locals.t`.

This function accepts as a first argument a string with the property key you want to access. It will
return the property value associated with the current language.

You can access nested properties by separating the keys with a `'.'`.

The translation values can be strings, numbers, booleans, arrays and objects. `string` is the
default return type. If you want to get a different type, use the first template parameter to
specify a different return type.

In `fr.ts`:

```ts
const PROJECT = {
	translatableTitle: 'This is my title',
	my: {
		nested: {
			property: 'This is my nested property'
		}
	},
	myArrayProp: ['hello', 'world'],
	myComplexProp: [
		{
			id: 1,
			firstName: 'Oliver',
			lastName: 'Twist'
		},
		{
			id: 2,
			firstName: 'Luke',
			lastName: 'Skywalker'
		}
	]
};
```

In `fr.ts`:

```ts
const PROJECT = {
	translatableTitle: 'Ceci est mon titre',
	my: {
		nested: {
			property: 'Ceci est pas propriété imbriquée'
		}
	},
	myArrayProp: ['bonjour', 'monde'],
	myComplexProp: [
		{
			id: 1,
			firstName: 'Oliver',
			lastName: 'Twist'
		},
		{
			id: 2,
			firstName: 'Luke',
			lastName: 'Skywalker'
		}
	]
};
```

In `AnyFile.svelte`:

```svelte
<script lang="ts">
	import { t } from '$lib/translations/global';

	// Getting an array of strings
	const myArrayProp = t<string[]>('myArrayProp');

	// Getting a complexe type from the Translation.Global definition
	const myComplexProp = t<Translation.Global['myComplexProp']>('myComplexProp');
</script>

<h1>{t('translatableTitle')}</h1>
<h2>{t('my.nested.property')}</h2>

// At /en, output is:
<h1>This is my title</h1>
<h2>This is my nested property</h2>
// At /fr, output is:
<h1>Ceci est mon titre</h1>
<h2>Ceci est pas propriété imbriquée</h2>

{#each myArrayProp as word}
	{word}
	<br />
{/each}
{#each myComplexProp as person}
	{person.id} - {person.firstName}
	{person.lastName}
	<br />
{/each}
```

If no translation is found, a warning will be printed to the browser console (in dev mode only). The
output of the function will be the key passed in.

## Dynamic translations

You can have basic dynamic translations with the bracket syntax:

In `en.ts`:

```ts
const PROJECT = {
	myDynamicTranslation: 'Available from {startDate} to {endDate}'
};
```

In `fr.ts`:

```ts
const PROJECT: Translation.Project = {
	myDynamicTranslation: 'Disponible du {startDate} au {endDate}'
};
```

You can then pass a data object containing the dynamic values as a second argument to the `t`
function.

These will work with any value type (string, array or object).

In `AnyFile.svelte`

```html
<script lang="ts">
	import { t } from '$lib/translations/global';
</script>

<p>{t('myDynamicTranslation', { startDate: '13/01/2021', endDate: '16/01/2021' })}</p>

// At /en, output is:
<p>Available from 13/01/2021 to 16/01/2021</p>
// At /fr, output is:
<p>Disponible du 13/01/2021 au 16/01/2021</p>
```

## Global translations on the server

Sometimes you might need translations on the server. You won't be able to use the `t` function from
`$lib/translations` here, but we provide one in the `locals` object.

```ts
export const GET: RequestHandler = async ({ locals }) => {
	return json({
		message: locals.t('my.message')
	});
};
```

## Setting up translations

Sometimes you need to add translations that are page or module specific. To avoid bloating the
global translations object, you should create separate directories with their own translations and
load them when you need them, usually from a layout or page server load function.

### Creating a translation folder

Each translation folder has to have a `.ts` file for every supported language, an `index.ts` file
that exports its own `t` function and a `types.d.ts` file for types. To speed up the process and
avoid errors, you can use the `create-translation` script like so:

```bash
npm run create-translation <folder-name>
```

This will scaffold everything you need under the provided folder name.

For example, running:

```bash
npm run create-translation contact-page
```

will generate the following:

```
├── translations
|	|--contact-page
|	|	├── en.ts
│   |	├── fr.ts
│   |	├── index.ts
│   |	├── types.d.ts
```

You can now modify the languages files to add your own translations and load them in your pages or
layouts.

### Loading the translations

You can load your translations inside a page/layout load function with the
[getTranslations](../src/lib/translations//getTranslations.ts) helper. `getTranslations` returns an
object with a unique key for the translations object, so you need to spread the returned value in
the data object.

```ts
import { getTranslations } from '$lib/translations/getTranslations';

export const load = async (event) => {
	// normal stuff...

	const contactTranslations = await getTranslations('contact-page', event.locals.language);

	return {
		// ... your data

		// Add new translations (spread the return value since its an object)
		...contactTranslations
	};
};
```

Now, in your svelte file, you can import the proper `t()` function from your new folder. This
function will automatically get the data from the load function.

```svelte
<script lang="ts">
	import { t } from '$lib/translations/contact-page';
</script>
```

You can also create a server side `t()` function like so:

```ts
import { tFactory } from '$lib/translations/factory.server';

export const load = (event) => {
	const t = await tFactory('contact-page', event.locals.language);
};
```

If you need to have a translation group available on all pages (just like the global translations),
you can add your translations to the `translations` object returned from the top
`+layout.server.ts`:

```ts
import { getTranslations } from '$lib/translations/getTranslations';

export const load = async ({ locals }) => {
	const { language, language, region } = locals;
	const [global, cookieBanner] = await Promise.all([
		getTranslations('global', language),
		getTranslations('cookie-banner', language)
	]);
	return {
		...global,
		...cookieBanner
		locale,
		language,
		region
	};
};
```
