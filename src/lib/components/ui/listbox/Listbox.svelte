<!--@docs
@include docs/ui-components/listbox.md
-->
<script context="module" lang="ts">
	import { getContext, onMount, setContext, tick, createEventDispatcher } from 'svelte';
	import { readonly, writable, type Readable } from 'svelte/store';

	type OptionElement = HTMLDivElement;

	type OptionValue = Maybe<unknown>;

	type ListboxElements = {
		label: Maybe<HTMLElement>;
		button: Maybe<HTMLButtonElement>;
		optionsCtn: Maybe<HTMLDivElement>;
		activeOption: Maybe<OptionElement>;
	};

	type ListboxCurrentValue = Maybe<OptionValue | OptionValue[]>;

	type ListboxElementsKeys = keyof ListboxElements;

	type ListboxOrientation = 'vertical' | 'horizontal';

	type ListboxSettings = {
		disabled: boolean;
		orientation: ListboxOrientation;
		multiple: boolean;
		name: Maybe<string>;
	};

	type OptionFocusStragegy =
		| 'first'
		| 'last'
		| 'prev'
		| 'next'
		| 'specific'
		| 'selected'
		| 'nothing';

	export interface ListboxApi {
		listboxId: string;
		searchQuery: Readable<string>;
		elements: Readable<ListboxElements>;
		settings: Readable<ListboxSettings>;
		value: Readable<ListboxCurrentValue>;
		activatedByPointer: Readable<boolean>;
		open: Readable<boolean>;
		computeOptionValue: (value: Maybe<unknown>) => OptionValue;
		isSelected: (value: unknown) => boolean;
		isFirstSelected: (id: string) => boolean;
		registerElement: (node: HTMLElement, key: ListboxElementsKeys) => void;
		openListbox: (options?: { focus?: OptionFocusStragegy }) => void;
		closeListbox: (options?: { focusButton: boolean }) => void;
		setActiveOption: (
			focus: OptionFocusStragegy,
			id?: string,
			activatedByPointer?: boolean
		) => void;
		select: (value: unknown) => void;
		search: (value: string) => void;
		clearSearch: () => void;
	}

	const CONTEXT_KEY = '__listbox__';

	const OPTION_SELECTOR = '[role="option"]';

	export const getListboxContext = () => getContext<ListboxApi>(CONTEXT_KEY);

	let id = 0;
	const getId = () => id++;
</script>

<script lang="ts">
	import { clickUseCapture } from '$lib/stores/window/clickUseCapture';
	import { isFocusable } from '$lib/utils/ui/isFocusable';
	import { isElementBefore } from '$lib/utils/dom/isElementBefore';
	import { isElementAfter } from '$lib/utils/dom/isElementAfter';
	import ListboxInputs from './ListboxInputs.svelte';

	type EventDetail = { value: unknown };

	interface $$Events {
		change: CustomEvent<EventDetail>;
	}

	let _open = false;
	export { _open as open };
	export let selected: Maybe<unknown> = null;
	export let disabled = false;
	export let orientation: ListboxOrientation = 'vertical';
	export let name: Maybe<string> = null;
	export let multiple = false;

	const dispatch = createEventDispatcher<{ change: EventDetail }>();

	const listboxId = `__listbox__${getId()}`;

	const open = writable<boolean>(_open);
	const settings = writable<ListboxSettings>({
		disabled,
		orientation,
		multiple,
		name
	});
	const searchQuery = writable<string>('');
	const elements = writable<ListboxElements>({
		label: null,
		button: null,
		optionsCtn: null,
		activeOption: null
	});
	const value = writable<ListboxCurrentValue>(selected);
	const activatedByPointer = writable<boolean>(false);

	const computeOptionValue: ListboxApi['computeOptionValue'] = (value) => {
		if (value == null) {
			return null;
		}
		return typeof value === 'object' ? JSON.stringify(value) : (value as OptionValue);
	};

	const getAllOptions = () => {
		return Array.from(
			$elements.optionsCtn?.querySelectorAll<OptionElement>(OPTION_SELECTOR) || []
		);
	};

	const isOptionDisabled = (option: OptionElement) => {
		return option?.getAttribute('aria-disabled') === 'true';
	};

	const isOptionSelected = (option: OptionElement) => {
		return option?.getAttribute('aria-selected') === 'true';
	};

	const registerElement: ListboxApi['registerElement'] = (node, key) => {
		elements.update((els) => {
			return {
				...els,
				[key]: node
			};
		});

		return {
			destroy() {
				elements.update((els) => {
					return {
						...els,
						[key]: null
					};
				});
			}
		};
	};

	const openListbox: ListboxApi['openListbox'] = ({ focus } = {}) => {
		if ($settings.disabled || $open) {
			return;
		}
		open.set(true);
		tick().then(() => {
			$elements.optionsCtn?.focus({ preventScroll: true });
			if (focus) {
				setActiveOption(focus);
			}
		});
	};

	const closeListbox: ListboxApi['closeListbox'] = ({ focusButton } = { focusButton: true }) => {
		if ($settings.disabled || !$open) {
			return;
		}
		open.set(false);
		elements.update((els) => {
			return {
				...els,
				activeOption: null
			};
		});
		if (focusButton) {
			tick().then(() => $elements.button?.focus({ preventScroll: true }));
		}
	};

	const setActiveOption: ListboxApi['setActiveOption'] = (focusStrategy, id, isPointer) => {
		if ($settings.disabled || !$open) {
			return;
		}

		const { activeOption } = $elements;
		const options = getAllOptions();

		let optionToActivate: Maybe<OptionElement> | undefined;

		if (focusStrategy === 'selected') {
			optionToActivate = options.find(
				(option) => !isOptionDisabled(option) && isOptionSelected(option)
			);
		}
		if (focusStrategy === 'specific') {
			optionToActivate = options.find((option) => option.id === id);
		}
		if (focusStrategy === 'first') {
			optionToActivate = options.find((option) => !isOptionDisabled(option));
		}
		if (focusStrategy === 'last') {
			optionToActivate = options
				.slice()
				.reverse()
				.find((option) => !isOptionDisabled(option));
		}
		if (focusStrategy === 'prev') {
			optionToActivate = options
				.slice()
				.reverse()
				.find((option) => {
					if (!activeOption) {
						return !isOptionDisabled(option);
					}
					return isElementBefore(option, activeOption) && !isOptionDisabled(option);
				});
		}
		if (focusStrategy === 'next') {
			optionToActivate = options.find((option) => {
				if (!activeOption) {
					return !isOptionDisabled(option);
				}
				return isElementAfter(option, activeOption) && !isOptionDisabled(option);
			});
		}
		if (!optionToActivate && focusStrategy !== 'nothing') {
			return;
		}
		elements.update((els) => {
			return {
				...els,
				activeOption: optionToActivate || null
			};
		});
		clearSearch();
		activatedByPointer.set(isPointer || false);
	};

	const isSelected: ListboxApi['isSelected'] = (valueToCheck) => {
		const computedValue = computeOptionValue(valueToCheck);
		if ($settings.multiple && Array.isArray($value)) {
			return $value.some((val) => computedValue === computeOptionValue(val));
		}
		return computedValue === computeOptionValue($value);
	};

	const isFirstSelected: ListboxApi['isFirstSelected'] = (optionId) => {
		const options = getAllOptions();
		const firstSelected = options.find(
			(option) => !isOptionDisabled(option) && isOptionSelected(option)
		);
		return optionId === firstSelected?.id;
	};

	const select: ListboxApi['select'] = async (selectedValue) => {
		// Return if value is null or undefined
		if (selectedValue == null) {
			return;
		}
		value.update((currentValue) => {
			let newValue: ListboxCurrentValue = selectedValue;
			if ($settings.multiple && Array.isArray(currentValue)) {
				// If option is already selected, unselect it
				const isAlreadySelected = currentValue.some(
					(val) => computeOptionValue(val) === computeOptionValue(selectedValue)
				);
				newValue = isAlreadySelected
					? currentValue.filter(
							(val) => computeOptionValue(val) !== computeOptionValue(selectedValue)
					  )
					: [...currentValue, selectedValue];
			}
			selected = newValue;
			return newValue;
		});
		await tick();
		dispatch('change', { value: selected });
	};

	const search: ListboxApi['search'] = (value) => {
		if ($settings.disabled || !$open) {
			return;
		}

		const { activeOption } = $elements;
		const options = getAllOptions();
		// Prioritize search for values at or following the active option by putting them first in the array
		const activeIndex = options.findIndex((option) => option.id === activeOption?.id);
		const wasAlreadySearching = $searchQuery !== '';
		// If a search was already ongoing, we begin the search at the active option, otherwise we begin at the one right after
		const offset = wasAlreadySearching ? 0 : 1;
		const reorderedOptions =
			activeIndex !== -1
				? options.slice(activeIndex + offset).concat(options.slice(0, activeIndex + offset))
				: options;

		searchQuery.update((query) => {
			return query + value;
		});
		const query = $searchQuery;
		const match = reorderedOptions.find((option) => {
			return (
				option.textContent?.trim().toLowerCase().startsWith(query) &&
				!isOptionDisabled(option)
			);
		});
		if (!match) {
			return;
		}
		setActiveOption('specific', match.id);
	};

	const clearSearch = () => {
		searchQuery.set('');
	};

	setContext<ListboxApi>(CONTEXT_KEY, {
		listboxId,
		open: readonly(open),
		searchQuery: readonly(searchQuery),
		settings: readonly(settings),
		elements: readonly(elements),
		value: readonly(value),
		activatedByPointer: readonly(activatedByPointer),
		isFirstSelected,
		isSelected,
		registerElement,
		openListbox,
		closeListbox,
		setActiveOption,
		select,
		search,
		clearSearch,
		computeOptionValue
	});

	onMount(() => {
		return clickUseCapture.subscribe((e) => {
			const { button, optionsCtn } = $elements;
			if (!$open) {
				return;
			}
			const target = e.target as HTMLElement;
			if (button?.contains(target) || optionsCtn?.contains(target)) {
				return;
			}
			closeListbox({ focusButton: !isFocusable(target) });
		});
	});

	// Update stores when props are updated from outside
	$: value.set(selected);
	$: settings.update((s) => {
		return {
			...s,
			disabled,
			orientation,
			multiple,
			name
		};
	});
</script>

{#if name}
	<ListboxInputs />
{/if}
<slot open={$open} disabled={$settings.disabled} />
