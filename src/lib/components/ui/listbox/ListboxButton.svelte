<script lang="ts">
	import { mounted } from '$lib/stores/mounted';
	import { Keys } from '$lib/utils/ui/keys';
	import { getListboxContext } from './Listbox.svelte';
	import { buttonClasses } from './ListboxOptions.svelte';

	let classes: Maybe<string> = null;
	export { classes as class };

	const {
		listboxId,
		registerElement,
		elements,
		settings,
		open,
		value,
		openListbox,
		closeListbox
	} = getListboxContext();

	buttonClasses.update((c) => {
		return {
			...c,
			[listboxId]: classes
		};
	});

	const id = `${listboxId}-button`;

	$: disabled = $settings.disabled;
	$: expanded = disabled ? null : $open;
	$: controls = $elements.optionsCtn?.id || null;
	$: labelledBy = $elements.label ? `${$elements.label.id} ${id}` : null;

	const onClick = (e: MouseEvent) => {
		if ($open) {
			closeListbox();
		} else {
			e.preventDefault();
			openListbox();
		}
	};

	const onKeydown = (e: KeyboardEvent) => {
		const key = e.key as Keys;

		if ([Keys.Space, Keys.Enter, Keys.ArrowDown].includes(key)) {
			e.preventDefault();
			openListbox({ focus: $value != null ? 'selected' : 'first' });
			return;
		}
		if (key === Keys.ArrowUp) {
			e.preventDefault();
			openListbox({ focus: $value != null ? 'selected' : 'last' });
			return;
		}
	};

	const onKeyup = (e: KeyboardEvent) => {
		const key = e.key as Keys;

		// Required for firefox, event.preventDefault() in onKeydown for
		// the Space key doesn't cancel the onKeyup, which in turn
		// triggers a *click*.
		if (key === Keys.Space) {
			e.preventDefault();
		}
	};
</script>

{#if $mounted}
	<button
		type="button"
		{id}
		class={classes}
		use:registerElement={'button'}
		aria-haspopup="true"
		aria-expanded={expanded}
		aria-controls={controls}
		aria-labelledby={labelledBy}
		{disabled}
		on:click={onClick}
		on:keydown={onKeydown}
		on:keyup={onKeyup}
	>
		<slot />
	</button>
{/if}
