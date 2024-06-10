<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import { createMailShareUrl } from '$lib/utils/ui/share-urls/createMailShareUrl';
	import { tailwindify } from '$lib/tailwind/tailwind';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Twitter from '$com/svg/Twitter.svelte';

	// @TODO add Mail icon svg

	export let url = $page.url.toString();
	export let icon: typeof SvelteComponent = Twitter;
	export let iconWidth: TW.Width | string = '16';
	let classes = '';
	export { classes as class };

	const href = createMailShareUrl(url);
	const label = t('socialShares.mailShare');
	const iconClass = tailwindify('w', iconWidth);
</script>

<HtmlLink {href} class={classes}>
	<slot {label} {icon}>
		<span class="sr-only">{label}</span>
		<span class={iconClass}>
			<svelte:component this={icon} />
		</span>
	</slot>
</HtmlLink>
