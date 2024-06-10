<script lang="ts">
	import { t } from '$lib/translations/global';
	import DefaultForm from '$com/ui/DefaultForm.svelte';
	import Field from './Field.svelte';
	import Submit from '$com/buttons/Submit.svelte';
	import HoneyPot from '$com/ui/HoneyPot.svelte';

	export let hubspotFormId: string;
	export let grey = false;
</script>

<DefaultForm
	action="/api/lead-generation?formId={hubspotFormId}"
	class="w-full bp:max-w-500"
	let:errors
	let:values
	let:state
	novalidate
>
	<div class="flex flex-col space-y-8 bp:flex-row bp:items-start bp:space-x-8 bp:space-y-0">
		<div class="bp:w-full">
			<Field
				label={t('forms.emailLabel')}
				type="email"
				name="email"
				value={values.email}
				error={errors.email}
				errorId="lead-gen-error"
				theme={grey ? 'grey' : 'light'}
				required
				hideLabel
			/>
		</div>
		<input type="hidden" name="formId" value={hubspotFormId} />
		<HoneyPot />
		<Submit {state}>
			{t('forms.notifyMe')}
		</Submit>
	</div>
</DefaultForm>
