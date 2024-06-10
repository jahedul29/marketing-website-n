<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import Socials from '$com/site/footer/Socials.svelte';
	import FooterNewsletter from '$com/forms/FooterNewsletter.svelte';
	import FooterDrawers from '$com/site/footer/FooterDrawers.svelte';
	import FooterMenus from '$com/site/footer/FooterMenus.svelte';
	import FooterLegal from '$com/site/footer/FooterLegal.svelte';

	$: entry = $page.data?.entry;
</script>

<footer
	class="relative bp:px-20 bp:pb-20 {$page.data.pageOptions?.disableFooterCtas ||
	entry?.simplified
		? 'pt-100 bp:pt-160'
		: ''}"
>
	<div
		class="{!entry?.simplified
			? 'p-20 bp:p-60'
			: 'pb-20 pl-20 pr-20 bp:px-60'} rounded-t-16 bg-grey-900 bp:rounded-24 bp:pb-32"
	>
		<div class="mx-auto flex max-w-hd flex-col bp:flex-row bp:flex-wrap bp:justify-between">
			{#if !entry?.simplified}
				<div class="flex flex-col items-center space-y-40 bp:w-420 bp:items-start">
					<a href="/" class="w-48 self-start text-white">
						<img src="/img/logo-footer.svg" alt="" />
						<span class="sr-only">{t('home')}</span>
					</a>
					<FooterNewsletter />
					<Socials />
				</div>
				<div
					class="space-y-60 pb-40 pt-60 bp:flex bp:items-start bp:space-x-120 bp:space-y-0"
				>
					<FooterDrawers />
					<FooterMenus />
				</div>
			{/if}
			<FooterLegal />
		</div>
	</div>
</footer>
