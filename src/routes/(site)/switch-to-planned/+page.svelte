<script lang="ts">
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import TextMedia from '$lib/modules/TextMedia.svelte';
	import Image from '$com/ui/Image.svelte';

	const logos = [
		{ url: '/img/switchToPlanned/logos/logo-1.png', alt: '', srcset: '' },
		{ url: '/img/switchToPlanned/logos/logo-2.png', alt: '', srcset: '' },
		{ url: '/img/switchToPlanned/logos/logo-3.png', alt: '', srcset: '' },
		{ url: '/img/switchToPlanned/logos/logo-4.png', alt: '', srcset: '' },
		{ url: '/img/switchToPlanned/logos/logo-5.png', alt: '', srcset: '' },
		{ url: '/img/switchToPlanned/logos/logo-6.png', alt: '', srcset: '' }
	];

	const statsRow1 = [
		{
			number: '175',
			description: 'countries'
		},
		{
			number: '24/7',
			description: 'support'
		}
	];
	const statsRow2 = [
		{
			number: '9.6',
			description: 'CSAT'
		},
		{
			number: '13%',
			description: 'in direct savings'
		},
		{
			number: '60%',
			description: 'in time savings'
		}
	];

	// const surtitle = entry?.surtitle;
	// const title = entry?.displayTitle;
	// const text = entry?.richText;
	// const button = entry?.button?.[0];
	// const media = entry?.media?.[0];
	// const reverse = entry?.reverse;
	// const highlight = entry?.highlight;
	// const highlightBackground = entry?.highlightBackground;

	const textMediaEntry = {
		displayTitle: 'You’re (re)building your T&E program from scratch',
		reverse: true,
		richText:
			'<p>Source events and travel into one tool to drive adoption and gain negotiating power.</p>',
		media: [
			{ url: '/img/switchToPlanned/events-travel.png', alt: '', srcset: '', kind: 'image' }
		]
	};

	const textMediaEntry1 = {
		displayTitle: 'You’re (re)building your T&E program from scratch',
		reverse: true,
		richText:
			'<p>Source events and travel into one tool to drive adoption and gain negotiating power.</p>',
		media: [
			{ url: '/img/switchToPlanned/events-travel.png', alt: '', srcset: '', kind: 'image' }
		]
	};

	const textMediaEntry2 = {
		displayTitle: 'You already have an OBT or an internal team',

		richText:
			'<p>Only use Planned for Events Sourcing. We’ll make sure stakeholders consistently book at the best price, within policies.</p>',
		media: [{ url: '/img/switchToPlanned/event.png', alt: '', srcset: '', kind: 'image' }]
	};

	const textMediaEntry3 = {
		displayTitle: 'You need a solution for small & simple',
		reverse: true,
		richText:
			'<p>Planned handles your events of all sizes, and helps you tie your SMM spend to travel to help you gain full control and visibility.</p>',
		media: [{ url: '/img/switchToPlanned/tour-plan.png', alt: '', srcset: '', kind: 'image' }]
	};

	export let dark = false;
</script>

<div>
	<DefaultRythm>
		<!-- SECTIONS HAVE TO BREAK DOWN INTO SEPARATE COMPONENT -->

		<!-- Top Heading Section  -->
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
						Give the best experience to planners and travelers, gain visibility on your
						entire program, and start saving at scale.
					</p>

					<div class="mt-32 flex space-x-16">
						<!-- Need to replace by primary Button  -->
						<a
							href="https://book.planned.com/meetings/david1616"
							rel="noopener noreferrer"
							target="_blank"
							class="_primary"
							><span
								class="filled black lg _primary-inner relative flex w-full items-center justify-center rounded-8 text-center font-medium leading-10 text-white"
								><span
									class="_primary-inner-bg absolute left-0 top-0 h-full w-full rounded-8"
								/> <span class="relative">Book a demo</span></span
							><!--<ButtonPrimaryInner>--></a
						><!--<HtmlLink>--><!--<CraftButton>--><!--<ButtonPrimary>-->
					</div>
				</div>
			</div>
		</section>

		<!-- Logo Section  -->
		<div class="_intro-reveal-sm pointer-events-auto w-full">
			<HeaderLogos {logos} center={true} is_hero={true} />
		</div>

		<!--  Component 2 -->
		<ModuleBase width="wide">
			<div
				class="rounded-20 bg-[#EBF5FF] bg-[url('/img/switchToPlanned/globe.png')] bg-[length:544px_477px] bg-left-bottom bg-no-repeat p-44"
			>
				<div class="mb-44 mt-40 flex flex-col items-center justify-center">
					<div class="mx-auto text-center md:w-1/2 lg:w-2/5">
						<h2 class="text-32 font-medium bp:text-48">
							Future-proof your program with confidence
						</h2>
					</div>
				</div>
				<div class="my-32 ml-auto md:w-3/5 lg:w-1/2">
					<div
						class="grid w-fit grid-cols-2 divide-y-1 divide-blue-500 pt-20 bp:w-4/5 bp:grid-cols-2 bp:divide-x-1 bp:divide-y-0 bp:pt-40"
					>
						{#each statsRow1 as { number, description }}
							<div class="flex flex-col items-center py-20 lg:py-0">
								<h2 class=" text-60 font-medium">
									{number}
								</h2>
								<p
									class="text-12 sm:text-18 w-3/4 pb-12 pt-12 text-center lg:text-20"
								>
									{description}
								</p>
							</div>
						{/each}
					</div>
					<div
						class="grid w-fit grid-cols-3 divide-y-1 divide-blue-500 pt-20 bp:w-4/5 bp:grid-cols-3 bp:divide-x-1 bp:divide-y-0 bp:pt-40"
					>
						{#each statsRow2 as { number, description }}
							<div class="flex flex-col items-center py-20 lg:py-0">
								<h2 class=" text-60 font-medium">
									{number}
								</h2>
								<p
									class="text-12 sm:text-18 w-3/4 pb-12 pt-12 text-center lg:text-20"
								>
									{description}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</ModuleBase>

		<!--  Component 3 -->
		<ModuleBase width="wide">
			<div class="mb-44 mt-40 flex flex-col items-center justify-center">
				<div class="mx-auto text-center">
					<h2 class="text-32 font-medium bp:text-40">
						How we support our enterprise clients
					</h2>
				</div>
			</div>
			<div class="my-32">
				<div class="flex justify-center bp:gap-80">
					<div
						class="flex flex-col items-start justify-center bp:w-500 bp:justify-self-end"
					>
						<Image
							image={{ url: '/img/switchToPlanned/client.png', alt: '', srcset: '' }}
						/>
					</div>
					<div>
						<blockquote>
							<p class=" bp:w-500">
								“ Planned provides us with a curated portfolio of best-in-class
								vendors and venues that helps simplify our search and saves loads of
								time securing exactly what is needed to make our events amazing. ”
							</p>
						</blockquote>
						<p class="mt-20 text-20">— Crystal Kuepfer</p>
						<p class="text-20 text-[#898989]">
							Project Manager of Events at World Vision Canada
						</p>
						<p>
							<!-- Need to replace by primary Button  -->
							<a
								href="https://book.planned.com/meetings/david1616"
								rel="noopener noreferrer"
								target="_blank"
								class="_primary"
								><span
									class="filled black lg _primary-inner relative flex w-full items-center justify-center rounded-8 text-center font-medium leading-10 text-white"
									><span
										class="_primary-inner-bg absolute left-0 top-0 h-full w-full rounded-8"
									/> <span class="relative">Download case study</span></span
								></a
							>
						</p>
					</div>
				</div>
			</div>
		</ModuleBase>

		<TextMedia entry={textMediaEntry1} />
		<TextMedia entry={textMediaEntry2} />
		<TextMedia entry={textMediaEntry3} />
	</DefaultRythm>
</div>
