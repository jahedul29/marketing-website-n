<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import { copyOnClick } from '$lib/actions/copyOnClick';
	import { tailwindify } from '$lib/tailwind/tailwind';
	import CopyUrl from '$com/svg/CopyUrl.svelte';

	interface $$Slots {
		default: { label: string; icon: typeof SvelteComponent };
		message: { message: string };
	}

	export let url = $page.url.toString();
	export let icon: typeof SvelteComponent = CopyUrl;
	export let iconWidth: TW.Width | string = '16';
	export let messageDelay = 10000;
	let classes = '';
	export { classes as class };

	const label = t('copyOnClick.copyUrl');
	const message = t('copyOnClick.urlCopied');
	const iconClass = tailwindify('w', iconWidth);

	let urlCopied = false;

	const onUrlCopied = () => {
		urlCopied = true;
		setTimeout(() => {
			urlCopied = false;
		}, messageDelay);
	};
</script>

<div class="relative flex">
	<button type="button" on:urlcopied={onUrlCopied} use:copyOnClick={url}>
		<span class={classes}>
			<slot {label} {icon}>
				<span class="sr-only">{label}</span>
				<span class={iconClass}>
					<svelte:component this={icon} />
				</span>
			</slot>
		</span>
	</button>
	{#if urlCopied}
		<div aria-hidden="true">
			<slot name="message" {message}>
				<p class="absolute left-1/2 top-full mt-4 -translate-x-1/2">
					{message}
				</p>
			</slot>
		</div>
	{/if}
	<div aria-live="polite" class="sr-only">
		{#if urlCopied}
			{message}
		{/if}
	</div>
</div>
