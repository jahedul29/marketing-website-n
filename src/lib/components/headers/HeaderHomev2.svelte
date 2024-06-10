<script lang="ts">
	import type { Assets_Asset, Buttons_Default_Entry } from 'src/craft';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import TitleLines from '$com/svg/TitleLines.svelte';
	import WhatWeDo from '$lib/components/whatWeDo/WhatWeDo.svelte';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';

	export let displayTitle: Maybe<string> = null;
	export let plainText: Maybe<string> = null;
	export let buttons: Maybe<Buttons_Default_Entry>[] = [];
	export let logos: Maybe<Assets_Asset>[] = [];

</script>

<section class="mx-auto max-w-hd mt-0 py-20 pb-0 text-center bp:py-120 bp:pb-0 bp:text-left">
	<div class="mx-auto flex max-w-360 flex-col items-center text-center bp:max-w-1024">
		{#if displayTitle}
			<h2 class="text-900 font-medium leading-20">
				{displayTitle}<TitleLines />
			</h2>
		{/if}
		{#if plainText}
			<p class="text-300 mt-32 leading-30 opacity-70">
				{plainText}
			</p>
		{/if}
		<div class="mt-32 flex w-full justify-center">
			{#if buttons?.length}
				<div class="mt-32 flex space-x-16">
					{#each buttons as button, i}
						<ButtonPrimary
							{button}
							color="black"
							size="lg"
							type={i === 0 ? 'filled' : 'outlined'}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<WhatWeDo />
	{#if logos?.length}
		<div
			class="_intro-reveal-sm pointer-events-auto mt-80 w-full"
			style="--section: 3;"
		>
			<HeaderLogos {logos} center={true} is_hero={true}/>
		</div>
	{/if}
</section>
