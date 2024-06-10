<!--@docs
Outputs a website copyright in a standardized way. The publish year is
the year the site was put online. If the current year is greater, the output will automatically
be updated to display a range of year.

##### Example

@exec CopyrightPastYear.svelte

```svelte
	<Copyright orgName="288 inc." publishYear={2022} />
```

@exec CopyrightCurrentYear.svelte

```svelte
	<Copyright orgName="288 inc." publishYear={new Date().getFullYear()} />
```
-->
<script lang="ts">
	import { page } from '$app/stores';

	/**
	 * The year the website was put online.
	 */
	export let publishYear: number;

	/**
	 * The organization name to display in the copyright.
	 */
	export let orgName = $page.data.config?.organization?.[0]?.organizationName;

	const currentYear = new Date().getFullYear();
</script>

{#if orgName}
	&#169;&nbsp;{publishYear}{#if publishYear < currentYear}&nbsp;&ndash;&nbsp;{currentYear}{/if}&nbsp;{orgName}
{/if}
