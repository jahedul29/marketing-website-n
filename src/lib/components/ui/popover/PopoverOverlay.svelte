<script lang="ts">
	import { getPopoverContext } from '$lib/components/ui/popover/Popover.svelte';

	let classes = '';
	export { classes as class };

	const api = getPopoverContext();
	const { close, hover } = api;

	const setup = (node: HTMLDivElement) => {
		if (hover) {
			node.style.pointerEvents = 'none';
		} else {
			node.addEventListener('click', close);
		}

		return {
			destroy: () => {
				if (hover) {
					return;
				}
				node.removeEventListener('click', close);
			}
		};
	};
</script>

{#if api}
	<div aria-hidden="true" class={classes} use:setup>
		<slot />
	</div>
{/if}
