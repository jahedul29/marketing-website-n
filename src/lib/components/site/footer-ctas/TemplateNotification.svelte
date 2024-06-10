<script lang="ts">
	import type { FooterCtas_TemplateNotifications_Entry } from 'src/craft';
	import CtaBase from '$com/site/footer-ctas/CtaBase.svelte';
	import LeadGenerationForm from '$com/forms/LeadGenerationForm.svelte';

	export let cta: FooterCtas_TemplateNotifications_Entry;
	export let featured = false;

	const { surtitle, plainTitle, hubspotFormId } = cta || {};
</script>

<CtaBase>
	{#if surtitle}
		<p
			class="text-100 mb-20 flex flex-shrink-0 rounded-full bg-wheat-500-alpha px-12 py-4 font-medium leading-20 text-wheat-700"
		>
			{surtitle}
		</p>
	{/if}
	{#if plainTitle}
		<h3 class="text-24 mb-48 max-w-720 font-medium {featured ? 'bp:text-48' : 'bp:text-40'}">
			{plainTitle}
		</h3>
	{/if}
	{#if hubspotFormId}
		<div class="flex w-full max-w-700 justify-center">
			<LeadGenerationForm {hubspotFormId} />
		</div>
	{/if}
</CtaBase>
