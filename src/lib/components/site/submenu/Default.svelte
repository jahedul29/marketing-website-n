<script lang="ts">
	import type { Buttons_Default_Entry, SubMenuSection_Default_Entry } from 'src/craft';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import SectionBase from '$com/site/submenu/SectionBase.svelte';
	import ArrowLinkInner from '$com/buttons/ArrowLinkInner.svelte';

	export let section: SubMenuSection_Default_Entry;

	const title = section?.displayTitle;
	const buttons = section?.buttons as Buttons_Default_Entry[];
	const mainButton = section?.button?.[0] as Buttons_Default_Entry;
</script>

<SectionBase {title}>
	{#if buttons?.length}
		<ul class="space-y-16 bp:space-y-12">
			{#each buttons as button, i}
				<li class="_submenu-item flex" style="--i: {i};">
					<CraftButton
						class="text-16 leading-10 text-black-750-alpha transition-colors hover:text-blue-500"
						{button}
					/>
				</li>
			{/each}
			{#if mainButton}
				<li class="_submenu-item flex" style="--i: {buttons?.length};">
					<CraftButton class="group" button={mainButton} let:label>
						<ArrowLinkInner {label} />
					</CraftButton>
				</li>
			{/if}
		</ul>
	{/if}
</SectionBase>
