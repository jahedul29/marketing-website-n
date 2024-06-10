<script lang="ts">
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import Image from '$com/ui/Image.svelte';

	export let entry: ArticleCta;

	const image = entry?.image?.[0];
	const button = entry?.button?.[0];
	const { displayTitle, text } = entry || {};
</script>

{#if entry}
	<aside class="flex flex-col rounded-20 bg-lightblue-300 bp:sticky bp:top-100">
		{#if image}
			<Image
				{image}
				class="h-240 w-full rounded-20 object-cover"
				sizes={[{ width: '60rem' }]}
			/>
		{/if}
		<div class="p-24 text-center">
			{#if displayTitle}
				<h2 class="text-400 font-medium leading-20">{displayTitle}</h2>
			{/if}
			{#if text}
				<p class="text-200 mt-16 font-medium">{text}</p>
			{/if}
			{#if button}
				<div class="mt-24">
					<ButtonPrimary {button} />
				</div>
			{/if}
		</div>
	</aside>
{/if}
