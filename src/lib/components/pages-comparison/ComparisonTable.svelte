<script lang="ts">
	import type { Companies_Default_Entry, CompanyFeatures_Default_Entry } from 'src/craft';
	import FeaturesTable, {
		type Column,
		type Feature,
		type FeatureGroup
	} from '$com/features-table/FeaturesTable.svelte';
	import { t } from '$lib/translations/global';
	import Unavailable from '$com/svg/Unavailable.svelte';
	import Unknown from '$com/svg/Unknown.svelte';
	import BlueCheckmark from '$com/svg/BlueCheckmark.svelte';
	import FeaturesTableTooltip from '$com/features-table/FeaturesTableTooltip.svelte';

	export let entry: PagesComparison;

	const tableSurtitle = entry?.surtitle;
	const tableTitle = entry?.plainTitle;
	const companies = (entry?.comparedCompanies || []) as Companies_Default_Entry[];
	const columns = companies.map((company) => {
		return {
			featured: company.featured || false,
			entry: company,
			title: company.displayTitle,
			description: company.description
		};
	}) satisfies Column<Companies_Default_Entry>[];
	const featureGroups = entry?.companyFeatureGroups?.map((block) => {
		const features = (block?.features || []) as CompanyFeatures_Default_Entry[];
		return {
			title: block?.displayTitle,
			features: features.map((feature) => {
				return {
					entry: feature,
					title: feature.displayTitle,
					description: feature.description
				} satisfies Feature<CompanyFeatures_Default_Entry>;
			})
		};
	}) satisfies FeatureGroup<CompanyFeatures_Default_Entry>[];

	const getFeatureDataForCompany = (
		feature: CompanyFeatures_Default_Entry,
		company: Companies_Default_Entry
	) => {
		return feature.availableFor?.find((block) => block?.company?.[0]?.id === company.id);
	};
</script>

<FeaturesTable {columns} {featureGroups}>
	<svelte:fragment slot="title">
		<div>
			{#if tableSurtitle}
				<p class="mb-12 text-center text-16 font-medium leading-10 text-blue-500">
					{tableSurtitle}
				</p>
			{/if}
			{#if tableTitle}
				<h2 class="mx-auto max-w-660 text-center text-48 font-medium">{tableTitle}</h2>
			{/if}
		</div>
	</svelte:fragment>
	<svelte:fragment slot="cell" let:columnEntry={company} let:featureEntry={feature}>
		{@const data = getFeatureDataForCompany(feature, company)}
		{#if !data}
			<span class="sr-only">
				{t('features.unavailable')}
			</span>
			<span class="_icon">
				<Unavailable />
			</span>
		{:else}
			{@const { text, tooltip, unknown } = data}
			{#if unknown}
				<span class="sr-only">
					{t('features.unknown')}
				</span>
				<span class="_icon">
					<Unknown />
				</span>
			{:else if text}
				<FeaturesTableTooltip title={text} description={tooltip} isCell />
			{:else}
				<span class="sr-only">
					{t('features.available')}
				</span>
				<span class="_icon">
					<BlueCheckmark />
				</span>
			{/if}
		{/if}
	</svelte:fragment>
</FeaturesTable>

<style lang="postcss">
	._icon {
		@apply flex w-16 bp:w-24;
	}
</style>
