<script lang="ts">
	import type { Buttons_Default_Entry, Modules_Embed_Entry } from 'src/craft';
	import { forceExecuteScript } from '$lib/actions/forceExecuteScript';
	import { mounted } from '$lib/stores/mounted';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	export let entry: Modules_Embed_Entry;

	const { surtitle, displayTitle, plainText, embedCode } = entry || {};
	const button = entry?.button?.[0] as Buttons_Default_Entry;
</script>

<ModuleBase>
	<ModuleHeading {surtitle} title={displayTitle} text={plainText} />
	{#if embedCode && $mounted}
		<div class="mx-auto mt-24 w-full bp:max-w-1024" use:forceExecuteScript>
			{@html embedCode}
		</div>
	{/if}
	{#if button}
		<div class="mt-24 flex justify-center">
			<ButtonPrimary {button} />
		</div>
	{/if}
</ModuleBase>
