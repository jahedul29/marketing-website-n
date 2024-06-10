<script lang="ts">
	import { getTabGroupContext } from '$lib/components/ui/tabs/TabGroup.svelte';
	import { tabNav } from '$lib/actions/tabNav';

	let classes = '';
	export { classes as class };

	const tabgroup = getTabGroupContext();

	const { orientation } = tabgroup;
</script>

{#if tabgroup}
	<div
		class="flex {orientation === 'vertical' ? 'flex-col' : ''} {classes}"
		role="tablist"
		aria-orientation={orientation}
		use:tabNav
	>
		<slot />
	</div>
{/if}
