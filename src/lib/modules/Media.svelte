<script lang="ts">
	import type { Modules_Media_Entry } from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import DefaultVideoEmbed from '$com/ui/DefaultVideoEmbed.svelte';
	import DefaultVideo from '$com/ui/DefaultVideo.svelte';
	import Image from '$com/ui/Image.svelte';
	import Sparkle from '$com/svg/Sparkle.svelte';

	export let entry: Modules_Media_Entry;

	const {
		surtitle,
		displayTitle,
		plainText,
		framed,
		highlight,
		highlightBackground,
		embedVideoUrl,
		autoplay
	} = entry || {};
	const media = entry?.media?.[0];
	const poster = entry?.poster?.[0];
</script>

<ModuleBase width="screen">
	<div class="bp:px-20">
		<div
			class="space-y-32 px-20 bp:space-y-60 bp:px-0 {highlightBackground
				? 'bg-wheat-500 py-80 bp:rounded-20 bp:py-100'
				: ''}"
		>
			{#if highlight || highlightBackground}
				<ModuleHeading title={displayTitle} text={plainText}>
					<svelte:fragment slot="surtitle">
						{#if surtitle}
							<p
								class="mb-8 flex items-center justify-center space-x-4 rounded-full px-12 py-4 text-14 font-medium {highlightBackground
									? 'bg-wheat-700 text-wheat-500'
									: 'bg-wheat-500 text-wheat-700'}"
							>
								<span>{surtitle}</span>
								<span class="w-12">
									<Sparkle />
								</span>
							</p>
						{/if}
					</svelte:fragment>
				</ModuleHeading>
			{:else}
				<ModuleHeading {surtitle} title={displayTitle} text={plainText} />
			{/if}
			<div
				class="{framed || highlightBackground
					? 'rounded-20 bg-white p-8 shadow-100 bp:rounded-40 bp:p-20'
					: ''} mx-auto max-w-max"
			>
				{#if embedVideoUrl}
					<DefaultVideoEmbed url={embedVideoUrl} {poster} />
				{:else if media?.kind === 'video'}
					<DefaultVideo {media} {poster} autoplay={autoplay || false} />
				{:else if media?.kind === 'image'}
					<Image class="h-full w-full rounded-16 bp:rounded-20" image={media} />
				{/if}
			</div>
		</div>
	</div>
</ModuleBase>
