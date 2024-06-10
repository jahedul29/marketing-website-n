# Forms

Sveltekit already comes with a robust system for handling form submissions. This starterkit has a
few useful additions to it. We also want to document what we consider to be best practices here. We
also recommend that you familiarize yourself with Sveltekit's
[form actions](https://kit.svelte.dev/docs/form-actions).

## A note on form validation

This starterkit does not provide any validation methods, so it is up to you to use what you like.

Server-side validation is essential for security reasons. When validation fails, you should return
an object with the form values and errors to display feedback to the users by using Sveltekit's
`fail` helper. The data will be made available in `+page.svelte` `form` prop or in `$page.form`.

By default, the browser takes care of the client-side validation. You can use built-in html
attributes to validate fields against different constraints
(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#additional_attributes).
Alternatively, you can use the `novalidate` attribute on the form and run your own validation logic.
Just be mindful that this will add extra javascript to ship to the client.

## Posting to a different route

If you don't provide an action on your form, the submission will be sent to the current page.
However, its frequent that we want to post to a different route (like with a newsletter form in the
footer).

If we use `enhance` or `enhancePost` (see below), the behavior will be just about the same as when
posting to the current route. However, if javascript is disabled, the browser will navigate to the
action url.

If the action is `/en/newsletter`, the browser will navigate to that url. To make sure our forms
work even without javascript, you should create a `+page.svelte` alongside your `+page.sever.ts`
file at the action route and display the same form on that page. It doesn't need to be fancy, but it
should show the user the same feedback on the submission as with javascript enabled.

## `$lib/actions/forms/enhancePost.ts`

The `enhancePost` action is a wrapper around Sveltekit's `enhance` action.

If the form is re-submitted before the last request could finish, `enhancePost` cancels that request
by making use of the `AbortController` passed into the submit callback.

It also uses `applyAction` instead of `update` in the returned callback, so that validation errors
are still returned if the form points to a differente route.

Moreover, if you only need to run some code on submit, you can ommit the return callback and
`enhancePost` will still use `applyAction` as the default.

It is otherwise identical to `enhance`.

## DefaultForm.svelte

We also provide `DefaultForm.svelte`, a `POST` form component with a good default behavior. It is
there for you to either use as is or copy and modify, depending on your use case. If your form is
really different, then you can just build your own component and use the actions provided (described
above).

### Behavior and features

#### State

The form can only be in one state at a time: `'idle' | 'submitting' | 'success' | 'error'`.

At first it is `idle`.

When a use submits the form, it goes into the `submitting` state. While in this state, no other
submission can occur. You can check for this state to display a loading indicator.

If the submission is successful, the form goes into the `success` state. The form will reset and
return to `idle` on its own after a configurable delay (see props below). If the user types while in
this state, the form returns to `idle`. If the user re-submits the form while in this state, the
form returns to `submitting` and a request is sent.

If the submission is not successful (because of validation or server errors), the form goes into the
`error` state. While in this state, the user cannot re-submit the form before clearing all the
errors. The errors are cleared as the user types into the invalid fields. When no errors remain, the
form will return to the `idle` state.

#### Values, errors and data

For this component to work properly, your server action should return the form `values` and `errors`
when encountering validation errors. The component will make them available in slot props and in
context.

It should also return a `success` property set to `true` if the submission was successful.

All the data returned from the action will also be available as `data`, in slot props and in
context.

#### Form key

If you have multiple forms with similar fields on the same page, `values` and `errors` will be
shared among all of them. This means that if you have multiple fields with the name 'email' and one
of the form as an email error, the error will appear on every form. To work around this, you can
scope the action data to a form key.

You can provide a string to the `formKey` prop and use the same string to wrap your server action
data. The component will automatically use the key to expose the right data.

`MyForm.svelte:`

```ts
...
<DefaultForm formKey="contact">
...
```

`+page.server.ts`:

```ts
...
if (errors) {
	return fail(400, {
		contact: {
			errors: {
				email: 'Invalid email'
			}
		}
	});
}
...
```

### Props

-   `action` (string): An optional form action. If none is provided, the action will be the current
    page url.
-   `formKey` (string): An optional form key to scope the form data to a particular form.
-   `resetDelay` (number): The delay in ms before resetting the form after a successful submission.
    Default: `10000`.
-   `novalidate` (boolean): Applies the `novalidate` attribute on the form, but only on mount so the
    form still has some validation if javascript fails.
-   `class` (string): Optional form classes.
-   readonly `requestSubmit` (() => void): Submits the form using the `requestSubmit` method.

### Slots

#### Default

The default form slot.

Slot props:

-   readonly `values`: The `values` property returned from the server action. If none, it is an
    empty object.
-   readonly `errors`: The `errors` property returned from the server action, If none, it is an
    empty object.
-   readonly `data`: All the data returned from the server action, including `values` and `errors`.
    If none, it is an empty object.
-   readonly `state`: The current form state, which can only be one of
    `'idle' | 'submitting' | 'success' | 'error'`.

### Context

Key: `form`.

Value: `DefaultFormContext`

```ts
type DefaultFormValues = Record<string, string | string[]>;

type DefaultFormErrors = Record<string, string>;

type DefaultFormData = {
	values?: DefaultFormValues;
	errors?: DefaultFormErrors;
	[key: string]: any;
};
interface DefaultFormContext {
	state: Readable<FormState>;
	data: Readable<DefaultFormData>;
	values: Readable<DefaultFormValues>;
	errors: Readable<DefaultFormErrors>;
}
```

### Example usage

```svelte
<DefaultForm
	class="mx-auto flex max-w-480 flex-col space-y-24 px-24"
	let:errors
	let:values
	let:state
>
	<h2>Default Form</h2>
	{#if state === 'success'}
		<h2 class="text-[green]">Success!</h2>
	{/if}
	{#if state === 'error'}
		<h2 class="text-[red]">Something is wrong</h2>
	{/if}
	<label class="flex flex-col">
		Name
		<input value={values.name || null} class="border-1" type="text" name="name" />
	</label>
	{#if errors.name}
		<small class="text-[red]">{errors.name}</small>
	{/if}
	<label class="flex flex-col">
		Email
		<input value={values.email || null} class="border-1" type="email" name="email" />
	</label>
	{#if errors.email}
		<small class="text-[red]">{errors.email}</small>
	{/if}
	<label class="flex flex-col">
		Message
		<textarea class="border-1" name="message">{values.message || ''}</textarea>
	</label>
	{#if errors.message}
		<small class="text-[red]">{errors.message}</small>
	{/if}
	<button type="submit">Submit</button>
</DefaultForm>
```

## External resources

These components use native web APIs. Here is some helpful documentation on these APIs and how you
can use them:

-   The form element: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form>
-   Input element attributes:
    <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#additional_attributes>
-   The FormData API: <https://developer.mozilla.org/en-US/docs/Web/API/FormData>
-   The native Request object: <https://developer.mozilla.org/en-US/docs/Web/API/Request>
-   Client-side validation: <https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation>
-   Constraint validation API:
    <https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation>
-   The Remix.run Form component (on which this component was based):
    <https://remix.run/docs/en/v1/api/remix#form>
