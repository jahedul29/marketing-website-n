<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import { portal } from '$lib/actions/portal';
	import Burger from '$com/site/header/Burger.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import SubMenuDrawer from '$com/site/header/SubMenuDrawer.svelte';
	import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from '$com/ui/popover';

	const { header } = $page.data;
	const mainNav = header?.mainNav;
	const mainCta = header?.mainCta?.[0];
	const secondaryNav = header?.secondaryNav;

	let close: () => void;

	beforeNavigate(() => {
		close?.();
	});
</script>

<Popover id="nav-mobile" class="flex" transitionDuration="200ms" lockScroll let:open bind:close>
	<div class="_intro-header flex" style="--section: 2;">
		<PopoverButton>
			<span class="sr-only">
				{#if open}
					{t('close')}
				{:else}
					Menu
				{/if}
			</span>
			<div class="flex h-32 w-32 items-center justify-center text-grey-900">
				<Burger {open} />
			</div>
		</PopoverButton>
	</div>
	<svelte:fragment slot="content">
		<div
			use:portal
			class="fixed left-0 top-0 z-50 h-screen w-full bg-white-750-alpha backdrop-blur-700 transition-opacity duration-200 ease-linear bp:hidden {open
				? ''
				: 'pointer-events-none opacity-0'}"
		/>
		<PopoverPanel
			class="absolute left-0 top-0 -z-1 h-screen w-full transition-opacity duration-200 ease-linear bp:hidden {open
				? ''
				: 'opacity-0'}"
		>
			<PopoverOverlay class="absolute left-0 top-0 h-full w-full" />
			<div class="h-64 bg-white" />
			<div class="h-full overflow-y-auto pb-300" class:opacity-0={!open}>
				<div class="relative space-y-40 rounded-b-20 bg-white px-20 pb-40 shadow-100">
					{#if mainNav?.length}
						<ul>
							{#each mainNav as block}
								<li class="flex border-b-1 border-black-100-alpha">
									{#if block?.__typename === 'mainNav_link_BlockType'}
										{@const button = block.button?.[0]}
										{#if button}
											<CraftButton
												class="w-full py-20 text-20 font-medium leading-10"
												{button}
											/>
										{/if}
									{/if}
									{#if block?.__typename === 'mainNav_subMenu_BlockType'}
										<SubMenuDrawer subMenu={block} />
									{/if}
								</li>
							{/each}
						</ul>
					{/if}
					<div class="flex flex-col items-center space-y-24">
						{#if secondaryNav?.length}
							<ul class="flex flex-col items-center space-y-16 text-center">
								{#each secondaryNav as button}
									<li class="flex">
										<CraftButton
											class="text-20 font-medium leading-10"
											{button}
										/>
									</li>
								{/each}
							</ul>
						{/if}
						{#if mainCta}
							<ButtonPrimary button={mainCta} color="blue" size="sm" />
						{/if}
					</div>
				</div>
			</div>
		</PopoverPanel>
	</svelte:fragment>
</Popover>
