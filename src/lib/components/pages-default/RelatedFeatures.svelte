<script lang="ts">
	import CardFeature from '$com/cards/CardFeature.svelte';
	import ModuleBase from '$com/modules/ModuleBase.svelte';

	export let title: Maybe<string> = null;
	export let text: Maybe<string> = null;
	export let relatedFeatures: PagesDefault[] = [];
</script>

<ModuleBase>
	<div
		class="space-y-40 rounded-16 bg-grey-900 p-20 text-white bp:space-y-80 bp:rounded-20 bp:p-80"
	>
		{#if title || text}
			<div class="mx-auto space-y-20 text-center bp:max-w-700">
				{#if title}
					<h2 class="text-700 font-medium leading-10">
						{title}
					</h2>
				{/if}
				{#if text}
					<p class="text-300 leading-20 text-white-750-alpha">{text}</p>
				{/if}
			</div>
		{/if}
		{#if relatedFeatures?.length}
			<ul class="flex grid bp:grid-cols-3 grid-cols-1 gap-20 bp:flex-row bp:flex-wrap bp:gap-32">
				{#each relatedFeatures as entry}
					<CardFeature {entry} />
				{/each}
			</ul>
		{/if}
	</div>
</ModuleBase>
