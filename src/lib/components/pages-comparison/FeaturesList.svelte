<script lang="ts">
	import RichText from '$com/ui/RichText.svelte';
	import type { RichTextList_Text_BlockType } from 'src/craft';

	export let title: Maybe<string> = null;
	export let features: Maybe<RichTextList_Text_BlockType>[];
</script>

<section class="space-y-40 px-20 bp:space-y-80 bp:px-120">
	{#if title}
		<h2 class="text-700 mx-auto text-center font-medium leading-10 bp:max-w-660">{title}</h2>
	{/if}
	{#if features?.length}
		<ul class="mx-auto grid max-w-max gap-20 bp:grid-cols-2 bp:gap-x-80 bp:gap-y-40">
			{#each features as feature}
				{@const text = feature?.simpleRichText}
				{#if text}
					<li class="flex items-baseline gap-8 bp:gap-16">
						<div
							class="aspect-square w-8 shrink-0 rounded-full border-2 border-grey-900 bp:w-12"
						/>
						<RichText {text} let:text>
							<p class="text-300 leading-40">{@html text}</p>
						</RichText>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</section>
