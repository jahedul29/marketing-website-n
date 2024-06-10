<script lang="ts">
	export let title: Maybe<string> | undefined;
</script>

<div class="w-full space-y-20 pb-40 pt-16 bp:space-y-32">
	{#if title}
		<h2 class="text-300 _submenu-item whitespace-nowrap font-medium leading-10">{title}</h2>
	{/if}
	<div>
		<slot />
	</div>
</div>
