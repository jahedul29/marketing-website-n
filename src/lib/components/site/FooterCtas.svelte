<script lang="ts">
	import type { FooterCtasSectionEntryUnion } from 'src/craft';
	import { page } from '$app/stores';
	import TitleLines from '$com/svg/TitleLines.svelte';
	import Default from '$com/site/footer-ctas/Default.svelte';
	import TemplateNotification from '$com/site/footer-ctas/TemplateNotification.svelte';
	import { parallax } from '$lib/actions/parallax';

	const { footer } = $page.data;

	$: entry = $page.data?.entry;
	$: ctaSection = $page.data.pageOptions?.disableFooterCtas
		? null
		: entry?.footerCtas?.[0] || footer?.footerCtas?.[0];
	$: subtitle = ctaSection?.subtitle;
	$: displayTitle = ctaSection?.displayTitle;
	$: ctas = ctaSection?.ctas as FooterCtasSectionEntryUnion[];
</script>

{#if !$page.error && ctas?.length && !entry?.simplified}
	<aside class="grid grid-stack">
		<div class="h-screen max-h-900 w-full translate-y-1/4">
			<img
				class="h-full w-full object-cover"
				src="/img/footer-ctas-bg.svg"
				alt=""
				use:parallax={{ speed: -0.1 }}
			/>
		</div>
		<div class="relative mx-auto w-full max-w-max px-20 py-60 bp:px-120 bp:py-160">
			<div class="space-y-20">
				{#if displayTitle}
					<h2 class="text-700 font-medium leading-10">{displayTitle}<TitleLines /></h2>
				{/if}
				{#if subtitle}
					<h3 class="text-300">{subtitle}</h3>
				{/if}
			</div>
			<div class="mt-60 grid gap-32" class:bp:grid-cols-2={ctas.length > 1}>
				{#if ctas?.length}
					{#each ctas as cta, i}
						{#if cta?.__typename === 'footerCtas_default_Entry'}
							<Default {cta} primary={i === 0} featured={ctas.length === 1} />
						{/if}
						{#if cta?.__typename === 'footerCtas_templateNotifications_Entry'}
							<TemplateNotification {cta} featured={ctas.length === 1} />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</aside>
{/if}
