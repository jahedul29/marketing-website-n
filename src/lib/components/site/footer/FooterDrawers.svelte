<script lang="ts">
	import { page } from '$app/stores';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import ChevronDown from '$com/svg/ChevronDown.svelte';
	import { Drawer, DrawerButton, DrawerPanel } from '$com/ui/drawer';
	import { expoOut } from 'svelte/easing';

	const { footer } = $page.data;
	const title = footer?.footerDrawersTitle;
	const drawers = footer?.footerDrawers;
</script>

<div class="space-y-32 bp:w-220">
	{#if title}
		<h2 class="text-20 font-medium text-white">{title}</h2>
	{/if}
	{#if drawers?.length}
		<ul class="flex flex-col">
			{#each drawers as drawer}
				{@const label = drawer.label}
				{@const buttons = drawer.buttons}
				<li class="border-b-1 border-white-200-alpha">
					<Drawer id="drawer-{drawer.id}" let:open>
						<DrawerButton class="w-full py-20 text-16 font-medium text-white">
							<span class="flex w-full items-center justify-between space-x-8">
								<span>{label}</span>
								<span
									class="w-12 flex-shrink-0 transition-transform duration-500 ease-out-expo"
									class:-rotate-180={open}
								>
									<ChevronDown />
								</span>
							</span>
						</DrawerButton>
						<DrawerPanel slideOptions={{ easing: expoOut, duration: 500 }}>
							{#if buttons?.length}
								<ul class="flex flex-col space-y-16 pb-20">
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
						</DrawerPanel>
					</Drawer>
				</li>
			{/each}
		</ul>
	{/if}
</div>
