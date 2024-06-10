<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import Tooltip from '$com/ui/Tooltip.svelte';

	export let title: Maybe<string> = null;
	export let description: Maybe<string> = null;
	export let isCell = false;
</script>

<div class="flex flex-col space-y-8">
	<span class:font-medium={!isCell} class:bp:hidden={!!description}>{title}</span>
	{#if description}
		<span class="text-14 text-black-750-alpha bp:hidden">{description}</span>
		<Tooltip let:registerTrigger offset="8" boundsOffset="24">
			<span
				class="relative hidden cursor-default bp:block"
				class:font-medium={!isCell}
				use:registerTrigger
			>
				{title}
				<span
					class="absolute hidden h-4 w-full border-b-2 border-dashed border-grey-500 pointer:block"
				/>
			</span>
			<span
				class="relative z-40 flex w-300 rounded-8 bg-white px-12 py-8 text-16 font-normal leading-20 text-black-900-alpha shadow-500"
				transition:fly={{ duration: 300, easing: expoOut, y: 10 }}
				slot="tooltip"
			>
				{description}
			</span>
		</Tooltip>
	{/if}
</div>
