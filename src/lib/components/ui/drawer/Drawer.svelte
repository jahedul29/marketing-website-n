<!--@docs
@include docs/ui-components/drawer.md
-->
<script lang="ts" context="module">
	import { readonly, type Readable } from 'svelte/store';
	import { getContext, onMount } from 'svelte';

	export interface DrawerApi {
		btnId: string;
		panelId: string;
		onToggle: () => void;
		openDrawer: () => void;
		open: Readable<boolean>;
	}

	const CONTEXT_KEY = '__drawer__';

	export const getDrawerContext = () => getContext<DrawerApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { setContext, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { mounted } from '$lib/stores/mounted';
	import { textToId } from '$lib/utils/string/textToId';
	import { getDrawerGroupContext } from '$com/ui/drawer/DrawerGroup.svelte';

	export let id: string;
	export let open = false;

	const dispatch = createEventDispatcher();
	const group = getDrawerGroupContext();
	const currentDrawer = group?.current;

	const _open = writable(open);
	const openState = readonly(_open);

	const btnId = `${textToId(id)}-drawer-btn`;
	const panelId = `${textToId(id)}-drawer-panel`;

	export const close = () => {
		$_open = false;
		dispatch('close');
	};

	export const openDrawer = () => {
		$_open = true;
		dispatch('open');
	};

	export const onToggle = () => {
		$_open = !$_open;
		if ($_open) {
			dispatch('open');
		} else {
			dispatch('close');
		}
	};

	setContext<DrawerApi>(CONTEXT_KEY, {
		btnId,
		panelId,
		onToggle,
		openDrawer,
		open: openState
	});

	onMount(() => {
		if (currentDrawer) {
			return _open.subscribe((isOpen) => {
				if (!isOpen) {
					return;
				}
				if ($currentDrawer?.id !== id) {
					$currentDrawer?.close();
				}
				currentDrawer.set({ id, close });
			});
		}
	});
</script>

{#if $mounted}
	<slot open={$openState} {close} />
{:else}
	<details {open}>
		<slot {open} {close} />
	</details>
{/if}
