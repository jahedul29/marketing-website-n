<script lang="ts">
	import ContactFormCta from '$com/contact/ContactFormCta.svelte';
	import ContactForm from '$com/contact/ContactForm.svelte';

	export let sideCtas: SideCta[] = [];
	export let text: Maybe<string> = null;
</script>

<section class="px-20 bp:px-120">
	<div class="mx-auto grid max-w-1120 items-start gap-x-48 gap-y-60 bp:grid-cols-3">
		<div class="rounded-20 bg-white p-24 bp:col-span-2">
			<ContactForm {text} />
		</div>
		{#if sideCtas?.length}
			<aside class="space-y-32">
				{#each sideCtas as sideCta}
					<ContactFormCta {sideCta} />
				{/each}
			</aside>
		{/if}
	</div>
</section>
