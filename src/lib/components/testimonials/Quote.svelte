<script lang="ts">
	import type { Quotes_Quote_BlockType } from 'src/craft';

	export let quote: Maybe<Quotes_Quote_BlockType>;

	const { quote: text, source, role } = quote || {};
</script>

<figure class="space-y-32">
	{#if text}
		<blockquote class="_prose">
			<p class="text-400">&ldquo;&nbsp;{text}&nbsp;&rdquo;</p>
		</blockquote>
	{/if}
	{#if source || role}
		<figcaption class="sr-only">
			{#if source}
				<span class="font-medium">&mdash; {source}</span>
			{/if}
			{#if role}
				<span class="text-black-750-alpha">{role}</span>
			{/if}
		</figcaption>
	{/if}
</figure>
