<script context="module" lang="ts">
	import { getContext, setContext } from 'svelte';

	type CurrentDrawer = {
		id: string;
		close: () => void;
	};

	type DrawerApi = {
		current: Writable<Maybe<CurrentDrawer>>;
	};

	const CONTEXT_KEY = '__drawer-group__';

	export const getDrawerGroupContext = () => getContext<DrawerApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	const current = writable<Maybe<CurrentDrawer>>(null);

	setContext<DrawerApi>(CONTEXT_KEY, {
		current
	});
</script>

<slot />
