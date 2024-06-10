<script lang="ts">
	import type { ScrollSnapAlignment } from '$lib/tailwind/units';
	import { getSliderContext } from '$lib/components/ui/slider/Slider.svelte';
	import { tailwindify } from '$lib/tailwind/tailwind';

	type Item = $$Generic;
	type Items = Item[];

	interface $$Slots {
		default: { item: Item; index: number };
	}

	export let items: Items;
	export let snap: ScrollSnapAlignment = 'center|start';
	export let snapFirst: ScrollSnapAlignment = snap;
	export let snapLast: ScrollSnapAlignment = snap;
	// @TODO Refactor types
	export let spaceBetween: Maybe<TW.Padding | `${string}|${string}`> = null;
	export let spaceBefore: Maybe<TW.Padding | `${string}|${string}`> = spaceBetween;
	export let spaceAfter: Maybe<TW.Padding | `${string}|${string}`> = spaceBetween;
	export let itemsWidth: Maybe<TW.Width | `${string}|${string}`> = null;
	export let label: Maybe<string> = null;
	export let noscrollbar = false;

	const slider = getSliderContext();

	const { registerScrollCtn, onSliderScroll } = slider || {};

	const snapClass = tailwindify('snap', snap);
	const snapFirstClass = tailwindify('snap', snapFirst);
	const snapLastClass = tailwindify('snap', snapLast);
	const spaceBetweenClass = spaceBetween ? tailwindify('mr', spaceBetween) : '';
	const spaceBeforeClass = spaceBefore ? `${tailwindify('translate-x', spaceBefore)}` : '';
	const spaceAfterClass = spaceAfter ? `${tailwindify('pr', spaceAfter)} box-content` : '';
	const widthClass = itemsWidth ? `${tailwindify('w', itemsWidth)}` : '';
</script>

<ul
	class="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
	class:scrollbar-hide={noscrollbar}
	class:slider-items-scrollbar={!noscrollbar}
	aria-label={label}
	use:registerScrollCtn
	on:scroll={onSliderScroll}
>
	{#if items.length}
		{#each items as item, index}
			{@const isFirst = index === 0}
			{@const isLast = index === items.length - 1}
			{@const isMid = !isFirst && !isLast}
			<li
				class="{widthClass} shrink-0
				{isLast ? `${snapLastClass} ` : ''} 
				{isFirst ? `${snapFirstClass} ${spaceBetweenClass}` : ''} 
				{isMid ? `${snapClass} ${spaceBetweenClass}` : ''}"
			>
				<div class="{spaceBeforeClass} {isLast ? `${spaceAfterClass}` : ''} h-full w-full">
					<slot {item} {index} />
				</div>
			</li>
		{/each}
	{/if}
</ul>
