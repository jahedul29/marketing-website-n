<script lang="ts">
	import type { ContentBlocks_Stats_BlockType } from 'src/craft';

	export let block: ContentBlocks_Stats_BlockType;

	const stats = block?.stats;
</script>

{#if stats?.length}
	<div class="flex space-x-24">
		{#each stats as stat}
			{@const value = stat?.stat}
			{@const text = stat?.text}
			<p
				class="flex w-full flex-col items-center space-y-4 rounded-20 bg-grey-100 p-16 text-center leading-20 bp:space-y-8 bp:p-36"
			>
				<strong class="text-20 font-medium {stats.length > 2 ? 'bp:text-24' : 'bp:text-32'}"
					>{value}</strong
				>
				<span
					class="text-14 text-black-750-alpha bp:text-16 {stats.length === 1
						? 'bp:max-w-3/4'
						: ''}">{text}</span
				>
			</p>
		{/each}
	</div>
{/if}
