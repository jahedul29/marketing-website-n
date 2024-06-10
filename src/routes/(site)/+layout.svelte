<script lang="ts">
	import { page } from '$app/stores';
	import Banner from '$com/site/Banner.svelte';
	import Header from '$lib/components/site/Header.svelte';
	import Footer from '$lib/components/site/Footer.svelte';
	import FooterCtas from '$com/site/FooterCtas.svelte';
	import BlurPageTransition from '$com/ui/BlurPageTransition.svelte';
	import '$lib/css/main.css';
</script>

<div class:bg-grey-100={$page.data.pageOptions?.greyBg}>
	<Banner />
	<Header />
	<BlurPageTransition>
		<main id="content">
			<slot />
		</main>
		<FooterCtas />
		<Footer />
	</BlurPageTransition>
</div>
