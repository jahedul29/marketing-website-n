<script lang="ts">
	import type { Modules_Drawers_Entry } from 'src/craft';
	import ModuleDrawer from '$com/module-drawers/ModuleDrawer.svelte';
	import ModuleBase from '$com/modules/ModuleBase.svelte';

	export let entry: Modules_Drawers_Entry;

	const { displayTitle, drawerItems } = entry || {};
</script>

<ModuleBase>
	<div class="space-y-20 bp:space-y-60">
		{#if displayTitle}
			<h2 class="text-700 font-medium leading-10">{displayTitle}</h2>
		{/if}
		{#if drawerItems?.length}
			<ul class="space-y-[0.2rem] overflow-hidden rounded-16 bp:rounded-32">
				{#each drawerItems as drawer, i}
					{#if drawer}
						<li class="bg-grey-100">
							<ModuleDrawer {drawer} startOpen={i === 0} />
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</div>
</ModuleBase>
