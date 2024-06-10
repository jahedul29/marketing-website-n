<script lang="ts">
	import type { Modules_Text_Entry } from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import RichText from '$com/ui/RichText.svelte';

	export let entry: Modules_Text_Entry;
	const { displayTitle, richText } = entry || {};
</script>

<ModuleBase>
	<div class="grid gap-60 bp:grid-cols-[auto,70rem] bp:gap-80">
		{#if displayTitle}
			<h2 class="text-40 font-medium leading-20 bp:text-60">{displayTitle}</h2>
		{/if}
		<RichText text={richText} type="block" />
	</div>
</ModuleBase>
