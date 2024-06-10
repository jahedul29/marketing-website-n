<script lang="ts">
	import { html } from '$lib/utils/string/html';

	type TextType = 'inline' | 'block' | 'block-sm' | 'block-embed';

	export let text: Maybe<string> = null;
	export let type: TextType = 'inline';

	const computedText = !text ? '' : html(text).removeEmptyTags().toString();
</script>

{#if computedText}
	<div class="_prose _{type}">
		<slot text={computedText}>{@html computedText}</slot>
	</div>
{/if}
