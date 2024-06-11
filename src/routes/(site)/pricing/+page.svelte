<script lang="ts">
	import type { PageData } from './$types';
	import HeaderPricing from '$com/headers/HeaderPricing.svelte';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import PricingPlansTable from '$com/pricing/PricingPlansTable.svelte';

	export let data: PageData;

	const { entry, pricingPlans, pricingFeatures } = data || {};
	const { modules, pricingTableTitle } = entry || {};
	console.log(modules);
</script>

<DefaultRythm>
	<HeaderPricing {entry} {pricingPlans} />
	<PricingPlansTable title={pricingTableTitle} {pricingPlans} {pricingFeatures} />
	<ComponentSelector entries={modules} />
</DefaultRythm>
