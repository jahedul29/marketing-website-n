<script lang="ts">
	export let surtitle: Maybe<string> = null;
	export let displayTitle: Maybe<string> = null;
	export let plainText: Maybe<string> = null;
</script>

<section class="px-20 pt-60 bp:pt-120">
	<div class="_intro-reveal-sm mx-auto text-center bp:max-w-1000">
		{#if surtitle}
			<h1 class="text-200 font-medium leading-10 text-blue-500">
				{surtitle}
			</h1>
		{/if}
		{#if displayTitle}
			<h2 class="text-900 mx-auto mt-8 max-w-700 font-medium leading-10">{displayTitle}</h2>
		{/if}
		{#if plainText}
			<p class="text-300 mx-auto mt-32 max-w-700 text-black-750-alpha">{plainText}</p>
		{/if}
	</div>
	<slot />
</section>
