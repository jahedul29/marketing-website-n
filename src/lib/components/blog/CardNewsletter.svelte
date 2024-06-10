<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import NewsletterSquiggle from '$com/svg/NewsletterSquiggle.svelte';
	import BlogNewsletter from '$com/forms/BlogNewsletter.svelte';

	const color = getContext('theme-color');
	const title = $page.data.newsletter?.newsletterTitle;
	const text = $page.data.newsletter?.newsletterText;
</script>

<aside
	class="relative h-full overflow-hidden rounded-16 p-20 bp:rounded-20"
	data-theme-color={color || ''}
>
	<div class="absolute left-1/5 top-0 h-1/2 w-[130%] -translate-y-1/4">
		<NewsletterSquiggle />
	</div>
	<div class="relative flex h-full flex-col justify-between space-y-40">
		<div class="space-y-16">
			{#if title}
				<h2 class="max-w-2/3 text-28 font-medium leading-10 bp:text-40">{title}</h2>
			{/if}
			{#if text}
				<p class="text-200 text-black-900-alpha">{text}</p>
			{/if}
		</div>
		<BlogNewsletter />
	</div>
</aside>
