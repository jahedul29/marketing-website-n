<script context="module" lang="ts">
	import { writable, type Readable, readonly } from 'svelte/store';
	import { setContext, getContext } from 'svelte';

	export interface VideoEmbedApi {
		playing: Readable<boolean>;
		preconnect: Readable<boolean>;
		setPreconnect: () => void;
		play: () => void;
	}

	const CONTEXT_KEY = '__videoEmbed__';

	export const getVideoEmbedContext = () => getContext<VideoEmbedApi>(CONTEXT_KEY);
</script>

<script lang="ts">
	const playing = writable(false);
	const preconnect = writable(false);

	const setPreconnect = () => {
		preconnect.set(true);
	};

	const play = () => {
		playing.set(true);
	};

	setContext(CONTEXT_KEY, {
		playing: readonly(playing),
		preconnect: readonly(preconnect),
		setPreconnect,
		play
	});
</script>

<slot playing={$playing} preconnect={$preconnect} />
