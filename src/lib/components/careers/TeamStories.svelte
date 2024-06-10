<script lang="ts">
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import { t } from '$lib/translations/global';

	export let title: Maybe<string> = null;
	export let teamStories: CraftEntryWithSvelteComponent[] = [];
</script>

{#if teamStories?.length}
	<section class="mx-auto max-w-max space-y-32 px-20 bp:space-y-60 bp:px-120">
		{#if title}
			<h2 class="text-800 font-medium leading-10">
				{title}
			</h2>
		{/if}
		<ul class="grid gap-60 bp:grid-cols-4 bp:gap-x-32">
			<ComponentSelector entries={teamStories} let:entry let:component>
				<li>
					<svelte:component this={component} {entry} />
				</li>
			</ComponentSelector>
		</ul>
		<div class="flex items-center justify-center">
			<ButtonPrimary button={{ siteEntry: [{ uri: 'blog' }] }}>
				{t('careers.showMoreStories')}
			</ButtonPrimary>
		</div>
	</section>
{/if}
