<script lang="ts">
	import type { Articles_Category } from 'src/craft';
	import { t } from '$lib/translations/global';
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import { scrollAnimation } from '$lib/actions/scrollAnimation';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import DefaultSlider from '$com/ui/DefaultSlider.svelte';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';
	import ArrowRight from '$com/svg/ArrowRight.svelte';

	export let categories: Maybe<Articles_Category>[];
</script>

{#if categories?.length}
	<div>
		<DefaultSlider items={categories}>
			<svelte:fragment slot="heading">
				<h2
					class="text-700 font-medium leading-10"
					use:scrollAnimation={{ animClass: 'reveal' }}
				>
					{t('blog.exploreByCategories')}
				</h2>
			</svelte:fragment>
			<svelte:fragment slot="item" let:item>
				{@const href = autoUrl(item)}
				{@const image = item?.image?.[0]}
				{@const title = item?.title}
				{@const color = item?.color}
				<HtmlLink
					class="group flex flex-col space-y-12 rounded-20 p-8"
					{href}
					data-theme-color={color || ''}
				>
					{#if image}
						<div class="aspect-[16/9] w-full overflow-hidden rounded-12">
							<Image
								class="_image-scale h-full w-full object-cover"
								{image}
								sizes={SIZES_CARD}
							/>
						</div>
					{/if}
					<div class="text-black flex w-full items-center p-8">
						{#if title}
							<div class="text-300 font-medium leading-10">{title}</div>
						{/if}
						<div
							class="ml-auto w-16 flex-shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1/4"
						>
							<ArrowRight />
						</div>
					</div>
				</HtmlLink>
			</svelte:fragment>
		</DefaultSlider>
	</div>
{/if}
