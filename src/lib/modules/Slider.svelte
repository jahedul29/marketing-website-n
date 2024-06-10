<script lang="ts">
	import type { Buttons_Default_Entry, Modules_Slider_Entry } from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import DefaultSlider from '$com/ui/DefaultSlider.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';

	export let entry: Modules_Slider_Entry & { button?: Buttons_Default_Entry[] };

	const { surtitle, displayTitle, plainText, cardEntries } = entry || {};
	const button = entry?.button?.[0];
</script>

<ModuleBase width="screen">
	<DefaultSlider items={cardEntries} viewAllButton={button}>
		<svelte:fragment slot="heading">
			<ModuleHeading {surtitle} title={displayTitle} text={plainText} textAlign="left" />
		</svelte:fragment>
		<svelte:fragment slot="item" let:item>
			<ComponentSelector entries={[item]} />
		</svelte:fragment>
	</DefaultSlider>
</ModuleBase>
