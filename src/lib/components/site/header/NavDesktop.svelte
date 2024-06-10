<script lang="ts">
	import { page } from '$app/stores';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import DesktopMainMenu from '$com/site/header/DesktopMainMenu.svelte';

	const { header } = $page.data;
	const mainCta = header?.mainCta?.[0];
	const secondaryNav = header?.secondaryNav;
</script>

<div class="hidden flex-grow items-center justify-between pl-20 bp:flex">
	<DesktopMainMenu />
	<div class="flex items-center space-x-20">
		<ul class="flex items-center space-x-32">
			{#if secondaryNav?.length}
				{#each secondaryNav as button, i}
					<li class="_intro-header flex" style="--section: 2; --i: {i};">
						<CraftButton
							{button}
							class="text-200 font-medium leading-10 transition-colors hover:text-blue-500"
						/>
					</li>
				{/each}
				{#if mainCta}
					<li
						class="_intro-header flex"
						style="--section: 2; --i: {secondaryNav?.length};"
					>
						<ButtonPrimary button={mainCta} color="blue" size="sm" />
					</li>
				{/if}
			{/if}
		</ul>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<div class="text-200 _intro-header flex">
			<a
				class="mr-20"
				style="--section: 2; --i: {(secondaryNav?.length || 0) + 1};"
				href="javascript:Localize.setLanguage('fr-ca')">Fr</a
			>

			<a
				style="--section: 2; --i: {(secondaryNav?.length || 0) + 1};"
				href="javascript:Localize.setLanguage('en')">En</a
			>
		</div>
	</div>
</div>
