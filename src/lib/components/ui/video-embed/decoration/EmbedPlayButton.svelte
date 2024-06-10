<script lang="ts">
	import { t } from '$lib/translations/global';
	import { getVideoEmbedContext } from '$com/ui/video-embed/EmbedGroup.svelte';

	let classes = 'h-full w-full';
	export { classes as class };
	export let playLabel = t('media.play');

	const api = getVideoEmbedContext();
	const { setPreconnect, play } = api;
</script>

<button
	class={classes}
	type="button"
	on:pointerover={setPreconnect}
	on:click={play}
	aria-label={playLabel}
>
	<slot />
</button>
