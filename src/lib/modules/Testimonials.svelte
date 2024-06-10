<script lang="ts">
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import QuotesSlideShow from '$com/testimonials/QuotesSlideShow.svelte';
	import type { Modules_Testimonials_Entry } from 'src/craft';

	export let entry: Modules_Testimonials_Entry;

	const { displayTitle, quotes } = entry || {};
</script>

<ModuleBase>
	<div class="space-y-32 bp:mx-auto bp:max-w-1120 bp:space-y-60">
		<ModuleHeading title={displayTitle} />
		<QuotesSlideShow {quotes} />
	</div>
</ModuleBase>
