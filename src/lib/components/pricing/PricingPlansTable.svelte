<script lang="ts">
	import type {
		Buttons_Default_Entry,
		PricingFeatures_Default_Entry,
		PricingPlans_Default_Entry
	} from 'src/craft';
	import { t } from '$lib/translations/global';
	import FeaturesTable, {
		type Columns,
		type FeatureGroups
	} from '$com/features-table/FeaturesTable.svelte';
	import BlueCheckmark from '$com/svg/BlueCheckmark.svelte';
	import Unavailable from '$com/svg/Unavailable.svelte';

	export let title: Maybe<string> = null;
	export let pricingPlans: PricingPlans_Default_Entry[];
	export let pricingFeatures: PricingFeatures_Default_Entry[];

	const columns = pricingPlans?.map((plan) => {
		return {
			entry: plan,
			featured: plan?.featured || false,
			title: plan?.displayTitle,
			button: plan?.button?.[0] as Buttons_Default_Entry
		};
	}) satisfies Columns<PricingPlans_Default_Entry>;

	const featureGroups = [
		{
			features: pricingFeatures?.map((feature) => {
				return {
					entry: feature,
					title: feature?.displayTitle,
					description: feature?.description,
					unavailable: !feature?.available
				};
			})
		}
	] satisfies FeatureGroups<PricingFeatures_Default_Entry>;

	const isFeatureInPlan = (
		plan: PricingPlans_Default_Entry,
		pricingFeature: PricingFeatures_Default_Entry
	) => {
		return plan.pricingFeatures?.find((feature) => feature?.id === pricingFeature.id);
	};

	const getCustomTextForPlan = (
		plan: PricingPlans_Default_Entry,
		pricingFeature: PricingFeatures_Default_Entry
	) => {
		return pricingFeature.pricingPlansCustomText?.find(
			(block) => block?.pricingPlan?.[0]?.id === plan.id
		)?.text;
	};
</script>

<FeaturesTable {title} {columns} {featureGroups}>
	<svelte:fragment slot="cell" let:columnEntry={pricingPlan} let:featureEntry>
		{@const available = featureEntry?.available}
		{@const customText = getCustomTextForPlan(pricingPlan, featureEntry)}
		{#if !available}
			{t('features.comingSoon')}
		{:else if customText}
			{customText}
		{:else}
			<span class="w-16">
				{#if isFeatureInPlan(pricingPlan, featureEntry)}
					<span class="sr-only">
						{t('features.available')}
					</span>
					<BlueCheckmark />
				{:else}
					<span class="sr-only">
						{t('features.unavailable')}
					</span>
					<Unavailable />
				{/if}
			</span>
		{/if}
	</svelte:fragment>
</FeaturesTable>
