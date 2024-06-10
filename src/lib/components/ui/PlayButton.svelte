<script lang="ts">
	import Play from '$com/svg/Play.svelte';

	export let label: Maybe<string> = null;
	export let transparent = false;
</script>

<div
	class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-white"
	class:bg-black-250-alpha={!transparent}
>
	<div
		class="rounded-full border-8 border-transparent backdrop-blur-300 transition-colors duration-200 ease-linear hover:border-white-100-alpha"
	>
		<div
			class="flex h-40 w-40 items-center justify-center rounded-full bg-white-400-alpha ring-wheat-700 backdrop-blur-300 group-focus-visible:ring-4 bp:h-64 bp:w-64"
		>
			<div class="w-1/3 translate-x-[0.1rem] bp:translate-x-[0.2rem]">
				<Play />
			</div>
		</div>
	</div>
	{#if label}
		<div
			class="text-300 mt-8 rounded-8 px-8 py-4 leading-10"
			class:bg-black-250-alpha={transparent}
		>
			{label}
		</div>
	{/if}
</div>
