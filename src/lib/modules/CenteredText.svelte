<script lang="ts">
	import type { Buttons_Default_Entry, Modules_CenteredText_Entry } from 'src/craft';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import RichText from '$com/ui/RichText.svelte';

	export let entry: Modules_CenteredText_Entry & { button?: Buttons_Default_Entry[] };
	const { surtitle, displayTitle, simpleRichText } = entry || {};
	const button = entry?.button?.[0];
</script>

<ModuleBase>
	<ModuleHeading {surtitle} title={displayTitle} />
	<div class="mt-24 space-y-24">
		{#if simpleRichText}
			<div class="text-300 mx-auto text-center leading-30 text-black-750-alpha bp:max-w-700">
				<RichText text={simpleRichText} />
			</div>
		{/if}
		{#if button}
			<div class="flex justify-center">
				<ButtonPrimary {button} />
			</div>
		{/if}
	</div>
</ModuleBase>
