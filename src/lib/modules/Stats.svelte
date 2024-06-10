<script lang="ts">
	import type { Modules_Stats_Entry } from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';

	export let entry: Modules_Stats_Entry;

	const { displayTitle, plainText, statItems } = entry || {};
</script>

<ModuleBase width="wide">
	<div class="rounded-24 bg-white px-40 py-40 shadow-100 bp:px-60 bp:py-120">
		{#if displayTitle || plainText}
			<div class="mx-auto max-w-700 space-y-16 bp:space-y-32">
				{#if displayTitle}
					<h2 class="text-600 text-center font-medium">{displayTitle}</h2>
				{/if}
				{#if plainText}
					<p class="text-center text-16">{plainText}</p>
				{/if}
			</div>
		{/if}
		{#if statItems?.length}
			<ul class="grid gap-60 pt-40 bp:flex bp:gap-80 bp:pt-80">
				{#each statItems as item}
					<li
						class="text-500 _scroll-reveal border-t-1 border-black-100-alpha pt-20 text-center leading-10 bp:flex-1 bp:pt-40"
					>
						<div class="_stat-text mx-auto bp:max-w-400">{@html item?.text}</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</ModuleBase>

<style lang="postcss">
	:global(._stat-text strong) {
		@apply font-medium;
	}
</style>
