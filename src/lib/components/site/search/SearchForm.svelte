<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import Search from '$com/svg/Search.svelte';
	import CityInput from './CityInput.svelte';
	import EventTypesDropdown from './EventTypesDropdown.svelte';

	const eventTypes = $page.data.eventTypes;
</script>

{#if eventTypes?.length}
	<form
		action="/api/get-search-url"
		method="GET"
		target="_blank"
		rel="noopener norferrer"
		class="_intro-header hidden space-x-4 rounded-full bg-grey-100 py-4 pr-4 bp:flex"
		style="--section: 2; --i: 0;"
	>
		<EventTypesDropdown />
		<div class="flex py-4">
			<div class="w-[1px] bg-black-100-alpha" />
		</div>
		<CityInput />
		<button
			type="submit"
			aria-label={t('search.label')}
			class="self-center rounded-full bg-grey-900 text-white transition-colors hover:bg-blue-500"
		>
			<span class="flex h-24 w-24 items-center justify-center">
				<span class="w-12">
					<Search />
				</span>
			</span>
		</button>
	</form>
{/if}
