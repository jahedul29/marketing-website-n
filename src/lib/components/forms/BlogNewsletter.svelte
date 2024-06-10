<script lang="ts">
	import { t } from '$lib/translations/global';
	import Field from '$com/forms/Field.svelte';
	import Submit from '$com/buttons/Submit.svelte';
	import DefaultForm from '$com/ui/DefaultForm.svelte';
	import HoneyPot from '$com/ui/HoneyPot.svelte';

	const action = '/api/newsletter?blog';
</script>

<DefaultForm class="flex flex-col space-y-12" {action} let:state let:errors let:values novalidate>
	<Field
		label="Email address"
		type="email"
		name="email"
		value={values.email}
		error={errors.email}
		errorId="blog-newsletter-error"
		required
		hideLabel
		theme="white"
	/>
	<HoneyPot />
	<Submit theme="light-outlined" {state}>
		{t('forms.subscribe')}
	</Submit>
</DefaultForm>
