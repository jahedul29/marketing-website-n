<script lang="ts">
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import TextMedia from '$lib/modules/TextMedia.svelte';
	import Drawers from '$lib/modules/Drawers.svelte';
	import Grid from '$lib/modules/Grid.svelte';
	import CardPlanned from '$lib/components/cards/CardPlanned.svelte';
	import CardBusinessModel from '$lib/components/cards/CardBusinessModel.svelte';
	import {
		logos,
		faqsData,
		gridData,
		statsRow1,
		statsRow2,
		textMediaEntry1,
		textMediaEntry2,
		textMediaEntry3,
		testimonialData
	} from './data.constants';
	import HeaderSwitchToPlan from '$com/headers/HeaderSwitchToPlan.svelte';
	import CardRoadmap from '$com/cards/CardRoadmap.svelte';
	import CardQuote from '$com/cards/CardQuote.svelte';
	import TestimonialsWithBtn from '$lib/modules/TestimonialsWithBtn.svelte';
</script>

<DefaultRythm>
	<HeaderSwitchToPlan {logos} />

	<!--  Component 2 -->
	<ModuleBase width="wide">
		<div
			class=" rounded-12 bg-[#EBF5FF] bg-[url('/img/switchToPlanned/globe.png')] bg-[length:544px_477px] bg-left-bottom bg-no-repeat p-16 bp:p-52"
		>
			<div class="mx-auto my-20 text-center bp:my-40 md:w-1/2 lg:max-w-600">
				<h2 class="text-700 font-medium leading-[56px]">
					Future-proof your program with confidence
				</h2>
			</div>

			<div class="my-32 ml-auto md:w-3/5 lg:w-1/2">
				<div
					class=" grid w-full grid-cols-1 divide-y-1 divide-blue-500/80 pt-20 bp:w-4/5 bp:grid-cols-2 bp:divide-x-1 bp:divide-y-0 bp:pt-40"
				>
					{#each statsRow1 as { number, description }}
						<div class="flex flex-col items-center py-20 lg:py-0">
							<h2 class="text-700 font-medium">
								{number}
							</h2>
							<p class="text-12 sm:text-18 w-3/4 pb-12 pt-12 text-center lg:text-20">
								{description}
							</p>
						</div>
					{/each}
				</div>
				<hr class="h-px bg-blue-500/80 bp:hidden" />
				<div
					class="border grid w-full grid-cols-1 divide-y-1 divide-blue-500/80 pt-20 bp:w-4/5 bp:grid-cols-3 bp:divide-x-1 bp:divide-y-0 bp:pt-40"
				>
					{#each statsRow2 as { number, description }}
						<div class="flex flex-col items-center py-20 lg:py-0">
							<h2 class=" text-700 font-medium">
								{number}
							</h2>
							<p class="text-12 sm:text-18 w-3/4 pb-12 pt-12 text-center lg:text-20">
								{description}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</ModuleBase>

	<ModuleBase>
		<CardRoadmap />
	</ModuleBase>

	<!--  Component 3 -->
	<TestimonialsWithBtn entry={testimonialData} />

	<TextMedia entry={textMediaEntry1} />
	<TextMedia entry={textMediaEntry2} />
	<TextMedia entry={textMediaEntry3} />

	<ModuleBase>
		<div
			class="mx-auto mt-80 flex max-w-max flex-col items-center justify-center gap-32 bp:flex-row bp:items-start bp:gap-40"
		>
			<CardPlanned />
			<CardPlanned />
		</div>
	</ModuleBase>

	<ModuleBase>
		<CardBusinessModel />
	</ModuleBase>

	<Grid leftAlign entry={gridData} />

	<ModuleBase>
		<div class="rounded-20 bg-[#EBF5FF] p-12 bp:p-36">
			<div class="grid grid-cols-1 gap-20 bp:grid-cols-2">
				<div class="grid grid-rows-2 gap-24">
					<CardQuote />
					<CardQuote />
				</div>
				<div class="m-auto">
					<CardQuote titleSize="700" bgColor="transparent" />
				</div>
			</div>
		</div>
	</ModuleBase>

	<Drawers entry={faqsData} />
</DefaultRythm>
