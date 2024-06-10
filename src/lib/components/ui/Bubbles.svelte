<script lang="ts">
	import type { Bubbles_Bubble_BlockType } from 'src/craft';
	import { SIZES_BP } from '$lib/utils/ui/imageSizes';
	import Image from './Image.svelte';

	export let bubbles: Maybe<Bubbles_Bubble_BlockType>[] = [];
</script>

<div aria-hidden="true">
	{#each bubbles as bubble, i}
		{@const image = bubble?.image?.[0]}
		{@const icon = bubble?.tagIcon?.[0]}
		{@const tag = bubble?.tag}
		{@const x = bubble?.xPosition}
		{@const y = bubble?.yPosition}
		<div class="absolute" style="top: {y}%; left: {x}%;">
			<div class="_float" style="--i: {i};">
				<div
					class="_intro-bubble-fade-in relative rounded-12 bg-white-750-alpha p-8 shadow-500 backdrop-blur-900 bp:rounded-20 bp:p-16"
					style="--section: 3;"
				>
					{#if tag || icon}
						<div
							class="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/4 items-baseline rounded-full bg-grey-900 px-[0.6rem] py-[0.1rem] text-[1rem] font-medium text-white bp:-translate-y-1/4 bp:px-8 bp:text-14"
						>
							{#if tag}
								{tag}
							{/if}
							{#if icon}
								&nbsp;<Image
									class="h-8 w-8 bp:h-12 bp:w-12"
									sizes={[{ width: '2rem' }]}
									image={icon}
								/>
							{/if}
						</div>
					{/if}
					{#if image}
						<Image
							class="max-w-120 bp:max-w-300 lg:max-w-none"
							{image}
							sizes={[{ width: '20rem' }, { mq: SIZES_BP, width: '30rem' }]}
						/>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	._float {
		animation: float calc(calc(var(--i) + 1) * 5500ms) infinite alternate
			cubic-bezier(0.65, 0, 0.35, 1) calc(var(--i) * 300ms) both;
	}

	@keyframes float {
		0% {
			transform: translate3d(1rem, 0, 0);
		}
		100% {
			transform: translate3d(-1rem, 0, 0);
		}
	}
</style>
