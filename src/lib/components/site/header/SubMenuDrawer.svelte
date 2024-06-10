<script lang="ts">
	import { expoOut, sineOut } from 'svelte/easing';
	import { getPopoverContext } from '$com/ui/popover/Popover.svelte';
	import { Drawer, DrawerButton, DrawerPanel } from '$com/ui/drawer';
	import ChevronDown from '$com/svg/ChevronDown.svelte';
	import SubMenuSelector from '$com/site/submenu/SubMenuSelector.svelte';

	export let subMenu: MainNavSubMenu;

	const { label, subMenuSections, id } = subMenu;

	const popoverApi = getPopoverContext();
	const popoverOpen = popoverApi.open;

	const slideDuration = 500;

	let close: () => void;
	let duration = slideDuration;

	popoverOpen.subscribe((open) => {
		if (!open) {
			duration = 0;
			close?.();
		} else {
			duration = slideDuration;
		}
	});
</script>

<div class="flex w-full flex-col">
	<Drawer id={id || ''} let:open bind:close>
		<DrawerButton class="w-full py-20 text-20 font-medium leading-10">
			<span class="flex items-center justify-between">
				<span>{label}</span>
				<span
					class="flex-shrink-0 px-8 transition-transform duration-500 ease-out-expo"
					class:-rotate-180={open}
				>
					<span class="flex w-16">
						<ChevronDown />
					</span>
				</span>
			</span>
		</DrawerButton>
		<DrawerPanel slideOptions={{ duration, easing: open ? sineOut : expoOut }}>
			<SubMenuSelector sections={subMenuSections} />
		</DrawerPanel>
	</Drawer>
</div>
