<script lang="ts">
	import { page } from '$app/stores';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';

	const { config } = $page.data;
	const socials = config?.socials;
</script>

{#if socials?.length}
	<ul class="flex gap-16">
		{#each socials as social}
			{@const label = social?.platformName}
			{@const href = social?.platformUrl}
			{@const logo = social?.platformLogo?.[0]}
			{#if href}
				<li class="flex">
					<HtmlLink
						class="rounded-full opacity-80 transition-opacity hover:opacity-100"
						{href}
						aria-label={label}
					>
						{#if logo}
							<Image image={logo} />
						{/if}
					</HtmlLink>
				</li>
			{/if}
		{/each}
	</ul>
{/if}
