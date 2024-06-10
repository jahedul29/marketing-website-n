<script lang="ts">
	import ArrowRight from '$com/svg/ArrowRight.svelte';

	export let label: Maybe<string> | undefined;
</script>

{#if label}
	<span
		class="flex items-center whitespace-nowrap text-16 font-medium leading-10 text-blue-500 transition-colors group-hover:text-blue-700"
	>
		<span>{label}&nbsp;</span>
		<span
			class="w-12 transition-transform duration-500 ease-out-expo group-hover:translate-x-1/4"
		>
			<ArrowRight />
		</span>
	</span>
{/if}
