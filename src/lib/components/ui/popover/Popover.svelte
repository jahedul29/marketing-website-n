<!--@docs
@include docs/ui-components/popover.md
-->
<script context="module" lang="ts">
	import type { Readable } from 'svelte/store';
	import { getContext } from 'svelte';

	interface PopoverReturn {
		destroy: () => void;
	}

	export interface PopoverApi {
		id: string;
		registerButton: (
			button: HTMLButtonElement | HTMLAnchorElement
		) => MaybeUndefined<PopoverReturn>;
		registerPanel: (button: HTMLDivElement) => MaybeUndefined<PopoverReturn>;
		open: Readable<boolean>;
		toggle: () => void;
		close: () => void;
		hover: boolean;
	}

	const CONTEXT_KEY = '__popover__';

	export const getPopoverContext = () => getContext<PopoverApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { onMount, setContext, createEventDispatcher } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { clickUseCapture } from '$lib/stores/window/clickUseCapture';
	import { keydown } from '$lib/stores/window/keydown';
	import { focusin } from '$lib/stores/window/focusin';
	import { pointerdown } from '$lib/stores/window/pointerdown';
	import { mounted } from '$lib/stores/mounted';
	import { scrollLock } from '$lib/actions/scrollLock';
	import { Keys } from '$lib/utils/ui/keys';

	export let id: string;
	export let open = false;
	export let unmount = false;
	export let hover = false;
	export let lockScroll = false;
	export let transitionDuration = '0s';
	let classes = '';
	export { classes as class };

	interface PopoverState {
		open: boolean;
		button: HTMLButtonElement | HTMLAnchorElement | null;
		panel: HTMLDivElement | null;
	}

	interface $$Events {
		open: CustomEvent<void>;
		close: CustomEvent<void>;
	}

	const dispatch = createEventDispatcher<{ open: void; close: void }>();

	let popover: HTMLDivElement;
	let _transitionDuration = '0s';
	let tabFocus = false;

	const _state = writable<PopoverState>({
		open,
		button: null,
		panel: null
	});

	const registerButton: PopoverApi['registerButton'] = (button) => {
		if ($_state.button) {
			return;
		}
		$_state.button = button;

		return {
			destroy: () => {
				$_state.button = null;
			}
		};
	};

	const registerPanel: PopoverApi['registerPanel'] = (panel) => {
		if ($_state.panel) {
			return;
		}
		$_state.panel = panel;

		return {
			destroy: () => {
				$_state.panel = null;
			}
		};
	};

	const toggle = () => {
		$_state.open = !$_state.open;
	};

	export const close: PopoverApi['close'] = () => {
		if (!$_state.open) {
			return;
		}
		$_state.open = false;
		const { button, panel } = $_state;
		const element = document.activeElement;
		if (button?.contains(element) || panel?.contains(element)) {
			button?.focus();
		}
	};

	const openState = derived(_state, (state) => state.open);

	const handleEscape = (e: KeyboardEvent) => {
		const openChild = popover.querySelector('[data-hierarchy-member="open"]');
		if (openChild) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		close();
	};

	openState.subscribe((open) => {
		if (open) {
			dispatch('open');
		} else {
			dispatch('close');
		}
	});

	setContext<PopoverApi>(CONTEXT_KEY, {
		id,
		registerButton,
		registerPanel,
		open: openState,
		toggle,
		close,
		hover
	});

	onMount(() => {
		const clickUnsubscribe = clickUseCapture.subscribe((e) => {
			const { button, panel, open } = $_state;
			if (!open || !button || !panel) {
				return;
			}
			const target = e.target as HTMLElement;
			if (button.contains(target) || panel.contains(target)) {
				return;
			}
			close();
		});

		const pointerdownUnsubscribe = pointerdown.subscribe(() => {
			tabFocus = false;
		});

		const keydownUnsubscribe = keydown.subscribe((e) => {
			if (!$_state.open) {
				return;
			}
			tabFocus = false;
			if (e.key === Keys.Escape) {
				handleEscape(e);
			}
			if (e.key === Keys.Tab) {
				tabFocus = true;
			}
		});

		const focusUnsubscribe = focusin.subscribe(() => {
			if (!tabFocus) {
				return;
			}
			const { button, panel, open } = $_state;
			if (!open || !button || !panel) {
				return;
			}

			const target = document.activeElement as HTMLElement;
			if (!target) {
				return;
			}
			if (button.contains(target) || panel.contains(target) || target === document.body) {
				return;
			}
			close();
		});

		return () => {
			clickUnsubscribe();
			pointerdownUnsubscribe();
			keydownUnsubscribe();
			focusUnsubscribe();
		};
	});

	const setup = (node: HTMLDivElement) => {
		// Only allow transition duration if js is enabled, otherwise the transition
		// will also be applied at the opening of the popover.
		_transitionDuration = transitionDuration;

		if (!hover) {
			return;
		}

		// Setup hover listeners
		// Even though the popover can be toggled on hover via css, we still need to update
		// the state so that assistive technologies can get the right attribute values
		const toggleOpen = () => {
			$_state.open = true;
		};

		node.addEventListener('mouseenter', toggleOpen);
		node.addEventListener('mouseleave', close);

		let lockScrollDestroy: () => void;
		if (lockScroll) {
			const { destroy } = scrollLock(node, $openState);
			lockScrollDestroy = destroy;
		}

		return {
			destroy: () => {
				lockScrollDestroy?.();
				if (!hover) {
					return;
				}
				node.removeEventListener('mouseenter', toggleOpen);
				node.removeEventListener('mouseleave', close);
			}
		};
	};

	$: open = $_state.open;
</script>

<div
	class="{classes} {hover ? 'group' : ''}"
	data-hierarchy-member={$openState ? 'open' : false}
	bind:this={popover}
	use:setup
>
	<slot open={$openState} {close} />
	{#if !unmount}
		<div
			class:invisible={!$openState}
			class:group-focus-within:visible={hover && !$mounted}
			class:pointer:group-hover:visible={hover}
			style="transition: visibility 0s linear {$openState ? '0s' : _transitionDuration};"
		>
			<slot name="content" open={$openState} {close} />
		</div>
	{:else if $openState}
		<slot name="content" open={$openState} {close} />
	{/if}
</div>
