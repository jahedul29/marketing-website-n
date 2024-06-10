<script lang="ts">
	import { isYoutube } from '$lib/utils/ui/youtube';
	import { isVimeo } from '$lib/utils/ui/vimeo';
	import YtEmbed from '$com/ui/video-embed/YTEmbed.svelte';
	import VimeoEmbed from '$com/ui/video-embed/VimeoEmbed.svelte';

	// Embed component specific options
	export let url: Maybe<string>;
	export let title: Maybe<string> = null;

	const providers = {
		youtube: YtEmbed,
		vimeo: VimeoEmbed
	};

	const provider: Maybe<keyof typeof providers> = isYoutube(url)
		? 'youtube'
		: isVimeo(url)
		? 'vimeo'
		: null;

	const EmbedComponent = provider ? providers[provider] : null;
</script>

<slot {provider} {EmbedComponent}>
	{#if EmbedComponent}
		<svelte:component this={EmbedComponent} {url} {title} />
	{/if}
</slot>
