# Listbox

A generic and flexible listbox (custom select) component, based on
https://headlessui.dev/vue/listbox. The component reproduces a native `<select>` behavior while
being way more flexible for styles and animations.

It fully supports keyboard navigation and automatically manages accessiblity. It is also
progressively enhanced, in that if javascript fails to load, a native `<select>` element will be
rendered. Multi-selection is supported, and the component can be used as a form element without
issue.

## Listbox.svelte

The main component that wraps all the others.

Props:

-   `open` (`boolean`): Wether the listbox is open not. Default: `false`.
-   `selected` (`T`): The currently selected value (or array of values, if `multiple` is enabled).
    You can provide an initial value to be selected, as well as keep track of the selection by
    binding the prop (`bind:selected`). Default: `null`.
-   `disabled` (`boolean`): Wether the listbox is disabled or not. Default: `false`.
-   `orientation` (`'vertical' | 'horizontal'`): If you style the `ListboxOptions` to appear
    horizontally, use this prop to enable navigating with the left and right arrow keys instead of
    up and down, an to update the `aria-orientation` attribute for assistive technologies. Default:
    `'vertical'`.
-   `name` (`string`): The form element name attribute, if you need to use the listbox in a form.
    Default: `null`.
-   `multiple` (`boolean`): Use this prop to enable multiple selections. If true, the `selected`
    value will be an array instead of a single value.

Slot props:

-   readonly `open` (`boolean`): Wether the listbox is open or not.
-   readonly `disabled` (`boolean`): Wether the listbox is disabled or not.

Events:

-   `change` (`CustomEvent<{value: unkown}>`): Fired when a value is selected. The `details`
    property is an object containing a `value` property representing the selected value.

## ListboxLabel.svelte

A text element to give the listbox a better description for assistive technologies.

Props:

-   `as` (`string`): The element name to use as the label. Default: `'label'`.
-   `class` (`string`): Optional classes.

## ListboxButton.svelte

The button to toggle open the listbox.

Props:

-   `class` (`string`): Optional classes. In order for the styles to remain somewhat consistent,
    these classes will also be used for the `<select>` element rendered when javascript fails.

## ListboxOptions.svelte

The options container that is toggled open by the listbox button.

Props:

-   `class` (`string`): Optional classes.

## ListboxOption.svelte

The component to use to render a listbox option (similar to the native `<option>` element).

Props:

-   `value` (`T`): The value of the option.
-   `class` (`string`): Optional classes.
-   `disabled` (`boolean`): Wether the option is disabled or not.

Slot props:

-   readonly `active` (`boolean`): Wether the option is active or not. The option is active when it
    is hovered by the cursor or focused by the keyboard navigation.
-   readonly `selected` (`boolean`): Wether the option is currently selected or not.
-   readonly `disabled` (`boolean`): Wether the option is disabled or not.

## ListboxOptionGroup.svelte

The component to group options together (similar to the native `<optgroup>` element).

Props:

-   `label` (`string`): The label of the option group. REQUIRED.
-   `class` (`string`): Optional classes.

## Using in a form

To use the listbox in a form and access the value from the submission, simply provide a `name` prop.
The component will generate a hidden input (or several, if multi-selection is enabled) with the
currently selected value. You will then be able to retrieve the value in the form data.

If the selected value type is an object or an array, the input value will be the JSON stringified
value.

## Example usage

```svelte
<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions
	} from '$lib/components/ui/listbox';

	let people = [
		'Durward Reynolds',
		'Kenton Towne',
		'Therese Wunsch',
		'Benedict Kessler',
		'Katelyn Rohan'
	];

	let selected;
</script>

<form>
	<Listbox bind:selected name="person">
		<ListboxLabel>People:</ListboxLabel>
		<ListboxButton class="bg-main text-main-invert rounded-20 p-20">
			{#if selected}
				{selected}
			{:else}
				Select a person
			{/if}
		</ListboxButton>
		<ListboxOptions class="bg-main-invert mt-20 overflow-y-auto border-2 p-20">
			{#each people as person}
				<ListboxOption value={person} let:selected let:disabled let:active>
					<p
						class:bg-shade-400={active}
						class:bg-main={selected}
						class:text-main-invert={selected}
						class:opacity-50={disabled}
					>
						{person}
					</p>
				</ListboxOption>
			{/each}
		</ListboxOptions>
	</Listbox>
</form>
```
