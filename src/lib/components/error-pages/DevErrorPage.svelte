<script lang="ts">
	import { page } from '$app/stores';

	const { status, error } = $page;
</script>

<section class="p-[7.2rem]">
	<div
		class="max-w-full space-y-[2.4rem] overflow-x-auto rounded-[1.6rem] bg-[black] p-[1.6rem] text-[2rem] text-[white]"
	>
		<h1 class="text-[4rem] font-bold">{status}</h1>
		{#if error}
			<pre>{JSON.stringify(error, null, 4)}</pre>
		{/if}
	</div>
</section>
