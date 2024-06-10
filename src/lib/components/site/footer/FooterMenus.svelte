<script lang="ts">
	import { page } from '$app/stores';
	import CraftButton from '$com/buttons/CraftButton.svelte';

	const { footer } = $page.data;
	const linkGroups = footer?.footerLinkGroups;
</script>

{#if linkGroups?.length}
	<ul class="grid grid-cols-2 gap-x-32 gap-y-60 bp:gap-x-120">
		{#each linkGroups as group}
			{@const { label, buttons } = group}
			<li class="space-y-20 bp:space-y-32">
				{#if label}
					<h2 class="text-20 font-medium leading-10 text-white">{label}</h2>
				{/if}
				{#if buttons?.length}
					<ul class="space-y-16">
						{#each buttons as button}
							<li class="flex">
								<CraftButton
									class="text-16 leading-10 text-white opacity-70 transition-opacity hover:opacity-100"
									{button}
								/>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
