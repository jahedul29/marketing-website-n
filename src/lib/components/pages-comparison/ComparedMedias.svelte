<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import Media from '$com/ui/Media.svelte';

	export let medias: Maybe<Assets_Asset>[];
</script>

{#if medias?.length}
	<section class="bp:px-20">
		<div class="flex flex-col bg-lightblue-500 px-20 py-40 bp:rounded-24 bp:p-80">
			{#each medias.slice(0, 2) as media, i}
				{#if media}
					<div
						class="rounded-24 bg-white-100-alpha p-8 backdrop-blur-lg bp:max-w-2/3 bp:rounded-40 bp:p-16 {i ===
						1
							? 'mt-20 self-end bp:-mt-200'
							: ''}"
					>
						<Media
							{media}
							class="aspect-[16/9] h-full w-full rounded-16 object-cover bp:rounded-24"
						/>
					</div>
				{/if}
			{/each}
		</div>
	</section>
{/if}
