<script context="module" lang="ts">
	let id = 0;
	const getId = () => id++;
</script>

<script lang="ts">
	import { mounted } from '$lib/stores/mounted';

	import { onMount } from 'svelte';
	import { getListboxContext } from './Listbox.svelte';

	let classes: Maybe<string> = null;
	export { classes as class };
	let optionValue: unknown;
	export { optionValue as value };
	export let disabled = false;

	let optionEl: HTMLDivElement;

	const {
		listboxId,
		open,
		value,
		settings,
		elements,
		activatedByPointer,
		isSelected,
		isFirstSelected,
		closeListbox,
		select,
		setActiveOption,
		computeOptionValue
	} = getListboxContext();

	const optionId = `${listboxId}-option-${getId()}`;

	const onClick = (e: MouseEvent) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		select(optionValue);
		if (!$settings.multiple) {
			closeListbox();
		}
	};

	const onFocus = () => {
		if (disabled) {
			setActiveOption('nothing');
			return;
		}
		setActiveOption('specific', optionId);
	};

	const onMove = () => {
		if (disabled || active) {
			return;
		}
		setActiveOption('specific', optionId, true);
	};

	const onBlur = () => {
		if (disabled || !active) {
			return;
		}
		setActiveOption('nothing');
	};

	$: active = $elements.activeOption?.id === optionId;
	$: selected = $value != null && isSelected(optionValue);
	$: if ($open && active && !$activatedByPointer) {
		optionEl?.scrollIntoView({ block: 'nearest' });
		optionEl?.focus();
	}

	onMount(() => {
		if (!$open || !selected) {
			return;
		}
		if ($settings.multiple && !isFirstSelected(optionId)) {
			return;
		}
		setActiveOption('specific', optionId);
	});
</script>

{#if optionValue != null}
	{#if $mounted}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class={classes}
			id={optionId}
			role="option"
			tabindex={disabled ? null : -1}
			aria-disabled={disabled || null}
			aria-selected={!!selected || null}
			on:click={onClick}
			on:focus={onFocus}
			on:pointermove={onMove}
			on:mousemove={onMove}
			on:blur={onBlur}
			on:pointerleave={onBlur}
			on:mouseleave={onBlur}
			bind:this={optionEl}
		>
			<slot {active} {selected} {disabled} />
		</div>
	{:else}
		<option value={computeOptionValue(optionValue)} {selected}>
			<slot {active} {selected} {disabled} />
		</option>
	{/if}
{/if}
