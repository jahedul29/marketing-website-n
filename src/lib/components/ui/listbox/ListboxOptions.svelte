<script context="module" lang="ts">
	type ButtonClassesStore = {
		[id: string]: Maybe<string>;
	};

	export const buttonClasses = writable<ButtonClassesStore>({});
</script>

<script lang="ts">
	import { mounted } from '$lib/stores/mounted';
	import { Keys } from '$lib/utils/ui/keys';
	import { writable } from 'svelte/store';
	import { getListboxContext } from './Listbox.svelte';

	let classes: Maybe<string> = null;
	export { classes as class };

	const {
		settings,
		searchQuery,
		open,
		elements,
		listboxId,
		registerElement,
		closeListbox,
		setActiveOption,
		search,
		clearSearch
	} = getListboxContext();

	const id = `${listboxId}-options`;

	let searchDebounce: Maybe<ReturnType<typeof setTimeout>> = null;

	const onKeydown = (e: KeyboardEvent) => {
		if (searchDebounce) {
			clearTimeout(searchDebounce);
		}

		const key = e.key as Keys;

		if (key === Keys.Space && $searchQuery) {
			search(key);
			return;
		}

		if ([Keys.Space, Keys.Enter].includes(key)) {
			e.preventDefault();
			e.stopPropagation();
			$elements.activeOption?.click();
			if (!$settings.multiple) {
				closeListbox();
			}
		}

		const nextKey = $settings.orientation === 'vertical' ? Keys.ArrowDown : Keys.ArrowRight;
		if (key === nextKey) {
			e.preventDefault();
			e.stopPropagation();
			setActiveOption('next');
		}

		const previousKey = $settings.orientation === 'vertical' ? Keys.ArrowUp : Keys.ArrowLeft;
		if (key === previousKey) {
			e.preventDefault();
			e.stopPropagation();
			setActiveOption('prev');
		}

		if ([Keys.Home, Keys.PageUp].includes(key)) {
			e.preventDefault();
			e.stopPropagation();
			setActiveOption('first');
		}

		if ([Keys.End, Keys.PageDown].includes(key)) {
			e.preventDefault();
			e.stopPropagation();
			setActiveOption('last');
		}

		if (key === Keys.Escape) {
			e.preventDefault();
			e.stopPropagation();
			closeListbox();
			return;
		}

		if (key === Keys.Tab) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (key.length === 1) {
			search(key);
			searchDebounce = setTimeout(clearSearch, 350);
		}
	};
</script>

{#if $open}
	<div
		{id}
		class={classes}
		tabindex="0"
		role="listbox"
		aria-orientation={$settings.orientation}
		aria-multiselectable={$settings.multiple || null}
		aria-labelledby={$elements.label?.id || $elements.button?.id || null}
		aria-activedescendant={$elements.activeOption?.id || null}
		use:registerElement={'optionsCtn'}
		on:keydown={onKeydown}
	>
		<slot />
	</div>
{:else if !$mounted}
	<select
		class={$buttonClasses[listboxId]}
		name={$settings.name}
		id={listboxId}
		multiple={$settings.multiple}
	>
		<slot />
	</select>
{/if}
