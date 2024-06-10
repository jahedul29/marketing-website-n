<script context="module" lang="ts">
	import { getContext, setContext } from 'svelte/internal';

	type DefaultSliderContext = {
		isFirstItem: () => boolean;
	};

	const CONTEXT_KEY = 'default-slider';

	export const getDefaultSliderContext = () => getContext<DefaultSliderContext>(CONTEXT_KEY);
</script>

<script lang="ts">
	import type { Buttons_Default_Entry } from 'src/craft';
	import { scrollAnimation } from '$lib/actions/scrollAnimation';
	import { Slider, SliderButton, SliderItems } from '$com/ui/slider';
	import PaginationInner from '$com/buttons/PaginationInner.svelte';
	import Next from '$com/svg/Next.svelte';
	import Prev from '$com/svg/Prev.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import ArrowRight from '$com/svg/ArrowRight.svelte';

	type Item = $$Generic;
	type Items = Item[];

	type Slides = { item?: Item; button?: Maybe<Buttons_Default_Entry> };

	interface $$Slots {
		item: { item: Item };
		heading: unknown;
		viewall: unknown;
	}

	export let items: Items;
	export let viewAllButton: Maybe<Buttons_Default_Entry> = null;

	const slides: Slides[] = [
		...items.map((item) => ({
			item
		}))
	];

	if (viewAllButton) {
		slides.push({ button: viewAllButton });
	}

	let firstItemCalled = false;
	const isFirstItem = () => {
		if (firstItemCalled) {
			return false;
		}
		firstItemCalled = true;
		return true;
	};

	setContext<DefaultSliderContext>(CONTEXT_KEY, {
		isFirstItem
	});
</script>

<Slider widthBuffer={40}>
	<div class="mx-auto bp:max-w-max bp:px-120">
		<div class="flex items-end justify-between space-x-80 px-20 bp:px-0">
			<div class="bp:max-w-700">
				<slot name="heading" />
			</div>
			<div class="hidden items-center space-x-16 bp:flex">
				<SliderButton direction="prev" let:disabled>
					<PaginationInner {disabled}>
						<Prev />
					</PaginationInner>
				</SliderButton>
				<SliderButton direction="next" let:disabled>
					<PaginationInner {disabled}>
						<Next />
					</PaginationInner>
				</SliderButton>
			</div>
		</div>
		<div use:scrollAnimation>
			<SliderItems
				itemsWidth="[80vw]|[calc(calc(100%-3.2rem*3)/4)]"
				spaceBetween="20|32"
				spaceBefore="20|0"
				spaceAfter="20|0"
				noscrollbar
				items={slides}
				let:item={slide}
				let:index
			>
				<div
					class="_scroll-reveal-slider-item h-full pb-20 pt-40 bp:pt-48"
					style="--i: {index};"
				>
					{#if slide.button}
						<CraftButton
							class="text-400 group flex h-full flex-col items-center justify-center space-y-8 rounded-20 bg-grey-900 p-12 text-center font-medium text-white"
							button={slide.button}
							let:label
						>
							<span>{label}</span>
							<span
								class="flex h-32 w-32 items-center justify-center rounded-full bg-grey-250 text-grey-900 transition-colors group-hover:bg-blue-500 group-hover:text-white"
							>
								<span class="w-1/2">
									<ArrowRight />
								</span>
							</span>
						</CraftButton>
					{:else if slide.item}
						<slot name="item" item={slide.item} />
					{/if}
				</div>
			</SliderItems>
		</div>
	</div>
</Slider>
