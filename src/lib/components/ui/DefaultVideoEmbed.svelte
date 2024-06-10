<script lang="ts">
	import type { Assets_Asset } from 'src/craft';
	import { fade } from 'svelte/transition';
	import { t } from '$lib/translations/global';
	import PlayButton from '$com/ui/PlayButton.svelte';
	import EmbedGroup from '$com/ui/video-embed/EmbedGroup.svelte';
	import EmbedSelector from '$com/ui/video-embed/EmbedSelector.svelte';
	import EmbedPlayButton from '$com/ui/video-embed/decoration/EmbedPlayButton.svelte';
	import EmbedPoster from '$com/ui/video-embed/decoration/EmbedPoster.svelte';

	export let url: string;
	export let poster: Maybe<Assets_Asset> = null;
	export let label: Maybe<string> = null;
</script>

<EmbedGroup let:playing>
	<div
		class="relative grid aspect-[16/9] h-full w-full overflow-hidden rounded-16 grid-stack bp:rounded-20"
	>
		<EmbedSelector {url} let:EmbedComponent>
			<svelte:component this={EmbedComponent} {url} autoplay muted={false} />
		</EmbedSelector>
		{#if !playing}
			<div out:fade|local={{ duration: 150 }}>
				<EmbedPlayButton>
					<div class="grid place-items-center grid-stack">
						<EmbedPoster {url} {poster} class="h-full w-full object-cover" />
						<PlayButton label={label || t('media.play')} />
					</div>
				</EmbedPlayButton>
			</div>
		{/if}
	</div>
</EmbedGroup>
