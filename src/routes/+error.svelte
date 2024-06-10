<script lang="ts">
	//#if dev
	import DevErrorPage from '$com/error-pages/DevErrorPage.svelte';
	///if
	import ProdErrorPage from '$com/error-pages/ProdErrorPage.svelte';
</script>

<!--#if dev-->
<DevErrorPage />
<!--/if-->
<ProdErrorPage />
