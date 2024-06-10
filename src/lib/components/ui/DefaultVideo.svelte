<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import { fade } from 'svelte/transition';
	import { t } from '$lib/translations/global';
	import { mounted } from '$lib/stores/mounted';
	import Video from '$com/ui/video/Video.svelte';
	import Image from '$com/ui/Image.svelte';
	import PlayButton from '$com/ui/PlayButton.svelte';

	export let media: Assets_Asset;
	export let poster: Maybe<Assets_Asset> = null;
	export let autoplay = false;

	let video: HTMLVideoElement;
	let played = autoplay;

	const onPlay = () => {
		played = true;
		video.play();
	};
</script>

<div class="group grid h-full w-full overflow-hidden rounded-16 grid-stack bp:rounded-20">
	<Video
		bind:element={video}
		class="h-full w-full object-cover"
		video={media}
		loop={autoplay}
		muted={autoplay}
		{autoplay}
		controls={!$mounted || ($mounted && played)}
		{poster}
	/>
	{#if $mounted && !played}
		<button
			type="button"
			class="relative grid h-full w-full cursor-pointer grid-stack"
			out:fade={{ duration: 150 }}
			on:click={onPlay}
			aria-label={t('media.play')}
		>
			{#if poster}
				<Image class="_image-scale h-full w-full object-cover" image={poster} />
			{/if}
			<PlayButton label={t('media.play')} />
		</button>
	{/if}
</div>
