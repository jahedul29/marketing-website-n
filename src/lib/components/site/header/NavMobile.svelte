<script lang="ts">
	import { page } from '$app/stores';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import NavMobileModal from '$com/site/header/NavMobileModal.svelte';

	const { header } = $page.data;
	const mainCta = header?.mainCtaMobile?.[0];
</script>

<div class="flex items-center bp:hidden">
	{#if mainCta}
		<div class="_intro-header flex" style="--section: 1;">
			<CraftButton class="text-16 font-medium leading-10" button={mainCta} />
		</div>
	{/if}
	<div class="ml-20 flex items-center">
		<NavMobileModal />
	</div>
</div>
