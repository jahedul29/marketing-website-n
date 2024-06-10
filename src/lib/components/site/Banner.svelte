<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import { BANNER_DISMISS_COOKIE } from '$lib/constants';
	import RichText from '$com/ui/RichText.svelte';

	const { banner } = $page.data;
	const { bannerText, dateUpdated } = banner || {};

	let show = false;

	const onDismiss = () => {
		show = false;
		localStorage.setItem(BANNER_DISMISS_COOKIE, dateUpdated);
	};

	onMount(() => {
		show = !!bannerText && localStorage.getItem(BANNER_DISMISS_COOKIE) !== dateUpdated;
	});
</script>

{#if show}
	<aside
		out:slide={{ easing: expoOut, duration: 500 }}
		class="relative z-[200] flex w-full items-center bg-wheat-500 px-20 py-12 bp:justify-center bp:text-center"
	>
		<div class="max-w-3/4">
			<RichText text={bannerText} type="inline" let:text>
				<p class="text-100 leading-20">{@html text}</p>
			</RichText>
		</div>
		<div class="absolute right-20 top-1/2 flex -translate-y-1/2">
			<button class="w-32 bp:w-24" aria-label={t('banner.dismiss')} on:click={onDismiss}>
				<svg
					class="w-full"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_1214_61550)">
						<path
							d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
							fill="#131313"
						/>
					</g>
					<defs>
						<clipPath id="clip0_1214_61550">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</button>
		</div>
	</aside>
{/if}
