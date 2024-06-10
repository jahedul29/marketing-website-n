<script context="module" lang="ts">
	export type Column<TColumnEntry> = {
		entry: TColumnEntry;
		featured: boolean;
		title?: Maybe<string>;
		description?: Maybe<string>;
		button?: Maybe<Buttons_Default_Entry>;
	};

	export type Columns<TColumnEntry> = Column<TColumnEntry>[];

	export type Feature<TFeatureEntry> = {
		entry: TFeatureEntry;
		title?: Maybe<string>;
		description?: Maybe<string>;
		unavailable?: boolean;
	};

	export type Features<TFeatureEntry> = Feature<TFeatureEntry>[];

	export type FeatureGroup<TFeatureEntry> = {
		title?: Maybe<string>;
		features?: Feature<TFeatureEntry>[];
	};

	export type FeatureGroups<TFeatureEntry> = FeatureGroup<TFeatureEntry>[];
</script>

<script lang="ts">
	import type { Buttons_Default_Entry } from 'src/craft';
	import FeaturesTableRow from '$com/features-table/FeaturesTableRow.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import FeaturesTableCell from '$com/features-table/FeaturesTableCell.svelte';

	type ColumnEntry = $$Generic;
	type FeatureEntry = $$Generic;

	interface $$Slots {
		title: Record<string, never>;
		cell: {
			columnEntry: ColumnEntry;
			featureEntry: FeatureEntry;
		};
	}

	export let title: Maybe<string> = null;
	export let columns: Column<ColumnEntry>[] = [];
	export let featureGroups: FeatureGroup<FeatureEntry>[] = [];
</script>

<section class="space-y-80 px-20 bp:px-120">
	<slot name="title">
		{#if title}
			<h2 class="mx-auto max-w-400 text-center text-48 font-medium">{title}</h2>
		{/if}
	</slot>
	<div role="table" class="mx-auto max-w-1200">
		<div role="row" class="_features-table-grid-columns grid">
			{#each columns as column, i}
				{@const { featured, title, description } = column}
				<div
					role="cell"
					class="flex flex-col items-center justify-center rounded-t-16 border-x-4 border-t-4 px-8 pb-8 pt-16 text-center bp:border-x-8 bp:border-t-8 bp:px-20 bp:py-40 {featured
						? 'border-wheat-500 bg-wheat-200-alpha'
						: 'border-grey-100 bg-grey-100'}"
					class:col-start-2={i === 0}
				>
					{#if title}
						<div class="text-14 font-medium bp:text-26">{title}</div>
					{/if}
					{#if description}
						<div class="text-14 leading-20 bp:text-20">{description}</div>
					{/if}
				</div>
			{/each}
		</div>
		{#if featureGroups?.length}
			{#each featureGroups as { title, features }}
				<div role="rowgroup">
					{#if title}
						<div role="row" class="_features-table-grid-columns grid">
							<div
								class="pb-20 pt-40 text-20 font-medium bp:px-16 bp:pb-40 bp:pt-80 bp:text-26"
							>
								{title}
							</div>
							{#each columns as { featured }}
								<FeaturesTableCell {featured} />
							{/each}
						</div>
					{/if}
					{#if features?.length}
						{#each features as { title, description, unavailable, entry }}
							<FeaturesTableRow {title} {description} {unavailable}>
								{#each columns as column}
									<FeaturesTableCell featured={column.featured}>
										<slot
											name="cell"
											columnEntry={column.entry}
											featureEntry={entry}
										/>
									</FeaturesTableCell>
								{/each}
							</FeaturesTableRow>
						{/each}
					{/if}
				</div>
			{/each}
		{/if}
		<div role="row" class="_features-table-grid-columns grid">
			<div />
			{#each columns as { featured, button }}
				<div
					class="{featured
						? 'border-wheat-500 bg-wheat-200-alpha'
						: 'border-grey-100 bg-grey-100'} rounded-b-16 border-x-4 border-b-4 p-8 bp:border-x-8 bp:border-b-8 bp:p-40"
				>
					{#if button}
						<div class="bp:hidden">
							<ButtonPrimary {button} color={featured ? 'blue' : 'black'} size="sm" />
						</div>
						<div class="hidden bp:block">
							<ButtonPrimary {button} color={featured ? 'blue' : 'black'} size="xl" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
