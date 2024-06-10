<script lang="ts">
	import type { Buttons_Default_Entry, Modules_CtaBigDaddy_Entry } from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import Image from '$com/ui/Image.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import { SIZES_FULL_MOBILE_THIRD_DESKTOP } from '$lib/utils/ui/imageSizes';

	export let entry: Modules_CtaBigDaddy_Entry & { button?: Buttons_Default_Entry[] };

	const { surtitle, displayTitle, color } = entry || {};
	const image = entry?.image?.[0];
	const button = entry?.button?.[0];
</script>

<ModuleBase>
	<div
		class="flex flex-col rounded-16"
		class:bp:flex-row-reverse={!!image}
		data-theme-color={color || ''}
	>
		{#if image}
			<Image
				class="w-full rounded-16 object-cover bp:w-1/2 bp:flex-shrink-0"
				{image}
				sizes={SIZES_FULL_MOBILE_THIRD_DESKTOP}
			/>
		{/if}
		<div class="flex flex-col items-start p-20 bp:p-60">
			{#if surtitle}
				<h2 class="text-200 mb-12 leading-10 text-black-750-alpha">{surtitle}</h2>
			{/if}
			{#if displayTitle}
				<p class="text-700 mb-40 font-medium leading-20 bp:max-w-700">
					{displayTitle}
				</p>
			{/if}
			{#if button}
				<ButtonPrimary {button} type="outlined" color="black" size="lg" />
			{/if}
		</div>
	</div>
</ModuleBase>
