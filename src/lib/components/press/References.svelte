<script lang="ts">
	import type { References_Reference_BlockType } from 'src/craft';
	import { t } from '$lib/translations/global';
	import { REFERENCES_PER_PAGE } from '$lib/constants';
	import CardReference from '$com/cards/CardReference.svelte';
	import Pagination from '$com/ui/pagination/Pagination.svelte';
	import PaginationLoadMore from '$com/ui/pagination/PaginationLoadMore.svelte';
	import ButtonPrimaryInner from '$com/buttons/ButtonPrimaryInner.svelte';

	export let references: Maybe<References_Reference_BlockType>[] = [];
	export let itemsTotal: number;

	const getItems = async (offset: number) => {
		try {
			const res = await fetch(`/api/get-references?offset=${offset}`);
			return res.json();
		} catch (error) {
			console.error(error);
			return { items: [], itemsTotal: 0 };
		}
	};
</script>

{#if references?.length}
	<section
		class="mx-auto flex max-w-max flex-col items-start space-y-32 px-20 bp:space-y-60 bp:px-120"
	>
		<h2 class="text-700 font-medium leading-10">{t('press.referencesTitle')}</h2>
		<Pagination
			initialItems={references}
			{itemsTotal}
			{getItems}
			itemsPerPage={REFERENCES_PER_PAGE}
			let:items
			let:state
		>
			<ul class="grid gap-32 bp:grid-cols-3 bp:gap-x-24 bp:gap-y-60">
				{#each items as entry (entry?.id)}
					<li>
						<CardReference {entry} />
					</li>
				{/each}
			</ul>
			<PaginationLoadMore class="_primary flex self-center" classDisabled="hidden">
				<ButtonPrimaryInner>
					{#if state === 'loading'}
						{t('press.loading')}
					{:else}
						{t('press.showMore')}
					{/if}
				</ButtonPrimaryInner>
			</PaginationLoadMore>
		</Pagination>
	</section>
{/if}
