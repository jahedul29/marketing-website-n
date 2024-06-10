<!--@docs
The SpriteAnimation component allows to create looping anim based off png sprites.

### Implementation

A div with fluid width and height that displays a background image.
The background position is determined based on the time since the last `start()` call.
It's a port of
<https://github.com/DeuxHuitHuit/jQuery-sprite-animation/blob/master/src/jquery.sprite-animation.js>

The animation starts as soon as the element is in the viewport.

It will also check the estimated available megabytes per seconds of bandwidth available.
If it is less than one, it won't start the animation.

### Example

```
<Frame width="56">
	<SpriteAnimation speed={120} url="/examples/spot-normal.png" rows={10} width={56} height={56} />
</Frame>
<Frame width="256">
	<SpriteAnimation speed={120} url="/examples/spot-normal.png" rows={10} width={56} height={56} />
</Frame>
<SpriteAnimation speed={120} url="/examples/spot-normal.png" rows={10} width={56} height={56} />
```
-->
<script context="module" lang="ts">
	import { browser, dev } from '$app/environment';
	import { estimatedAvailableMegaBytesPerSeconds } from '$lib/utils/device/estimatedAvailableMegaBytesPerSeconds';

	interface Animation {
		start(): void;
		end(): void;
	}

	const isNetworkGoodEnough = estimatedAvailableMegaBytesPerSeconds >= 1;

	if (browser && dev) {
		// eslint-disable-next-line no-console
		console.info(
			`Bandwidth is ${estimatedAvailableMegaBytesPerSeconds.toFixed(3)} Mb/s, network is ${
				isNetworkGoodEnough ? 'GOOD' : 'BAD'
			}`
		);
	}
</script>

<script lang="ts">
	//#if dev
	import MissingAttributes from '$lib/components/dev/MissingAttributes.svelte';
	///if
	import { inViewport } from '$lib/actions/inViewport';

	export let url: string;
	export let width: number; // in px. The _real_ width of single frame
	export let height: number; // in px. The _real_ height of single frame
	export let speed = 100; // 100ms
	export let cols = 1; // number of column in the sprite
	export let rows = 1; // number of rows in the sprite
	export let loop = true;
	export let still: Maybe<string> = null;

	const count = cols * rows;
	const paddingRatio = (height / width) * 100;
	let running = !still;
	let animation: Animation;

	const createBackgroundPosition = (x: number, y: number) => {
		return x + '% ' + y + '%';
	};

	const createAnimation = (node: HTMLDivElement): Animation => {
		let start: number;
		let raf: number;

		const current = {
			col: 0,
			row: 0,
			last: -1
		};
		const size = {
			col: cols < 2 ? 0 : 100 / (cols - 1),
			row: rows < 2 ? 0 : 100 / (rows - 1)
		} as const;

		const newRaf = () => {
			raf = requestAnimationFrame(runLoop);
		};

		const updateBgPosition = () => {
			node.style.backgroundPosition = createBackgroundPosition(
				size.col * current.col,
				size.row * current.row
			);
		};
		const runLoop = (time: number) => {
			const diff = Math.max(0, time - start);
			const framesElapsed = ~~(diff / speed);
			const index = framesElapsed % count;
			if (current.last === index) {
				return newRaf();
			}
			current.last = index;
			current.row = ~~(index / cols);
			current.col = index % cols;
			updateBgPosition();
			if (loop || framesElapsed + 1 < count) {
				newRaf();
			}
		};

		return {
			start() {
				if (cols < 1 || rows < 1) {
					throw new Error('Cannot have a sprite with no cols or no rows');
				}
				start = window.performance.now();
				running = true;
				updateBgPosition();
				newRaf();
			},
			end() {
				cancelAnimationFrame(raf);
			}
		};
	};

	const setup = (node: HTMLDivElement) => {
		animation = createAnimation(node);

		if (!still) {
			animation.start();
		}

		return {
			destroy() {
				animation.end();
			}
		};
	};

	const inViewportCallback = (isIntersecting: boolean): void => {
		if (!still) {
			return;
		}
		if (!isIntersecting) {
			return;
		}
		if (!isNetworkGoodEnough) {
			return;
		}
		let image: Maybe<HTMLImageElement> = document.createElement('img') as HTMLImageElement;
		const loaded = () => {
			animation.start();
			image = null;
		};
		image.onload = loaded;
		image.src = url;
		if (image.complete) {
			loaded();
		}
	};

	$: renderedUrl = running || !still ? url : still;
</script>

{#if url && width && height && count}
	<div
		use:setup
		use:inViewport={{ callback: inViewportCallback, once: true }}
		class="_sprite-animation"
		aria-hidden="true"
		style="
			--background-image: url('{renderedUrl}');
			--background-size: {cols * 100}% {rows * 100}%;
			--padding-bottom: {paddingRatio}%;
		"
	/>
	<!--#if dev-->
{:else}
	<MissingAttributes component="SpriteAnimation" attributes="url,width,height,rows,cols" />
	<!--/if-->
{/if}

<style>
	:global(._sprite-animation) {
		width: 100%;
		height: 0;
		padding-bottom: var(--padding-bottom, 100%);
		display: block;
		background-repeat: no-repeat;
		background-size: var(--background-size, 100% auto);
		background-image: var(--background-image);
		background-clip: border-box;
		overflow: hidden;
		transform: translateZ(0);
	}
</style>
