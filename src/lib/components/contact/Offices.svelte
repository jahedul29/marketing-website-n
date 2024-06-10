<script lang="ts">
	import type { Offices_Office_BlockType } from 'src/craft';
	import { t } from '$lib/translations/global';
	import CardOffice from '$com/cards/CardOffice.svelte';

	export let offices: Maybe<Offices_Office_BlockType>[] = [];
</script>

{#if offices?.length}
	<section class="mx-auto max-w-max space-y-32 px-20 bp:space-y-60 bp:px-120">
		<h2 class="text-700 font-medium leading-10">{t('contact.officesTitle')}</h2>
		<ul class="grid gap-32 bp:grid-cols-3">
			{#each offices as office}
				<li>
					<CardOffice entry={office} />
				</li>
			{/each}
		</ul>
	</section>
{/if}
