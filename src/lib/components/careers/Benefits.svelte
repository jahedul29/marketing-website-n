<script lang="ts">
	import Image from '$com/ui/Image.svelte';
	import type { Benefits_Benefit_BlockType } from 'src/craft';

	export let title: Maybe<string> = null;
	export let benefits: Maybe<Benefits_Benefit_BlockType>[] = [];
</script>

{#if benefits?.length}
	<section class="mx-auto max-w-max space-y-32 px-20 grid-stack bp:grid bp:space-y-0 bp:px-120">
		{#if title}
			<div class="bp:grid bp:grid-cols-3 bp:gap-40">
				<h2 class="text-800 text-center font-medium leading-10 bp:text-left">
					{title}
				</h2>
			</div>
		{/if}
		<ul class="pointer-events-none grid gap-20 bp:grid-cols-3 bp:gap-40">
			<li aria-hidden="true" class="hidden bp:block" />
			{#each benefits as benefit}
				{@const icon = benefit?.icon?.[0]}
				{@const color = benefit?.color}
				{@const text = benefit?.text}
				<li
					class="pointer-events-auto flex items-center space-x-20 rounded-16 bg-white p-8 bp:flex-col bp:items-start bp:space-x-0 bp:rounded-24 bp:p-16"
				>
					{#if icon}
						<div
							class="flex h-64 w-64 flex-shrink-0 items-center justify-center rounded-8 bp:mb-80 bp:h-100 bp:w-100 bp:rounded-12"
							data-theme-color={color || ''}
						>
							<Image image={icon} sizes={[{ width: '10rem' }]} class="h-3/5 w-3/5" />
						</div>
						{#if text}
							<p class="text-20 leading-20 bp:text-26">{text}</p>
						{/if}
					{/if}
				</li>
			{/each}
		</ul>
	</section>
{/if}
