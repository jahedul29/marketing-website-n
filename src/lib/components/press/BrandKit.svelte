<script lang="ts">
	import type { AssetKits_Kit_BlockType } from 'src/craft';
	import { t } from '$lib/translations/global';
	import CardAssetKit from '$com/cards/CardAssetKit.svelte';

	export let assetKits: Maybe<AssetKits_Kit_BlockType>[] = [];
</script>

{#if assetKits?.length}
	<section class="mx-auto max-w-max px-20 bp:px-120">
		<div class="grid gap-32 border-t-1 border-black-100-alpha pt-40 bp:grid-cols-2">
			<h2 class="text-700 font-medium leading-10">{t('press.brandKitTitle')}</h2>
			<ul class="space-y-32">
				{#each assetKits as assetKit}
					<li>
						<CardAssetKit entry={assetKit} />
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}
