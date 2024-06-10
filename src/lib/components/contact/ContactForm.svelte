<script lang="ts">
	import { t } from '$lib/translations/global';
	import DefaultForm from '$com/ui/DefaultForm.svelte';
	import Field from '$com/forms/Field.svelte';
	import RichText from '$com/ui/RichText.svelte';
	import Submit from '$com/buttons/Submit.svelte';
	import HoneyPot from '$com/ui/HoneyPot.svelte';

	export let text: Maybe<string> = null;
</script>

<DefaultForm class="space-y-32" let:errors let:values let:state novalidate>
	<div class="grid gap-x-12 gap-y-32 bp:grid-cols-2">
		<Field
			label={t('contact.form.firstNameLabel')}
			name="firstname"
			value={values?.firstname}
			error={errors?.firstname}
			required
		/>
		<Field
			label={t('contact.form.lastNameLabel')}
			name="lastname"
			value={values?.lastname}
			error={errors?.lastname}
			required
		/>
	</div>
	<Field
		label={t('contact.form.businessEmailLabel')}
		name="email"
		type="email"
		value={values?.email}
		error={errors?.email}
		required
	/>
	<Field
		label={t('contact.form.companyLabel')}
		name="company"
		error={errors?.company}
		value={values?.company}
		required
	/>
	<Field
		label={t('contact.form.phoneLabel')}
		name="phone"
		type="tel"
		error={errors?.phone}
		value={values?.phone}
	/>
	<Field
		label={t('contact.form.messageLabel')}
		name="message"
		type="textarea"
		rows={15}
		value={values?.message}
		error={errors?.message}
		required
	/>
	<HoneyPot />
	<div class="flex flex-col items-center space-y-24">
		{#if text}
			<RichText {text} let:text type="inline">
				<small class="block text-center text-14 leading-30 text-black-750-alpha">
					{@html text}
				</small>
			</RichText>
		{/if}
		<Submit {state}>
			{t('contact.form.submitLabel')}
		</Submit>
	</div>
</DefaultForm>
