<script lang="ts">
	export let featured = false;
</script>

<div
	role="cell"
	class="flex items-center justify-center border-x-4 px-8 text-center text-14 leading-10 bp:border-x-8 bp:px-20 bp:text-20 {featured
		? 'border-wheat-500 bg-wheat-200-alpha'
		: 'border-grey-100 bg-grey-100'}"
>
	<div class="relative">
		<slot />
	</div>
</div>
