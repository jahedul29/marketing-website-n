<script lang="ts">
	import FeaturesTableTooltip from '$com/features-table/FeaturesTableTooltip.svelte';

	export let title: Maybe<string> = null;
	export let description: Maybe<string> = null;
	export let unavailable = false;
</script>

{#if title}
	<div role="row" class="_features-table-grid-columns group relative grid">
		<div
			class="pointer-events-none absolute left-0 top-0 h-full w-full rounded-bl-8 rounded-tl-8 bg-lightblue-300-alpha opacity-0 transition-opacity group-hover:opacity-100"
		/>
		<div
			role="rowheader"
			class="relative flex items-center hyphens-auto py-24 pr-12 text-16 leading-10 bp:px-16 bp:py-20 bp:text-20"
			class:text-black-750-alpha={unavailable}
		>
			<FeaturesTableTooltip {title} {description} />
		</div>
		<slot />
	</div>
{/if}
