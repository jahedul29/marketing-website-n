<!--@docs
@include docs/ui-components/slider.md
-->
<script context="module" lang="ts">
	import { readonly, type Readable } from 'svelte/store';
	import { getContext } from 'svelte';

	export type ScrollPosition = 'start' | 'middle' | 'end';

	export type Direction = 'next' | 'prev';

	export type StepSize = 'item' | 'ctn';

	interface SliderState {
		position: ScrollPosition;
		navEnabled: boolean;
		stepSize: number;
		stepCount: number;
		currentStep: number;
	}

	export interface SliderApi {
		onNavClick: (direction: Direction) => void;
		registerScrollCtn: (el: HTMLUListElement) => void;
		onSliderScroll: () => void;
		onResize: () => void;
		goToStep: (index: number) => void;
		state: Readable<SliderState>;
	}

	const CONTEXT_KEY = '__slider__';

	export const getSliderContext = () => getContext<SliderApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { reducedMotion } from '$lib/utils/device/reducedMotion';
	import { resize } from '$lib/stores/window/resize';
	import { throttleRaf } from '$lib/utils/timeout/throttleRaf';

	export let widthBuffer = 0;
	let _stepSize: StepSize = 'ctn';
	export { _stepSize as stepSize };

	const _state = writable<SliderState>({
		position: 'start',
		navEnabled: false,
		stepSize: 1,
		stepCount: 1,
		currentStep: 0
	});

	let scrollCtn: HTMLUListElement;

	const getCurrentStep = (stepSize: number) => {
		if (!scrollCtn) {
			return 0;
		}
		const scrollCenter = scrollCtn.scrollLeft + scrollCtn.clientWidth / 2;
		const currentStep = Math.floor(scrollCenter / stepSize);
		return currentStep;
	};

	const scrollBy = (distance: number) => {
		scrollCtn.scrollBy({
			left: distance,
			behavior: reducedMotion() ? 'auto' : 'smooth'
		});
	};

	const onSliderScroll = () => {
		if (!scrollCtn) {
			return;
		}
		const maxScrollPosition = scrollCtn.scrollWidth - scrollCtn.clientWidth;
		const scrollPosition = Math.max(0, scrollCtn.scrollLeft); // scrollLeft can be negative on iOS
		const scrollProgress = scrollPosition / maxScrollPosition;
		const scrollPercent = scrollProgress * 100;
		let position: ScrollPosition = 'middle';
		if (scrollPercent === 0) {
			position = 'start';
		}
		if (scrollPercent >= 99) {
			position = 'end';
		}
		_state.update((state) => {
			const currentStep = getCurrentStep(state.stepSize);
			return {
				...state,
				position,
				currentStep
			};
		});
	};

	const goToStep: SliderApi['goToStep'] = (index) => {
		if (!scrollCtn) {
			return;
		}
		const { stepSize, currentStep } = $_state;
		const indexOffset = index - currentStep;
		const distance = stepSize * indexOffset;
		scrollBy(distance);
	};

	const onNavClick: SliderApi['onNavClick'] = (direction) => {
		if (!scrollCtn) {
			return;
		}
		const { stepSize } = $_state;
		const distance = direction === 'next' ? stepSize : -stepSize;
		scrollBy(distance);
	};

	const updateSteps = () => {
		if (!scrollCtn) {
			return;
		}
		const stepSize =
			_stepSize == 'item' && scrollCtn.children?.[0]?.clientWidth
				? scrollCtn.children?.[0]?.clientWidth
				: scrollCtn.clientWidth;
		const stepCount = Math.ceil(scrollCtn.scrollWidth / stepSize);
		const currentStep = getCurrentStep(stepSize);
		_state.update((state) => {
			return {
				...state,
				stepSize,
				stepCount,
				currentStep
			};
		});
	};

	const updateNavEnabled = () => {
		$_state.navEnabled = scrollCtn
			? scrollCtn.scrollWidth > scrollCtn.clientWidth + widthBuffer
			: false;
	};

	const registerScrollCtn = (el: HTMLUListElement) => {
		scrollCtn = el;
	};

	const onResize = throttleRaf(() => {
		updateSteps();
		updateNavEnabled();
	});

	setContext<SliderApi>(CONTEXT_KEY, {
		onNavClick,
		registerScrollCtn,
		onSliderScroll,
		onResize,
		goToStep,
		state: readonly(_state)
	});

	onMount(() => {
		onSliderScroll();
		onResize();
		return resize.subscribe(onResize);
	});
</script>

<slot navEnabled={$_state.navEnabled} />
