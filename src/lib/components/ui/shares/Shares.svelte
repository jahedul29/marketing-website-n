<script context="module" lang="ts">
	type SharesApi = {
		nativeSharesSupported: Readable<boolean>;
		setNativeSharesUnsupported: () => void;
	};

	const CONTEXT_KEY = '__shares__';

	export const getSharesContext = () => getContext<SharesApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { readonly, writable, type Readable } from 'svelte/store';
	import { getContext, setContext } from 'svelte';

	interface $$Slots {
		default: { nativeSharesSupported: boolean };
	}

	const nativeSharesSupported = writable<boolean>(true);

	const setNativeSharesUnsupported: SharesApi['setNativeSharesUnsupported'] = () => {
		nativeSharesSupported.set(false);
	};

	setContext<SharesApi>(CONTEXT_KEY, {
		nativeSharesSupported: readonly(nativeSharesSupported),
		setNativeSharesUnsupported
	});
</script>

<slot nativeSharesSupported={$nativeSharesSupported} />
