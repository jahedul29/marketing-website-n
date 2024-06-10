<script lang="ts">
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';
	import RichText from '$com/ui/RichText.svelte';

	export let entry: PagesComparison;

	const title = entry?.displayTitle;
	const text = entry?.simpleRichText;
	const buttons = entry?.buttons;
	const logosTitle = entry?.logosTitle;
	const logos = entry?.logos;
</script>

<section class="space-y-80 px-20 pt-60 bp:space-y-120 bp:pt-120">
	<div
		class="_intro-reveal-sm mx-auto flex flex-col items-center space-y-20 text-center bp:max-w-1000 bp:space-y-40"
	>
		{#if title}
			<h1 class="text-900 mx-auto mt-8 max-w-700 font-medium leading-10">
				{title}
			</h1>
		{/if}
		{#if text}
			<RichText {text} let:text>
				<p class="text-300 mx-auto max-w-700 text-black-750-alpha">{@html text}</p>
			</RichText>
		{/if}
		{#if buttons?.length}
			<div class="grid max-w-440 grid-cols-2 gap-20">
				{#each buttons as button, i}
					<ButtonPrimary {button} type="filled" color={i === 0 ? 'black' : 'blue'} />
				{/each}
			</div>
		{/if}
	</div>
	<HeaderLogos {logosTitle} {logos} center />
</section>
