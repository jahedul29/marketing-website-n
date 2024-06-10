<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import Field from '$com/forms/Field.svelte';
	import Submit from '$com/buttons/Submit.svelte';
	import DefaultForm from '$com/ui/DefaultForm.svelte';
	import HoneyPot from '$com/ui/HoneyPot.svelte';

	const { newsletter } = $page.data;
	const text = newsletter?.newsletterText;

	const action = '/api/newsletter?footer';
</script>

<div class="space-y-40 bp:space-y-32">
	{#if text}
		<p class="text-300 leading-40 text-white opacity-70">{text}</p>
	{/if}
	<DefaultForm
		class="space-y-16 bp:flex bp:items-start bp:space-x-8 bp:space-y-0"
		{action}
		let:state
		let:values
		let:errors
		novalidate
	>
		<div class="bp:w-full">
			<Field
				label={t('forms.emailLabel')}
				type="email"
				name="email"
				value={values.email}
				error={errors.email}
				required
				theme="dark"
				hideLabel
			/>
		</div>
		<HoneyPot />
		<div class="flex flex-col">
			<Submit theme="dark" {state}>
				{t('forms.subscribe')}
			</Submit>
		</div>
	</DefaultForm>
</div>
