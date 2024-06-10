<script lang="ts">
	import { getTabGroupContext } from '$lib/components/ui/tabs/TabGroup.svelte';

	export let transitionDuration = '0s';
	export let as: keyof svelteHTML.IntrinsicElements = 'div';
	let classes = '';
	export { classes as class };
	export let classUnselected = '';
	export let classSelected = '';

	const tabgroup = getTabGroupContext();

	const id = tabgroup?.registerPanel();

	const { state, unmount } = tabgroup || {};

	$: index = $state?.panels.indexOf(id);
	$: labelledBy = $state?.tabs[index];
	$: selectedIndex = $state?.selectedIndex;
	$: selected = selectedIndex === index;
</script>

{#if tabgroup}
	{#if !unmount}
		<svelte:element
			this={as}
			{id}
			role="tabpanel"
			aria-labelledby={labelledBy}
			class="{classes} {selected ? classSelected : classUnselected}"
			tabindex="0"
			style="visibility: {selected ? 'visible' : 'hidden'};
		transition: visibility 0s linear {selected ? '0s' : transitionDuration};"
		>
			<slot {selected} />
		</svelte:element>
	{:else if selected}
		<svelte:element
			this={as}
			{id}
			role="tabpanel"
			aria-labelledby={labelledBy}
			class="{classes} {selected ? classSelected : classUnselected}"
			tabindex="0"
		>
			<slot {selected} />
		</svelte:element>
	{/if}
{/if}
