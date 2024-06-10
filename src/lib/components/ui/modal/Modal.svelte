<!--@docs
@include docs/ui-components/modal.md
-->
<script context="module" lang="ts">
	import { getContext } from 'svelte';

	export interface ModalApi {
		close: () => void;
		toggle: () => void;
		id: string;
		setTitleId: (id: string) => void;
		setDescriptionId: (id: string) => void;
	}

	const CONTEXT_KEY = '__modal__';

	export const MODAL_TOGGLE_EVENT = 'modal.toggle';

	export const getModalContext = () => getContext<ModalApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { page } from '$app/stores';
	import { portal } from '$lib/actions/portal';
	import { trapFocus } from '$lib/actions/trapFocus';
	import { scrollLock } from '$lib/actions/scrollLock';
	import { clickOutside } from '$lib/actions/clickOutside';
	import { keydown } from '$lib/stores/window/keydown';

	export let id: string;
	export let open = $page.url.searchParams.has(id);
	export let unmount = false;
	export let transitionDuration = '0s';
	export let initialFocus: Maybe<HTMLElement> = null;
	let classes = '';
	export { classes as class };

	let modal: HTMLDivElement;
	let titleId: Maybe<string> = null;
	let descriptionId: Maybe<string> = null;

	export const close: ModalApi['close'] = () => {
		open = false;
	};

	const onClickOutside = (e: PointerEvent) => {
		const target = e.target as HTMLElement;
		if (target.closest(`[data-modal-trigger="true"]`)) {
			return;
		}
		close();
	};

	const toggle: ModalApi['toggle'] = () => {
		open = !open;
	};

	const setTitleId: ModalApi['setTitleId'] = (id) => {
		if (titleId) {
			return;
		}
		titleId = id;
	};

	const setDescriptionId: ModalApi['setDescriptionId'] = (id) => {
		if (descriptionId) {
			return;
		}
		descriptionId = id;
	};

	setContext<ModalApi>(CONTEXT_KEY, {
		id,
		close,
		toggle,
		setTitleId,
		setDescriptionId
	});

	onMount(() => {
		if ($page.url.searchParams.has(id)) {
			const url = new URL($page.url);
			url.searchParams.delete(id);
			window.history.replaceState({}, document.title, url.toString());
		}
		const unsbuscribe = keydown.subscribe((e) => {
			if (!open || e.code !== 'Escape') {
				return;
			}
			const openChild = modal?.querySelector('[data-hierarchy-member="open"]');
			if (openChild) {
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			close();
		});

		const onModalToggle = (e: CustomEvent<{ id: string }>) => {
			if (e.detail.id === id) {
				toggle();
			}
		};

		document.addEventListener(MODAL_TOGGLE_EVENT, onModalToggle);

		return () => {
			unsbuscribe();
			document.removeEventListener(MODAL_TOGGLE_EVENT, onModalToggle);
		};
	});
</script>

<slot {open} {close} {toggle} />
{#if !unmount}
	<div
		{id}
		aria-modal={open}
		role="dialog"
		aria-labelledby={titleId}
		aria-describedby={descriptionId}
		class={classes}
		data-hierarchy-member={open ? 'open' : false}
		use:portal
		use:trapFocus={{ visible: open, initialFocus, hasTransition: true }}
		use:scrollLock={open}
		use:clickOutside={onClickOutside}
		bind:this={modal}
		style="visibility: {open ? 'visible' : 'hidden'};
transition: visibility 0s linear {open ? '0s' : transitionDuration};"
	>
		<slot name="content" {open} {close} {toggle} />
	</div>
{:else if open}
	<div
		{id}
		aria-modal={open}
		role="dialog"
		aria-labelledby={titleId}
		aria-describedby={descriptionId}
		class={classes}
		data-hierarchy-member={open ? 'open' : false}
		use:portal
		use:trapFocus={{ visible: open, initialFocus }}
		use:scrollLock={true}
		use:clickOutside={onClickOutside}
		bind:this={modal}
	>
		<slot name="content" {open} {close} {toggle} />
	</div>
{/if}
