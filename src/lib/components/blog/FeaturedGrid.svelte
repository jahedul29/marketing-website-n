<script lang="ts">
	export let title: string;
</script>

<div class="mx-auto space-y-40 px-20 bp:max-w-max bp:space-y-48 bp:px-120">
	<h2 class="text-700 font-medium leading-10">
		{title}
	</h2>
	<div class="flex flex-col space-y-20 bp:flex-row bp:space-x-32 bp:space-y-0">
		<slot />
	</div>
</div>
