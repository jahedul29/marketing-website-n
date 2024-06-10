<script lang="ts">
	import Next from '$com/svg/Next.svelte';
	import Prev from '$com/svg/Prev.svelte';
	import { PaginationNav } from '$com/ui/pagination';
</script>

<PaginationNav
	class="flex items-center justify-center space-x-12"
	classLinkCurrent="bg-grey-900 text-white cursor-default"
	classLinkEnabled="bg-grey-100 transition-colors hover:bg-grey-500"
	classLink="flex items-center justify-center text-20 rounded-full w-40 h-40"
	classStep="rounded-full w-40 h-40 border-2 border-black flex items-center transition-colors justify-center"
	classStepEnabled="transition-colors hover:bg-grey-900 hover:text-white"
	classStepDisabled="opacity-30 cursor-default"
>
	<span slot="prev" class="flex w-20">
		<Prev />
	</span>
	<span slot="next" class="flex w-20">
		<Next />
	</span>
</PaginationNav>
