<script lang="ts">
	import { mounted } from '$lib/stores/mounted';
	import { page } from '$app/stores';
	import { getModalContext, MODAL_TOGGLE_EVENT } from '$lib/components/ui/modal/Modal.svelte';

	export let modalId: Maybe<string> = null;
	let classes = '';
	export { classes as class };

	const modal = getModalContext();

	const onClick = () => {
		if (modalId) {
			document.dispatchEvent(
				new CustomEvent(MODAL_TOGGLE_EVENT, {
					detail: { id: modalId }
				})
			);
		} else {
			modal.toggle();
		}
	};

	const getHref = () => {
		if (!modal) {
			return;
		}
		const url = new URL($page.url);
		if (url.searchParams.has(modal.id)) {
			url.searchParams.delete(modal.id);
		} else {
			url.searchParams.set(modal.id, '');
		}
		return url.toString();
	};

	const href = getHref();
</script>

{#if $mounted}
	<button type="button" data-modal-trigger="true" class={classes} on:click={onClick}>
		<slot />
	</button>
{:else}
	<a {href} class={classes}>
		<slot />
	</a>
{/if}
