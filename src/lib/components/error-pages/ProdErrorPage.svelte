<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import PageNotFound from '$com/error-pages/PageNotFound.svelte';

	const { status, error } = $page;
	const message = error?.message;
</script>

{#if status === 404}
	<PageNotFound />
{:else}
	<div class="space-y-16 p-16">
		<h1 class="font-semibold">
			{t('errorPage.serverError')}
		</h1>
		<p>Status {status}</p>
		{#if message}
			<p>{error?.message}</p>
		{/if}
	</div>
{/if}
