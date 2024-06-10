<script lang="ts">
	import HeaderLogo from '$com/site/HeaderLogo.svelte';
	import NavDesktop from '$com/site/header/NavDesktop.svelte';
	import NavMobile from '$com/site/header/NavMobile.svelte';
	import { page } from '$app/stores';

	$: entry = $page.data.entry;
</script>

{#if !entry || !entry.simplified}
	<header
		class="sticky top-0 z-[100] w-full bg-white-900-alpha p-20 backdrop-blur-700 transition-colors duration-200 ease-linear bp:px-120 bp:py-16"
	>
		<nav id="navigation" class="mx-auto flex max-w-hd items-center justify-between">
			<HeaderLogo />
			<NavMobile />
			<NavDesktop />
		</nav>
	</header>
{/if}
