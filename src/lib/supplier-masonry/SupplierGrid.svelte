<script lang="ts">
	import type { Suppliers_Default_Entry } from 'src/craft';
	import { parallax } from '$lib/actions/parallax';
	import { scrollAnimation } from '$lib/actions/scrollAnimation';
	import { randomIndexGenerator } from '$lib/utils/ui/randomIndexGenerator';
	import CardSuppliers from '$com/cards/CardSuppliers.svelte';

	export let suppliers: Suppliers_Default_Entry[];

	// Group suppliers by 2
	const getSupplierGroups = () => {
		const midIndex = Math.floor(suppliers.length / 2);
		const firstPart = suppliers?.slice(0, midIndex);
		const secondPart = suppliers?.slice(midIndex);
		return firstPart.map((supplier, i) => {
			return [supplier, secondPart[i]];
		});
	};

	const getRandomIndex = randomIndexGenerator(suppliers?.length);
</script>

<div class="hidden w-full max-w-[1400px] grid-cols-5 gap-32 py-120 bp:grid" use:scrollAnimation>
	{#each getSupplierGroups() as supplierGroup, groupIndex}
		<div
			class="grid gap-32 transition-transform duration-500 ease-out-expo odd:-translate-y-20 even:translate-y-20"
			use:parallax={{
				speed: groupIndex % 2 === 0 ? 0.05 : -0.05
			}}
		>
			{#each supplierGroup as supplier}
				<div class="_scroll-fade-in" style="--i: {getRandomIndex()};">
					<CardSuppliers entry={supplier} />
				</div>
			{/each}
		</div>
	{/each}
</div>
