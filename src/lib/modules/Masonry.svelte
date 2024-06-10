<script lang="ts">
	import type {
		Buttons_Default_Entry,
		Modules_Masonry_Entry,
		Suppliers_Default_Entry
	} from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import SupplierGrid from '$lib/supplier-masonry/SupplierGrid.svelte';
	import SupplierMarquee from '$lib/supplier-masonry/SupplierMarquee.svelte';

	export let entry: Modules_Masonry_Entry & {
		button?: Buttons_Default_Entry[];
		suppliers?: Suppliers_Default_Entry[];
	};

	const { surtitle, displayTitle, plainText } = entry || {};
	const button = entry?.button?.[0];
	const suppliers = entry?.suppliers;
</script>

<ModuleBase width="screen">
	<div class="bp:px-20">
		<div
			class="flex flex-col items-center rounded-16 bg-grey-900 py-60 text-white bp:rounded-20 bp:px-120 bp:py-120"
		>
			<div class="px-20">
				<ModuleHeading {surtitle} title={displayTitle} text={plainText} />
			</div>
			{#if suppliers?.length}
				<SupplierMarquee {suppliers} />
				<SupplierGrid {suppliers} />
			{/if}
			{#if button}
				<div class="px-20" class:mt-60={!suppliers?.length}>
					<ButtonPrimary {button} color="white" type="outlined" size="lg" />
				</div>
			{/if}
		</div>
	</div>
</ModuleBase>
