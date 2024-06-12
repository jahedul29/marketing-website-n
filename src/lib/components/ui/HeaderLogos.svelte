<script lang="ts">
	import Image from '$com/ui/Image.svelte';
	import type { Assets_Asset } from 'src/craft';

	export let logosTitle: Maybe<string> = null;
	export let logos: Maybe<Assets_Asset>[] = [];
	export let center = false;
	export let is_hero = false;
</script>

{#if logos?.length}
	<div
		class="flex flex-col items-center space-y-16 {center ? '' : 'bp:items-start bp:space-y-8'}"
	>
		{#if logosTitle}
			<h2 class="text-300 text-black-750-alpha">{logosTitle}</h2>
		{/if}
		<div
			class="grid w-full grid-cols-3 place-items-center {is_hero
				? 'gap-0 bp:gap-60'
				: 'gap-32'} opacity-50 bp:flex bp:flex-wrap"
			class:bp:justify-center={center}
		>
			{#each logos as logo}
				{#if logo}
					<div class="{is_hero ? 'bp:w-160' : 'bp:w-96'} w-80 bp:shrink-0">
						<Image image={logo} sizes={[{ width: '10rem' }]} />
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
