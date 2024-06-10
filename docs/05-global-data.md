# Global data

In any project, there is some data that has to be available globally.

The `+layout.server.ts` file is responsible for fetching this data.

By default, it provides:

-   `locale`: the current locale of the request, based on supported locales.
-   `language`: the current language, inferred from the locale.
-   `region`: the current region, also inferred from the locale.
-   `translations`: the translations associated with the current locale
-   `config`: the "configuration" global set from the CMS

You can query and return any data you need in this file.

To add a property, you should first declare it on the `App.PageData` interface in `app.d.ts`. Then
you have to add it to the `getGlobalSets` query in `$lib/server/graphgql/queries/globals.ts` using a
Graphql alias (see <https://atheros.ai/blog/how-to-use-graphql-aliases>). The alias you choose will
correspond to the property added to the `globals` store.

In [app.d.ts](../src/app.d.ts):

```ts
interface PageData extends GlobalSets {
	// From layout
	locale: Locale;
	language: Language;
	region: Region;
	// From pages
	entry?: NormalizedCraftPage;

	myNewProperty?: string;
}
```

In `$gql/queries/globals.ts`:

```ts
export const GET_GLOBAL_SETS = `
	query getGlobalSets($site: [String]!) {

		myNewProperty: globalSet(handle: "myNewGlobalHandle", site: $site) {
			... on myNewGlobalHandle_GlobalSet {
				// Global set fields...
			}
		}

		config: globalSet(handle: "configuration", site: $site) {
			... on configuration_GlobalSet {
				seo {
					...SEO
				}
				twitterHandle
				organization {
					... on organization_organization_BlockType {
						organizationName
						organizationLogo {
							...Image
						}
						organizationAddress
						organizationEmail
						organizationPhone
					}
				}
				socials {
					... on socials_platform_BlockType {
						platformName
						platformUrl
						platformLogo {
							...Image
						}
					}
				}
			}
		}
	}

	${image}
	${seo}
`;
```
