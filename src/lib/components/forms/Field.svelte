<script lang="ts">
	import { t } from '$lib/translations/global';
	import { elasticOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	const themeClasses = {
		dark: 'bg-white-200-alpha text-white focus:border-white border-transparent placeholder-white-750-alpha',
		light: 'bg-white border-grey-500 focus:border-grey-900 placeholder-black-500-alpha',
		grey: 'bg-grey-100 border-transparent focus:border-grey-900 placeholder-black-500-alpha',
		white: 'bg-white border-transparent focus:border-grey-900 placeholder-black-500-alpha'
	};

	export let label: string;
	export let name: string;
	export let placeholder: Maybe<string> = null;
	export let type = 'text';
	export let value: Maybe<string | string[]> = null;
	export let error: Maybe<string> = null;
	export let theme: keyof typeof themeClasses = 'light';
	export let hideLabel = false;
	export let errorId = `${name}-error`;
	export let required = false;

	const inputClass = `w-full rounded-8 p-[1rem] text-16 leading-10 border-1 outline-0 aria-[invalid=true]:border-red-500 ${themeClasses[theme]}`;
</script>

<div class="flex flex-col items-start space-y-4">
	<label class="w-full">
		<div class={hideLabel ? 'sr-only' : 'text-300 mb-8 text-black-750-alpha'}>
			{label}
			{#if !required}
				({t('forms.optional')})
			{:else}
				<span class="text-red-500" aria-hidden="true">*</span>
			{/if}
		</div>
		{#if type === 'textarea'}
			<textarea
				{...$$restProps}
				placeholder={hideLabel && !placeholder ? label : placeholder}
				{name}
				required={required || null}
				class={inputClass}
				aria-describedby={errorId}
				aria-invalid={error ? 'true' : null}>{value || ''}</textarea
			>
		{:else}
			<input
				{...$$restProps}
				{type}
				placeholder={hideLabel && !placeholder ? label : placeholder}
				{name}
				value={value || null}
				class={inputClass}
				aria-describedby={errorId}
				aria-invalid={error ? 'true' : null}
				required={required || null}
			/>
		{/if}
	</label>
	{#if error}
		<small id={errorId} class="text-14 text-red-500" in:fly={{ x: -60, easing: elasticOut }}>
			{error}
		</small>
	{/if}
</div>
