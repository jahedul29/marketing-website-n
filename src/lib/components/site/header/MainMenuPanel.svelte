<script lang="ts">
	import { portal } from '$lib/actions/portal';
	import { panelHeight } from '$com/site/header/SubMenuPopover.svelte';
</script>

<div
	use:portal
	class="pointer-events-none fixed left-0 top-0 z-50 hidden h-screen w-full bg-white-750-alpha backdrop-blur-700 transition-opacity duration-200 ease-linear bp:block"
	class:opacity-0={$panelHeight === 0}
/>
<div
	class="pointer-events-none fixed bottom-full left-0 -z-1 h-[200vh] w-full transition-[opacity,transform] duration-700 ease-out-expo"
	style="transform: translateY({$panelHeight}px);"
	class:opacity-0={$panelHeight === 0}
>
	<div class="absolute bottom-0 left-0 h-1/2 w-full rounded-b-20 shadow-500" />
	<div class="absolute left-0 top-0 h-full w-full rounded-b-20 bg-white" />
</div>
