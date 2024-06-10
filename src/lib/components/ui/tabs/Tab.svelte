<!--@docs
@include docs/ui-components/tabs.md
-->
<script lang="ts">
	import { getTabGroupContext } from '$lib/components/ui/tabs/TabGroup.svelte';

	export let href: Maybe<string> = null;
	let classes = '';
	export { classes as class };
	export let classUnselected = '';
	export let classSelected = '';

	const tabgroup = getTabGroupContext();

	const id = tabgroup?.registerTab();

	const { state, setSelectedIndex } = tabgroup || {};

	$: index = $state?.tabs.indexOf(id);
	$: controls = $state?.panels[index];
	$: selectedIndex = $state?.selectedIndex;
	$: selected = selectedIndex === index;

	const onClick = () => {
		setSelectedIndex(index);
	};
</script>

{#if tabgroup}
	{#if href}
		<a
			{id}
			{href}
			role="tab"
			aria-controls={controls}
			aria-selected={selected}
			tabindex={selected ? 0 : -1}
			class="{classes} {selected ? classSelected : classUnselected}"
			on:click|preventDefault={onClick}
		>
			<slot {selected} />
		</a>
	{:else}
		<button
			{id}
			type="button"
			role="tab"
			aria-controls={controls}
			aria-selected={selected}
			tabindex={selected ? 0 : -1}
			class="{classes} {selected ? classSelected : classUnselected}"
			on:click={onClick}
		>
			<slot {selected} />
		</button>
	{/if}
{/if}
