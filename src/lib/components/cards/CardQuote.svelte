<script lang="ts">
	import TitleLines from '$com/svg/TitleLines.svelte';

	export let bgColor: string = 'white';
	export let titleSize: string = '600';
</script>

<div class={`p-44 bg-${bgColor} min-h-340 rounded-16`}>
	<h2 class={`text-${titleSize}  leading-20`}>
		“[Competitor] is like our duct-taped minivan, and Planned is our shiny new Tesla.<TitleLines
		/>
	</h2>
	<p class="text-300 mt-20">
		Procurement manager, US-based technology company on their process before using Planned
	</p>
</div>
