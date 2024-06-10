<script lang="ts">
	import { t } from '$lib/translations/global';
	import { autoUrl } from '$lib/utils/url/autoUrl';
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';

	export let entry: PagesDefault;

	const fields = entry?.featureFields?.[0];

	const { displayTitle, text } = fields || {};
	const icon = fields?.icon?.[0];
	const href = autoUrl(entry);
</script>

{#if displayTitle && text}
	<li class="flex flex-1">
		<HtmlLink
			{href}
			class="group flex h-full w-full flex-col items-center rounded-24 bg-lightblue-300 px-20 py-40 transition-colors hover:bg-lightblue-500"
		>
			<div class="mb-52 h-64 w-64">
				{#if icon}
					<Image class="h-full w-full" image={icon} sizes={[{ width: '10rem' }]} />
				{/if}
			</div>
			{#if displayTitle || text}
				<div class="mb-auto space-y-8 text-center">
					{#if displayTitle}
						<div class="text-500 font-medium leading-10 text-grey-900">{displayTitle}</div>
					{/if}
					{#if text}
						<div class="text-300 leading-20 text-black-750-alpha">{text}</div>
					{/if}
				</div>
			{/if}
			<div class="text-200 mt-32 rounded-8 bg-blue-500 px-16 py-12 font-medium leading-10 text-white">
				{t('pages.seeFeature')}
			</div>
		</HtmlLink>
	</li>
{/if}