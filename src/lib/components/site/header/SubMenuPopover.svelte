<script context="module" lang="ts">
	import { derived, writable } from 'svelte/store';

	type ActivePopover = {
		index: number;
		panelHeight: number;
	};

	const activePopover = writable<Maybe<ActivePopover>>(null);
	export const panelHeight = derived(activePopover, (popover) => popover?.panelHeight || 0);
</script>

<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { Popover, PopoverButton, PopoverPanel } from '$com/ui/popover';
	import ChevronDown from '$com/svg/ChevronDown.svelte';
	import SubMenuSelector from '$com/site/submenu/SubMenuSelector.svelte';

	export let subMenu: MainNavSubMenu;
	export let index: number;

	const { label, subMenuSections, id } = subMenu;

	let close: () => void;
	let panelCtn: HTMLDivElement;
	let state: 'enter' | 'exit' = 'exit';
	let direction: 'down' | 'left' | 'right' = 'down';
	$: activeIndex = $activePopover?.index ?? null;
	$: direction =
		activeIndex === null
			? 'down'
			: activeIndex > index
			? 'left'
			: activeIndex < index
			? 'right'
			: 'down';

	beforeNavigate(() => {
		close?.();
	});

	const onOpen = () => {
		state = 'enter';
		const headerHeight = document.querySelector('header')?.offsetHeight || 0;
		const panelHeight = panelCtn?.offsetHeight || 0;
		activePopover.set({
			index,
			panelHeight: headerHeight + panelHeight
		});
	};

	const onClose = () => {
		state = 'exit';
		activePopover.set(null);
	};
</script>

<Popover
	id={id || ''}
	class="flex"
	transitionDuration="200ms"
	lockScroll
	let:open
	bind:close
	on:open={onOpen}
	on:close={onClose}
>
	<div class="_intro-header flex" style="--section: 1; --i: {index};">
		<PopoverButton
			class="text-200 w-full rounded-8 px-20 py-8 font-medium leading-10 transition-colors hover:bg-grey-100"
		>
			<span class="flex items-center justify-between space-x-8">
				<span>{label}</span>
				<span
					class="w-12 flex-shrink-0 transition-transform duration-500 ease-out-expo"
					class:-rotate-180={open}
				>
					<ChevronDown />
				</span>
			</span>
		</PopoverButton>
	</div>
	<svelte:fragment slot="content">
		<PopoverPanel>
			<div
				bind:this={panelCtn}
				class="absolute left-0 top-full z-50 w-full px-120 py-60 {direction} {state}"
				class:open
			>
				<div class="relative mx-auto max-w-hd">
					<SubMenuSelector sections={subMenuSections} />
				</div>
			</div>
		</PopoverPanel>
	</svelte:fragment>
</Popover>
