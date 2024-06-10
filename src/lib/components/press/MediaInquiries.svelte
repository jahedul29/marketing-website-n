<script lang="ts">
	import { t } from '$lib/translations/global';
	import RichText from '$com/ui/RichText.svelte';

	export let text: Maybe<string> = null;
</script>

{#if text}
	<section class="mx-auto max-w-max px-20 bp:px-120">
		<div class="grid gap-32 border-t-1 border-black-100-alpha pt-40 bp:grid-cols-2">
			<h2 class="text-700 font-medium leading-10">{t('press.mediaInquiriesTitle')}</h2>
			<RichText {text} />
		</div>
	</section>
{/if}
