<script lang="ts">
	import { page } from '$app/stores';
	import LeadGenerationForm from '$com/forms/LeadGenerationForm.svelte';

	const hubspotFormId = $page.url.searchParams.get('formId') || '';
</script>

<div class="mx-auto mt-60 flex max-w-700 justify-center rounded-20 bg-white p-20 bp:mt-120">
	<LeadGenerationForm {hubspotFormId} />
</div>
