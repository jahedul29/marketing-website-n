<script lang="ts">
	import type { AssetKits_Kit_BlockType } from 'src/craft';
	import { t } from '$lib/translations/global';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import Image from '$com/ui/Image.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	export let entry: Maybe<AssetKits_Kit_BlockType>;

	const title = entry?.displayTitle;
	const image = entry?.image?.[0];
	const assets = entry?.assets?.[0];
</script>

<article class="rounded-24 bg-grey-100 bp:flex">
	{#if image}
		<Image
			{image}
			class="aspect-[4/3] w-full rounded-24 object-cover bp:hidden"
			sizes={SIZES_CARD}
		/>
	{/if}
	<div
		class="flex items-start justify-between space-x-20 px-32 py-20 bp:flex-grow bp:flex-col bp:space-x-0 bp:space-y-32 bp:py-32"
	>
		{#if title}
			<h3 class="text-500 font-medium">
				{title}
			</h3>
		{/if}
		{#if assets?.url}
			<ButtonPrimary button={{ asset: [assets], download: true }}>
				{t('press.download')}
			</ButtonPrimary>
		{/if}
	</div>
	{#if image}
		<Image
			{image}
			class="hidden min-h-240 w-320 rounded-24 object-cover bp:block"
			sizes={[{ width: '60rem' }]}
		/>
	{/if}
</article>
