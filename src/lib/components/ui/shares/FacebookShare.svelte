<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import { createFacebookShareUrl } from '$lib/utils/ui/share-urls/createFacebookShareUrl';
	import { tailwindify } from '$lib/tailwind/tailwind';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Facebook from '$com/svg/Facebook.svelte';

	export let url = $page.url.toString();
	export let icon: typeof SvelteComponent = Facebook;
	export let iconWidth: TW.Width | string = '16';
	let classes = '';
	export { classes as class };

	const href = createFacebookShareUrl(url);
	const label = t('socialShares.facebookShare');
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
