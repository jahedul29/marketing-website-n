<script lang="ts" context="module">
	import { readonly, type Readable } from 'svelte/store';
	import { getContext } from 'svelte';

	interface TabState {
		tabs: string[];
		panels: string[];
		selectedIndex: number;
	}

	type TabOrientation = 'horizontal' | 'vertical';

	export interface TabGroupApi {
		unmount: boolean;
		orientation: TabOrientation;
		state: Readable<TabState>;
		setSelectedIndex: (index: number) => void;
		registerTab: () => string;
		registerPanel: () => string;
	}

	let currentId = 0;
	const generateId = () => ++currentId;

	const CONTEXT_KEY = '__tabgroup__';

	export const getTabGroupContext = () => getContext<TabGroupApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let id: string;
	export let defaultIndex = 0;
	export let orientation: TabOrientation = 'horizontal';
	export let unmount = false;

	const dispatch = createEventDispatcher();

	const _state = writable<TabState>({
		tabs: [],
		panels: [],
		selectedIndex: defaultIndex
	});

	const tabId = `${id}-tab`;
	const panelId = `${id}-panel`;

	setContext<TabGroupApi>(CONTEXT_KEY, {
		unmount,
		orientation,
		state: readonly(_state),
		setSelectedIndex: (index) => {
			if ($_state.selectedIndex === index) {
				return;
			}
			$_state.selectedIndex = index;
			dispatch('tabchange', { index });
		},
		registerTab: () => {
			const id = `${tabId}-${generateId()}`;
			$_state.tabs = [...$_state.tabs, id];
			return id;
		},
		registerPanel: () => {
			const id = `${panelId}-${generateId()}`;
			$_state.panels = [...$_state.panels, id];
			return id;
		}
	});
</script>

<slot selectedIndex={$_state.selectedIndex} />
