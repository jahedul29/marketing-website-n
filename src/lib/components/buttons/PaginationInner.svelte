<script lang="ts">
	export let disabled = false;
</script>

<div
	class="flex h-32 w-32 items-center justify-center rounded-full bg-grey-900 text-white transition-colors {disabled
		? 'opacity-20'
		: 'hover:bg-blue-500'}"
>
	<div class="w-1/2">
		<slot />
	</div>
</div>
