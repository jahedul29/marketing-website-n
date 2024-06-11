<script lang="ts">
	import type { Modules_Grid_Entry } from 'src/craft';
	import { SIZES_ICON } from '$lib/utils/ui/imageSizes';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import Image from '$com/ui/Image.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';
	import ArrowLinkInner from '$com/buttons/ArrowLinkInner.svelte';
	import { toButtonEntry } from '$lib/utils/types/Button';

	export let entry: Modules_Grid_Entry;
	export let leftAlign: boolean = false;

	const { surtitle, displayTitle, plainText, gridItems } = entry || {};
</script>

<ModuleBase>
	<div class="space-y-40 bp:space-y-60">
		<ModuleHeading {surtitle} title={displayTitle} text={plainText} />
		{#if gridItems?.length}
			<ul class="grid gap-40 bp:flex bp:items-start bp:gap-60">
				{#each gridItems as item}
					{@const { color, displayTitle, text } = item || {}}
					{@const icon = item?.icon?.[0]}
					{@const button = toButtonEntry(item?.button?.[0])}

					<li
						class={`flex flex-col ${
							!leftAlign && 'items-center'
						} space-y-24 bp:max-w-1/2 bp:flex-1`}
					>
						{#if icon}
							<div
								class="flex h-60 w-60 items-center justify-center rounded-8"
								data-theme-color={color || ''}
							>
								<Image
									class="h-2/3 w-2/3 object-contain"
									image={icon}
									sizes={SIZES_ICON}
								/>
							</div>
						{/if}
						<div
							class={`flex flex-col space-y-16 ${
								leftAlign ? ' text-left' : 'items-center text-center'
							}`}
						>
							{#if displayTitle}
								<h3 class="text-20 font-medium leading-20 bp:text-26">
									{displayTitle}
								</h3>
							{/if}
							{#if text}
								<p class="text-16 leading-30 text-black-750-alpha">{text}</p>
							{/if}
							{#if button}
								<CraftButton {button} let:label>
									<ArrowLinkInner {label} />
								</CraftButton>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</ModuleBase>
