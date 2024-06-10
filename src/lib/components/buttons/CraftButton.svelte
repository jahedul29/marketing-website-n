<script lang="ts">
	import type { Button } from '$lib/utils/types/Button';
	import { getLinkAttributes } from '$lib/utils/ui/links';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import ModalEmbed from '$com/modal-embed/ModalEmbed.svelte';

	export let button: Maybe<Button>;

	const { label } = button || {};
	const { href, rel, target, download } = getLinkAttributes(button);
	const modalEmbed = button?.modalEmbed?.[0];
</script>

{#if modalEmbed}
	<ModalEmbed {modalEmbed} buttonClasses={$$restProps.class}>
		<slot external={false} href={null} {label}>
			{label}
		</slot>
	</ModalEmbed>
{:else if button}
	<HtmlLink {href} {rel} {target} {download} {...$$restProps} let:external>
		<slot {external} {href} {label}>
			{label}
		</slot>
	</HtmlLink>
{/if}
