<script lang="ts">
	import { t } from '$lib/translations/global';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	export let surtitle: Maybe<string> = null;
	export let displayTitle: Maybe<string> = null;
	export let jobs: LeverJob[] = [];
</script>

<section class="relative grid px-20 pt-60 grid-stack bp:pt-120">
	<div class="_intro-reveal-sm mx-auto flex flex-col items-center text-center bp:max-w-1000">
		{#if surtitle}
			<h1 class="text-200 font-medium leading-10 text-blue-500">
				{surtitle}
			</h1>
		{/if}
		{#if displayTitle}
			<h2 class="text-900 mt-8 font-medium leading-10">{displayTitle}</h2>
		{/if}
		{#if jobs?.length}
			<div class="mt-32 bp:mt-48">
				<ButtonPrimary button={{ hash: '#jobs' }}>
					{t('careers.seeJobs')}
				</ButtonPrimary>
			</div>
		{/if}
	</div>
</section>
