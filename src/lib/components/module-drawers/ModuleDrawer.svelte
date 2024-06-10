<script context="module" lang="ts">
	type CurrentDrawer = {
		id: string;
		close: () => void;
	};

	let current: CurrentDrawer;
</script>

<script lang="ts">
	import type { DrawerItems_DrawerItem_BlockType } from 'src/craft';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { Drawer, DrawerButton, DrawerPanel } from '$com/ui/drawer';
	import RichText from '$com/ui/RichText.svelte';
	import Minus from '$com/svg/Minus.svelte';
	import Plus from '$com/svg/Plus.svelte';

	export let drawer: DrawerItems_DrawerItem_BlockType;
	export let startOpen = false;

	const { displayTitle, richText } = drawer || {};

	const id = drawer?.id || '';

	let close: () => void;

	const onOpen = () => {
		if (current && current.id !== id) {
			current.close();
		}
		current = {
			id,
			close
		};
	};

	onMount(() => {
		if (startOpen) {
			current = {
				id,
				close
			};
		}
	});
</script>

<Drawer {id} open={startOpen} let:open on:open={onOpen} bind:close>
	<DrawerButton class="w-full">
		<span class="flex items-center justify-between space-x-8 p-20 bp:p-40">
			<span class="text-400 max-w-3/4 text-left font-medium leading-10">{displayTitle}</span>
			<span class="w-16 flex-shrink-0 bp:w-24">
				{#if open}
					<Minus />
				{:else}
					<Plus />
				{/if}
			</span>
		</span>
	</DrawerButton>
	<DrawerPanel slideOptions={{ easing: expoOut, duration: 700 }}>
		<div class="px-20 pb-20 bp:max-w-700 bp:px-40 bp:pb-40">
			<RichText text={richText} type="block-sm" />
		</div>
	</DrawerPanel>
</Drawer>
