<!--@docs
A css animated generic marquee component.

@exec Marquee.svelte

```svelte
<Marquee gap="10|20" speed="20000|10000" direction="natural" stopOnHover>
	<div class="bg-purple-600 w-64 h-32 rounded-xl">
		Marquee
	</div>
</Marquee>
```
@exec Marquee2.svelte

```svelte
<Marquee gap="20|32" direction="inverted" speed={4000}>
	<div class="flex space-x-20 bp:space-x-32">
		{#each ['200/300?1', '200/300?2', '200/300?3', '200/300?4', '200/300?5'] as image}
			<img src="http://placekitten.com/{image}" class="block h-[300px] w-[200px]" alt="" />
		{/each}
	</div>
</Marquee>
```

@exec Marquee3.svelte

```svelte
<Marquee gap="20|32" orientation="vertical" speed={6000}>
	<div class="flex flex-col">
		{#each ['200/300?1', '200/300?2', '200/300?3'] as image}
			<img src="http://placekitten.com/{image}" class="block h-[300px] w-[200px]" alt="" />
		{/each}
	</div>
</Marquee>
```

-->
<script lang="ts">
	import { resize } from '$lib/stores/window/resize';
	import { throttleRaf } from '$lib/utils/timeout/throttleRaf';
	import { pxToRem } from '$lib/utils/ui/pxToRem';
	import { onMount } from 'svelte';

	/**
	 * To make a seamless marquee effect, the component generates whatever is in the
	 * slot twice. The `gap` property represents the space between the 2 copies. It should be
	 * equivalent to the space between the items inside the slot. Default: `0`.
	 */
	export let gap: `${TW.Gap}` | `${string}|${string}` = '0';
	/**
	 * The marquee animation duration in ms, which determines the speed of
	 * the marquee. The higher the number, the slower the marquee. Default: `12000`.
	 */
	export let speed: number | `${number}` | `${number}|${number}` = 12000;
	/**
	 * The direction of the marquee.
	 */
	export let direction: 'natural' | 'inverted' = 'natural';
	/**
	 * The orientation of the marquee. Default: `horizontal`.
	 */
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';
	/**
	 * Wether the marquee should pause when hovered. Default: `false`.
	 */
	export let stopOnHover = false;

	const gaps = gap.split('|').map((gap) => `${pxToRem(gap)}rem`);
	const speeds = speed
		.toString()
		.split('|')
		.map((speed) => `${speed}ms`);
	const minCopies = 2;

	let ctn: HTMLElement;
	let copies = minCopies;

	const setCopies = throttleRaf(() => {
		const ctnWidth = ctn.getBoundingClientRect().width;
		const childWidth = ctn.firstElementChild?.getBoundingClientRect().width || 0;
		const totalWidth = ctnWidth * 2;
		const newCopiesQty = Math.ceil(totalWidth / childWidth) || minCopies;
		copies = Math.max(newCopiesQty, minCopies);
	});

	onMount(() => {
		setCopies();
		return resize.subscribe(setCopies);
	});
</script>

<div
	class="_marquee-ctn flex overflow-hidden {direction}"
	class:_stop-on-hover={stopOnHover}
	style="--gap-m: {gaps[0]}; --gap-d: {gaps[1] ||
		gaps[0]}; --speed-m: {speeds[0]}; --speed-d: {speeds[1] || speeds[0]};"
	data-orientation={orientation}
	bind:this={ctn}
>
	{#key copies}
		{#each new Array(copies) as _, i}
			{@const copy = i > 0}
			<div class="_marquee flex-shrink-0" aria-hidden={copy || null}>
				<slot {copy} />
			</div>
		{/each}
	{/key}
</div>

<style lang="postcss">
	._marquee-ctn {
		--gap: var(--gap-m);
		--speed: var(--speed-m);
		gap: var(--gap);

		@screen bp {
			--gap: var(--gap-d);
			--speed: var(--speed-d);
		}

		&[data-orientation='vertical'] {
			@apply flex-col;

			._marquee {
				animation: marqueeVertical var(--speed) linear infinite both;
			}
		}

		._marquee {
			animation: marquee var(--speed) linear infinite both;
		}

		&.inverted ._marquee {
			animation-direction: reverse;
		}

		&:focus-within ._marquee,
		&._stop-on-hover:hover ._marquee,
		&._stop-on-hover:active ._marquee {
			animation-play-state: paused;
		}
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	@keyframes marqueeVertical {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}
</style>
