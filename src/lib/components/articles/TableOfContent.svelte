<script lang="ts">
	import ArrowRight from '$com/svg/ArrowRight.svelte';
	import { t } from '$lib/translations/global';
	import { textToId } from '$lib/utils/string/textToId';

	export let contentBlocks: ArticlesDefault['contentBlocks'];

	const anchors = contentBlocks
		?.filter((block) => !!block?.anchorLabel)
		.map((block) => {
			const anchorLabel = block?.anchorLabel || '';
			return {
				label: anchorLabel,
				href: textToId(anchorLabel)
			};
		});
</script>

{#if anchors?.length}
	<div class="space-y-8 rounded-20 bg-grey-100 p-24 bp:space-y-24 bp:p-32">
		<h3 class="text-400 font-medium leading-30">
			{t('articles.tableOfContentTitle')}
		</h3>
		<ul class="space-y-12">
			{#each anchors as { href, label }}
				{#if href}
					<li class="flex">
						<a
							href="#{href}"
							class="text-300 group flex items-center space-x-12 leading-20"
						>
							<span class="w-16 text-grey-750">
								<ArrowRight />
							</span>
							<span class="relative transition-colors group-hover:text-blue-500">
								{label}
								<span
									class="absolute bottom-0 flex h-[1px] w-full bg-grey-500 transition-opacity group-hover:opacity-0"
								/>
							</span>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/if}
