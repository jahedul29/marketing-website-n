<script lang="ts">
	import { getSharesContext } from './Shares.svelte';
	import { nativeShare } from '$lib/actions/nativeShare';

	let classes = '';
	export { classes as class };

	const sharesApi = getSharesContext();
</script>

<div class="bp:hidden">
	<button
		class={classes}
		type="button"
		on:nativesharesunsupported={(e) => {
			sharesApi?.setNativeSharesUnsupported();
			e.detail?.node?.remove();
		}}
		use:nativeShare
	>
		<slot />
	</button>
</div>
