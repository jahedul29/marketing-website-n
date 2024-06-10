<script lang="ts">
	import type { Buttons_Default_Entry, FooterCtas_Default_Entry } from 'src/craft';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import { getHref } from '$lib/utils/ui/links';
	import ButtonPrimaryInner from '$com/buttons/ButtonPrimaryInner.svelte';

	export let cta: FooterCtas_Default_Entry;
	export let primary = false;
	export let featured = false;

	const { surtitle, plainTitle } = cta || {};
	const button = cta?.button?.[0] as Buttons_Default_Entry;
	const href = getHref(button);
	const label = button?.label;
</script>

<HtmlLink
	{href}
	class="_primary group flex flex-col items-center rounded-20 bg-white-750-alpha px-56 py-72 text-center shadow-500 backdrop-blur-900 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-4 hover:shadow-600"
>
	{#if surtitle}
		<p class="mb-8 text-16 font-medium leading-10 text-blue-500">{surtitle}</p>
	{/if}
	{#if plainTitle}
		<h3 class="text-24 mb-48 max-w-720 font-medium {featured ? 'bp:text-48' : 'bp:text-40'}">
			{plainTitle}
		</h3>
	{/if}
	{#if button}
		<div class="mt-auto flex">
			<ButtonPrimaryInner color="black" type={primary ? 'filled' : 'outlined'}>
				{label}
			</ButtonPrimaryInner>
		</div>
	{/if}
</HtmlLink>
