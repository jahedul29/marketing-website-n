<script lang="ts">
	import { updated } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import Head from '$lib/components/site/Head.svelte';
	import SrNav from '$lib/components/site/SrNav.svelte';
	import '$lib/css/main.css';

	beforeNavigate(({ willUnload, to }) => {
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<Head />
<SrNav />
<slot />
