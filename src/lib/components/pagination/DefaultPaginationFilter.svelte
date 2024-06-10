<script lang="ts">
	import { page } from '$app/stores';
	import ChevronDown from '$com/svg/ChevronDown.svelte';
	import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '$com/ui/listbox';
	import { getPaginationFiltersContext } from '$com/ui/pagination/PaginationFilters.svelte';
	import { fade } from 'svelte/transition';

	type Option = {
		title?: Maybe<string>;
		slug?: Maybe<string>;
	};

	export let name: string;
	export let defaultLabel: string;
	export let options: Option[];

	const { filter } = getPaginationFiltersContext();

	const allOptions: Option[] = [{ slug: '', title: defaultLabel }, ...options];

	let selected: Maybe<Option['slug']> = $page.url.searchParams.get(name) || allOptions[0].slug;

	$: buttonLabel = allOptions.find((option) => option.slug === selected)?.title || defaultLabel;
</script>

{#if options?.length}
	<div class="relative grid grid-stack">
		<Listbox {name} on:change={filter} bind:selected>
			<ListboxButton
				class="text-300 w-full rounded-full border-2 border-grey-100 px-16 py-12 font-medium leading-10 transition-colors hover:bg-grey-100"
			>
				<span class="flex w-full items-center justify-between space-x-8">
					<span>
						{buttonLabel}
					</span>
					<span class="w-12 flex-shrink-0">
						<ChevronDown />
					</span>
				</span>
			</ListboxButton>
			<ListboxOptions class="absolute left-0 top-full z-40 mt-8 min-w-full">
				<div
					class="overflow-hidden rounded-16 bg-white p-8 shadow-500"
					in:fade={{ duration: 50 }}
					out:fade={{ duration: 300 }}
				>
					{#each allOptions as option}
						<ListboxOption value={option.slug} let:active let:selected>
							<div
								class="text-300 cursor-pointer whitespace-nowrap rounded-8 px-12 py-[1rem] font-medium leading-10"
								class:bg-lightblue-300-alpha={active && !selected}
								class:text-blue-500={active && !selected}
								class:bg-grey-100={selected}
							>
								{option.title}
							</div>
						</ListboxOption>
					{/each}
				</div>
			</ListboxOptions>
		</Listbox>
	</div>
{/if}
