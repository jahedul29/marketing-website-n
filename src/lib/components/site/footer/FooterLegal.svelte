<script lang="ts">
	import { page } from '$app/stores';
	import CraftButton from '$com/buttons/CraftButton.svelte';

	const { footer, config } = $page.data;
	const text = config?.seo?.[0]?.shareDescription;
	const orgName = config?.organization?.[0]?.organizationName;
	const legalNav = footer?.legalNav;
</script>

<div
	class="space-y-40 border-t-1 border-white-200-alpha pt-32 bp:flex bp:w-full bp:items-end bp:justify-between bp:space-y-0"
>
	{#if text}
		<p class="text-16 text-white opacity-70 bp:max-w-540">{text}</p>
	{/if}
	<div class="space-y-20 bp:flex bp:items-center bp:space-x-20 bp:space-y-0">
		{#if legalNav?.length}
			<ul class="space-y-20 bp:flex bp:items-center bp:space-x-20 bp:space-y-0">
				{#each legalNav as button}
					<li class="flex">
						<CraftButton
							class="text-16 text-white opacity-70 transition-opacity hover:opacity-100"
							{button}
						/>
					</li>
				{/each}
			</ul>
		{/if}
		<small class="flex text-16 text-white opacity-70">
			&copy; {new Date().getFullYear()}
			{orgName}
		</small>
	</div>
</div>
