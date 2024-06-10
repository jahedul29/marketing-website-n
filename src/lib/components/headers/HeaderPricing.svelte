<script lang="ts">
	import type { PricingPlans_Default_Entry, Pricing_Pricing_Entry } from 'src/craft';
	import CardPricingPlan from '$com/cards/CardPricingPlan.svelte';
	import HeaderSimple from '$com/headers/HeaderSimple.svelte';

	export let entry: Pricing_Pricing_Entry;
	export let pricingPlans: PricingPlans_Default_Entry[];

	const surtitle = entry?.surtitle;
	const displayTitle = entry?.displayTitle;
	const plainText = entry?.plainText;
</script>

<HeaderSimple {surtitle} {displayTitle} {plainText}>
	{#if pricingPlans?.length}
		<ul
			class="mx-auto mt-80 flex max-w-max flex-col gap-32 bp:flex-row bp:items-start bp:justify-center bp:gap-40"
		>
			{#each pricingPlans as entry, i}
				<li class="_intro-reveal-lg max-w-400 bp:flex-1" style="--i: {i};">
					<CardPricingPlan {entry} />
				</li>
			{/each}
		</ul>
	{/if}
</HeaderSimple>
