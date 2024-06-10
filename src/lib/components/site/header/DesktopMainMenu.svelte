<script lang="ts">
	import { page } from '$app/stores';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import SubMenuPopover from '$com/site/header/SubMenuPopover.svelte';
	import MainMenuPanel from './MainMenuPanel.svelte';

	const { header } = $page.data;
	const mainNav = header?.mainNav;
</script>

{#if mainNav?.length}
	<MainMenuPanel />
	<ul class="flex items-center">
		{#each mainNav as block, index}
			<li class="flex">
				{#if block?.__typename === 'mainNav_link_BlockType'}
					{@const button = block.button?.[0]}
					{#if button}
						<div class="_intro-header flex" style="--section: 1; --i: {index};">
							<CraftButton
								class="text-200 w-full px-20 font-medium leading-10 transition-colors hover:text-blue-500"
								{button}
							/>
						</div>
					{/if}
				{/if}
				{#if block?.__typename === 'mainNav_subMenu_BlockType'}
					<SubMenuPopover subMenu={block} {index} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}
