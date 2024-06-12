<script lang="ts">
	import type { Buttons_Default_Entry, Modules_TextMedia_Entry } from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import RichText from '$com/ui/RichText.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import Media from '$com/ui/Media.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import Sparkle from '$com/svg/Sparkle.svelte';

	export let entry: Modules_TextMedia_Entry & { button?: Buttons_Default_Entry[] };

	const surtitle = entry?.surtitle;
	const title = entry?.displayTitle;
	const text = entry?.richText;
	const button = entry?.button?.[0];
	const media = entry?.media?.[0];
	const reverse = entry?.reverse;
	const highlight = entry?.highlight;
	const highlightBackground = entry?.highlightBackground;
</script>

<ModuleBase width="screen">
	<div class="bp:px-20">
		<div
			class="mx-auto max-w-max px-20 bp:flex bp:justify-center bp:gap-80 bp:px-120 {highlightBackground
				? 'bg-[#EBF5FF] py-80 bp:rounded-20 bp:py-100'
				: ''}"
		>
			<div
				class="flex flex-col items-start justify-center bp:w-500 bp:justify-self-end"
				class:order-2={reverse}
			>
				{#if highlight || highlightBackground}
					<ModuleHeading {title} textAlign="center|left">
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
					<ModuleHeading {surtitle} {title} textAlign="center|left" />
				{/if}
				{#if media}
					<Media class="m-auto mt-40 rounded-16 bp:hidden" {media} />
				{/if}
				{#if text}
					<div class="mt-40 bp:mt-24">
						<RichText {text} type="block-sm" />
					</div>
				{/if}
				{#if button}
					<div class="mt-40 flex self-center bp:mt-48 bp:self-start">
						<ButtonPrimary {button} />
					</div>
				{/if}
			</div>
			{#if media}
				<div class="hidden flex-shrink-0 flex-grow bp:block">
					<Media
						class="h-full max-h-800 w-full max-w-800 rounded-20 object-cover text-center"
						{media}
					/>
				</div>
			{/if}
		</div>
	</div>
</ModuleBase>
