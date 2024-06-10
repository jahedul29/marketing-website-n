<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOptions,
		ListboxOption
	} from '$com/ui/listbox';
	import ChevronDown from '$com/svg/ChevronDown.svelte';
	import { mounted } from '$lib/stores/mounted';

	const eventTypes = $page.data.eventTypes;
	const longestLabel = eventTypes?.slice().sort((a, b) => {
		const aLength = a?.title?.length || 0;
		const bLength = b?.title?.length || 0;
		if (aLength > bLength) {
			return -1;
		}
		if (aLength < bLength) {
			return 1;
		}
		return 0;
	})?.[0]?.title;

	let selected = eventTypes?.[0]?.slug;
	$: buttonLabel = eventTypes?.find((type) => selected === type?.slug)?.title;
</script>

{#if eventTypes?.length}
	<div class="flex">
		<Listbox bind:selected name="type">
			<div class="flex space-x-4 rounded-full bg-grey-100 pl-8">
				<ListboxLabel
					class="text-100 self-center pl-4 font-medium leading-10 text-black-500-alpha transition-colors ease-linear"
				>
					{t('search.label')}
				</ListboxLabel>
				<div class="relative grid grid-stack">
					<ListboxButton
						class="text-100 appearance-auto rounded-full bg-transparent px-8 py-4 text-left font-medium leading-10 transition-colors hover:bg-grey-250"
					>
						<span
							class="flex w-full items-center justify-between {$mounted
								? 'space-x-4 '
								: ''}"
						>
							<span class="grid grid-stack">
								<span class="opacity-0" aria-hidden="true">{longestLabel}</span>
								<span>{buttonLabel}</span>
							</span>
							<span class="w-[1rem] flex-shrink-0">
								<ChevronDown />
							</span>
						</span>
					</ListboxButton>
					<ListboxOptions class="absolute left-0 top-full mt-8 min-w-full">
						<div
							class="overflow-hidden rounded-16 bg-white p-8 shadow-500"
							in:fade={{ duration: 50 }}
							out:fade={{ duration: 300 }}
						>
							{#each eventTypes as type}
								<ListboxOption value={type?.slug} let:selected let:active>
									<div
										class="text-100 cursor-pointer whitespace-nowrap rounded-8 px-12 py-[1rem] font-medium leading-10"
										class:bg-lightblue-300-alpha={active && !selected}
										class:text-blue-500={active && !selected}
										class:bg-grey-100={selected}
									>
										{type?.title}
									</div>
								</ListboxOption>
							{/each}
						</div>
					</ListboxOptions>
				</div>
			</div>
		</Listbox>
	</div>
{/if}
