<script lang="ts">
	import CardEventType from '$com/cards/CardEventType.svelte';
	import ModuleBase from '$com/modules/ModuleBase.svelte';

	export let title: Maybe<string> = null;
	export let relatedEventTypes: PagesDefault[] = [];
</script>

<ModuleBase>
	<div class="space-y-40 bp:space-y-60">
		{#if title}
			<h2 class="text-700 font-medium leading-10">
				{title}
			</h2>
		{/if}
		{#if relatedEventTypes?.length}
			<ul class="grid gap-32 bp:grid-cols-4">
				{#each relatedEventTypes as entry}
					<li>
						<CardEventType {entry} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</ModuleBase>
