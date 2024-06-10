<script lang="ts">
	export let width: 'screen' | 'wide' | 'default' = 'default';
</script>

<section
	class="mx-auto"
	class:px-20={width !== 'screen'}
	class:max-w-max={width !== 'screen'}
	class:bp:px-120={width === 'default'}
>
	<slot />
</section>
