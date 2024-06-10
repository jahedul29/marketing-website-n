<script lang="ts">
	import { parallax } from '$lib/actions/parallax';
</script>

<div class="hidden bp:block h-full w-full absolute -z-1">
    <img
        class="h-auto w-full object-cover"
        src="/img/header-graphic.svg"
        alt=""
        use:parallax={{ speed: -0.1 }}
    />
</div>