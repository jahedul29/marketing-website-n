<script lang="ts">
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import Image from '$com/ui/Image.svelte';

	export let sideCta: SideCta;

	const title = sideCta?.displayTitle;
	const text = sideCta?.text;
	const image = sideCta?.image?.[0];
	const button = sideCta?.button?.[0];
</script>

<article class="rounded-24 bg-white">
	{#if image}
		<Image
			{image}
			class="aspect-[4/3] w-full rounded-24 object-cover"
			sizes={[{ mq: '(min-width: 800px)', width: '60rem' }]}
		/>
	{/if}
	<div class="flex flex-col items-center space-y-24 p-24 text-center">
		<div class="flex flex-col items-center space-y-8">
			{#if title}
				<h2 class="text-20 font-medium leading-20 bp:text-26">{title}</h2>
			{/if}
			{#if text}
				<p class="text-200 font-medium leading-30">{text}</p>
			{/if}
		</div>
		{#if button}
			<ButtonPrimary {button} />
		{/if}
	</div>
</article>
