<!--@docs
@include docs/ui-components/tooltip.md
-->
<script lang="ts" context="module">
	// @TODO: Use extracted version
	let currentId = 0;
	const generateId = () => ++currentId;
</script>

<script lang="ts">
	import type { MultiplesOfFour } from '$lib/tailwind/four';
	import type { Inset } from '$lib/tailwind/units';
	import { onMount, tick } from 'svelte';
	import { resize } from '$lib/stores/window/resize';
	import { keydown } from '$lib/stores/window/keydown';
	import { pxToRem } from '$lib/utils/ui/pxToRem';
	import { isTouch } from '$lib/utils/device/isTouch';
	import { checkDocumentBounds } from '$lib/utils/device/checkDocumentBounds';
	import throttle from '$lib/utils/timeout/throttle';
	import { Keys } from '$lib/utils/ui/keys';

	export let type: 'label' | 'description' = 'description';
	export let position: Inset = 'top';
	export let offset: Maybe<MultiplesOfFour> = null;
	export let boundsOffset: Maybe<MultiplesOfFour> = null;
	export let id = `__tooltip__${generateId()}`;
	export let disableOnTouch = false;

	const DOUBLE_TAP_DELAY = 300;

	const isTouchDevice = isTouch();
	const disabled = isTouchDevice && disableOnTouch;

	let visible = false;
	let lastTouch: number;

	const show = () => {
		visible = true;
	};

	const hide = () => {
		visible = false;
	};

	const setPosition = (tooltip: HTMLElement) => {
		const setTooltipPosition = () => {
			const styles: Record<string, string> = {};
			const applyStyles = () =>
				Object.entries(styles).forEach(([key, value]) => {
					tooltip.style[key] = value;
				});
			const tooltipRect = tooltip.getBoundingClientRect();
			const parentRec = tooltip.parentElement?.getBoundingClientRect() || {
				width: 0,
				height: 0
			};
			if (position === 'right') {
				const top = Math.floor(parentRec.height / 2 - tooltipRect.height / 2);
				styles.top = `${top}px`;
				styles.left = '100%';
				styles.paddingLeft = `${offset}px`;
			} else if (position === 'left') {
				const top = Math.floor(parentRec.height / 2 - tooltipRect.height / 2);
				styles.top = `${top}px`;
				styles.right = '100%';
				styles.paddingRight = `${offset}px`;
			} else if (position === 'bottom') {
				const left = Math.floor(parentRec.width / 2 - tooltipRect.width / 2);
				styles.left = `${left}px`;
				styles.top = '100%';
				styles.paddingTop = `${offset}px`;
			} else if (position === 'top') {
				const left = Math.floor(parentRec.width / 2 - tooltipRect.width / 2);
				styles.left = `${left}px`;
				styles.bottom = '100%';
				styles.paddingBottom = `${offset}px`;
			}

			// We need to trash the layout before we can check if it's out of bounds
			applyStyles();

			const outOfBounds = checkDocumentBounds(tooltip);
			const adjustDirection = (direction: keyof typeof styles) => {
				const current = tooltip.style[direction] || '0px';
				styles[direction] = `calc(${current} + ${outOfBounds[direction]}px + ${pxToRem(
					boundsOffset || 0
				)}rem)`;
			};
			Object.entries(outOfBounds).forEach(([direction, value]) => {
				if (value) {
					adjustDirection(direction);
				}
			});

			applyStyles();
		};

		const resizeUnsubscribe = resize.subscribe(throttle(setTooltipPosition, 100));

		setTooltipPosition();
		tick().then(setTooltipPosition);

		return {
			destroy() {
				resizeUnsubscribe();
			}
		};
	};

	const onTouch = (e: Event) => {
		const now = Date.now();
		if (!lastTouch || now - lastTouch > DOUBLE_TAP_DELAY) {
			e.preventDefault();
			lastTouch = now;
		}
	};

	const tooltipSetup = (node: HTMLSpanElement) => {
		if (disabled) {
			return;
		}
		if (!isTouchDevice) {
			node.addEventListener('mouseover', show);
			node.addEventListener('mouseleave', hide);
		}

		return {
			destroy() {
				if (!isTouchDevice) {
					node.removeEventListener('mouseover', show);
					node.removeEventListener('mouseleave', hide);
				}
			}
		};
	};

	const registerTrigger = (node: HTMLElement) => {
		if (disabled) {
			return;
		}
		node.removeAttribute('title');
		node.setAttribute('tabindex', '0');
		node.classList.add('whitespace-nowrap');
		if (type === 'description') {
			node.setAttribute('aria-describedby', id);
		} else {
			node.setAttribute('aria-labelledby', id);
		}

		node.addEventListener('focus', show);
		node.addEventListener('blur', hide);

		if (isTouchDevice) {
			node.addEventListener('click', onTouch);
		} else {
			node.addEventListener('click', hide);
		}

		return {
			destroy() {
				node.removeAttribute('tabindex');

				node.removeEventListener('focus', show);
				node.removeEventListener('blur', hide);

				if (isTouchDevice) {
					node.removeEventListener('click', onTouch);
				} else {
					node.removeEventListener('click', hide);
				}
			}
		};
	};

	onMount(() => {
		if (disabled) {
			return;
		}
		const unsubscribe = keydown.subscribe((e) => {
			if (!visible || e.key !== Keys.Escape) {
				return;
			}
			hide();
		});

		return unsubscribe;
	});
</script>

<span class="relative" data-hierarchy-member={visible} use:tooltipSetup>
	<slot {registerTrigger} />
	{#if !disabled && visible}
		<span {id} role="tooltip" class="absolute block" use:setPosition>
			<slot name="tooltip" />
		</span>
	{/if}
</span>
