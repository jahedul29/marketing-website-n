<script lang="ts">
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	const button = {
		__typename: 'buttons_default_Entry',
		label: 'Book a demo',
		externalUrl: 'https://meetings.hubspot.com/david1616',
		siteEntry: [],
		siteCategory: [],
		modalEmbed: []
	};
</script>

<section class="relative mx-auto max-w-hd pb-60 text-center bp:pb-0 bp:text-left">
	<div class="relative grid grid-stack bp:absolute bp:right-0 bp:top-0 bp:w-1/2">
		<div class="_image-mask _intro-fade-in">
			<img srcset="/img/switchToPlanned/top-header-globe.png" alt="" />
		</div>
	</div>

	<div class="relative px-20 pt-32 bp:px-120 bp:py-112">
		<div
			class="_intro-reveal flex flex-col items-center bp:max-w-600 bp:items-start"
			style="--section: 2;"
		>
			<h1 class="text-900 font-medium leading-10">
				Modernize your Travel & Events program with Planned
			</h1>
			<p class="text-400 mt-12 leading-30 text-black-750-alpha bp:mt-32">
				Give the best experience to planners and travelers, gain visibility on your entire
				program, and start saving at scale.
			</p>

			<div class="mt-32 flex space-x-16">
				<ButtonPrimary {button} color={'black'} size="lg" />
			</div>
		</div>
	</div>
</section>
