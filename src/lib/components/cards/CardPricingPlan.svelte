<script lang="ts">
	import type { Buttons_Default_Entry, PricingPlans_Default_Entry } from 'src/craft';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	export let entry: PricingPlans_Default_Entry;

	const { displayTitle, description, priceTitle, priceDescription, featured } = entry || {};
	const button = entry?.button?.[0] as Buttons_Default_Entry;
</script>

<article
	class="flex flex-col space-y-24 rounded-20 p-24 ring-inset md:space-y-32 md:p-32 {featured
		? 'bg-wheat-200-alpha ring-8 ring-wheat-500'
		: 'ring-2 ring-grey-250'}"
>
	<div class="space-y-12">
		{#if displayTitle}
			<h2 class="text-32 font-medium leading-10 bp:text-26">{displayTitle}</h2>
		{/if}
		{#if description}
			<p class="text-20 font-medium leading-20 text-black-750-alpha">{description}</p>
		{/if}
	</div>
	{#if priceTitle}
		<h3 class="font-medium leading-10">
			<span class="text-48">{priceTitle}</span>{#if priceDescription}<span
					class="text-20 text-black-900-alpha"
				>
					/ {priceDescription}
				</span>
			{/if}
		</h3>
	{/if}
	{#if button}
		<ButtonPrimary {button} color={featured ? 'blue' : 'black'} size="xl" />
	{/if}
</article>
