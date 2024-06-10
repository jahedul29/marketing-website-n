<script lang="ts" context="module">
	import { readonly, type Readable } from 'svelte/store';

	export type DefaultFormState = 'idle' | 'submitting' | 'success' | 'error';

	type DefaultFormValues = Record<string, string | string[]>;

	type DefaultFormErrors = Record<string, string>;

	type DefaultFormData = {
		values?: DefaultFormValues;
		errors?: DefaultFormErrors;
		success?: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	};

	export interface DefaultFormContext {
		state: Readable<DefaultFormState>;
		data: Readable<DefaultFormData>;
		values: Readable<DefaultFormValues>;
		errors: Readable<DefaultFormErrors>;
	}

	const CONTEXT_KEY = 'default-form';

	export const getDefaultFormContext = () => getContext<DefaultFormContext>(CONTEXT_KEY);
</script>

<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction } from '$app/forms';
	import { getContext, setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import machine from 'svelte-fsm';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { enhancePost } from '$lib/actions/forms/enhancePost';
	import { requestSubmit as _requestSubmit } from '$lib/utils/form/requestSubmit';

	export let action: Maybe<string> = null;
	export let formKey: Maybe<string> = null;
	export let resetDelay = 10000;
	export let novalidate: Maybe<true> = null;
	let classes = '';
	export { classes as class };

	let formEl: HTMLFormElement;

	export const requestSubmit = () => {
		_requestSubmit(formEl);
	};

	const form = derived<typeof page, DefaultFormData>(page, (page) => {
		return formKey ? page.form?.[formKey] : page.form;
	});
	const values = derived(form, (form) => form?.values || {});
	const _errors = writable($form?.errors || {});
	const errors = readonly(_errors);
	const data = derived(form, (form) => form || {});
	form.subscribe((data) => {
		_errors.set(data?.errors || {});
	});

	const getInitialState = () => {
		if ($form?.success) {
			return 'success';
		}
		if ($form?.errors) {
			return 'error';
		}
		return 'idle';
	};

	const state = machine(getInitialState(), {
		idle: {
			submit: 'submitting'
		},
		submitting: {
			success: 'success',
			error: 'error'
		},
		success: {
			_enter({ args }) {
				if (!browser) {
					return;
				}
				const form: HTMLFormElement = args[0];
				form?.reset();
				this.reset.debounce(resetDelay);
			},
			reset: 'idle',
			input: 'idle',
			submit: 'submitting'
		},
		error: {
			_enter({ args }) {
				if (!browser) {
					return;
				}
				const form: HTMLFormElement = args[0];
				// Remove error keys that don't correspond to a form field name
				const elements = form?.elements || [];
				_errors.update((errors) => {
					return Object.fromEntries(
						Object.keys(errors)
							.filter((key) => !!elements[key])
							.map((key) => [key, errors[key]])
					);
				});
			},
			input(e: Event) {
				const input = e.target as HTMLInputElement;
				_errors.update((errors) => {
					delete errors[input.name];
					return errors;
				});
				if (Object.keys($errors).length > 0) {
					return 'error';
				}
				return 'idle';
			},
			submit(cancel: Parameters<SubmitFunction>[0]['cancel']) {
				cancel();
			}
		}
	});

	const onSubmit: SubmitFunction = ({ cancel }) => {
		state.submit(cancel);
		return async ({ result, formElement }) => {
			if (result.type === 'success') {
				state.success(formElement);
			}
			if (['error', 'failure'].includes(result.type)) {
				state.error(formElement);
			}
			applyAction(result);
		};
	};

	setContext<DefaultFormContext>(CONTEXT_KEY, {
		state,
		values,
		errors,
		data
	});

	const setup = (node: HTMLFormElement) => {
		// Remove browser validation only if js works
		if (novalidate) {
			node?.setAttribute('novalidate', '');
		}
	};
</script>

<form
	{action}
	{novalidate}
	method="POST"
	class={classes}
	on:input={state.input}
	on:change={state.input}
	use:setup
	use:enhancePost={onSubmit}
	bind:this={formEl}
>
	<slot values={$values} errors={$errors} data={$form} state={$state} />
</form>
