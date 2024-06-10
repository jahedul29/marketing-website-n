<script context="module" lang="ts">
	export type ButtonPrimaryColor = 'blue' | 'black' | 'white';
	export type ButtonPrimaryType = 'filled' | 'outlined';
	export type ButtonPrimarySize = 'xxl' | 'xl' | 'lg' | 'sm';
</script>

<script lang="ts">
	export let color: ButtonPrimaryColor = 'black';
	export let type: ButtonPrimaryType = 'filled';
	export let size: ButtonPrimarySize = 'lg';
</script>

<span
	class="{type} {color} {size} _primary-inner relative flex w-full items-center justify-center rounded-8 text-center font-medium leading-10 text-white"
>
	<span class="_primary-inner-bg absolute left-0 top-0 h-full w-full rounded-8" />
	<span class="relative">
		<slot />
	</span>
</span>
