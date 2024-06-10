<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	const { status } = $page;
</script>

<section class="flex flex-col items-center justify-center px-20 py-60 text-center bp:py-120">
	<div class="flex flex-col items-center space-y-32 bp:max-w-600 bp:space-y-60">
		<div>
			<h1 class="text-900 font-medium leading-10">{status}</h1>
			<h2 class="text-700 font-medium leading-10">
				{#if status === 404}
					{t('errorPage.pageNotFound')}
				{:else}
					{t('errorPage.serverError')}
				{/if}
			</h2>
		</div>
		<img src="/img/404-img.svg" alt="" />
		<p class="text-300 text-black-750-alpha">
			{#if status === 404}
				{t('errorPage.notFoundText')}
			{:else}
				{t('errorPage.serverErrorText')}
			{/if}
		</p>
		<ButtonPrimary button={{ siteEntry: [{ uri: '__home__' }] }}>
			{t('errorPage.linkLabel')}
		</ButtonPrimary>
	</div>
</section>
