<script lang="ts">
	import type { Suppliers_Default_Entry } from 'src/craft';
	import Marquee from '$com/ui/Marquee.svelte';
	import CardSuppliers from '$com/cards/CardSuppliers.svelte';

	export let suppliers: Suppliers_Default_Entry[];
</script>

<div class="w-full bp:hidden">
	<Marquee gap="20" speed={30000} direction="inverted">
		<div class="flex space-x-20 py-60">
			{#each suppliers as supplier}
				<div class="w-[60vw] flex-shrink-0 odd:-translate-y-20 even:translate-y-20">
					<CardSuppliers entry={supplier} disableLink />
				</div>
			{/each}
		</div>
	</Marquee>
</div>
