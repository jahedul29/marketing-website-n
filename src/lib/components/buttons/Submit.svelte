<script lang="ts">
	import type { DefaultFormState } from '$com/ui/DefaultForm.svelte';

	import Loading from '$com/svg/Loading.svelte';
	import Checkmark from '$com/svg/Checkmark.svelte';
	import { t } from '$lib/translations/global';

	export let theme: 'light' | 'light-outlined' | 'dark' = 'light';
	export let state: DefaultFormState = 'idle';

	const hoverClasses =
		theme === 'dark'
			? 'hover:bg-white hover:text-grey-900'
			: theme === 'light-outlined'
			? 'hover:bg-grey-900 hover:text-white'
			: 'hover:shadow-700 active:brightness-300 hover:active:shadow-none';
</script>

<button
	type="submit"
	class:relative={theme === 'dark' || theme === 'light-outlined'}
	class="whitespace-nowrap rounded-8 px-20 py-12 text-16 font-medium leading-10 transition-[background-color,color,box-shadow,filter] {theme ===
	'light-outlined'
		? ''
		: 'bg-grey-900 text-white'} {['submitting', 'success'].includes(state) ? '' : hoverClasses}"
>
	{#if theme === 'dark' || theme === 'light-outlined'}
		<span
			class="absolute left-0 top-0 h-full w-full rounded-8 ring-2 ring-inset"
			class:ring-white={theme === 'dark'}
			class:ring-grey-900={theme === 'light-outlined'}
		/>
	{/if}
	<span
		class="relative flex items-center justify-center transition-[width] duration-500 ease-out"
	>
		<span class="grid grid-stack">
			<span class:opacity-0={state !== 'submitting'} aria-hidden={state !== 'submitting'}>
				{t('forms.loading')}
			</span>
			<span class:opacity-0={state !== 'success'} aria-hidden={state !== 'success'}>
				{t('forms.success')}
			</span>
			<span
				class:opacity-0={['submitting', 'success'].includes(state)}
				aria-hidden={['submitting', 'success'].includes(state)}
			>
				<slot />
			</span>
		</span>
		<span
			class="grid transition-[width,opacity,padding] duration-500 ease-out grid-stack {[
				'submitting',
				'success'
			].includes(state)
				? 'w-24 pl-8'
				: 'w-0 opacity-0'}"
		>
			<span class:opacity-0={state !== 'submitting'}>
				<Loading />
			</span>
			<span class:opacity-0={state !== 'success'}>
				<Checkmark />
			</span>
		</span>
	</span>
</button>
