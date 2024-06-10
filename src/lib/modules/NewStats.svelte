<script lang="ts">
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import CoinsHand from '$com/svg/CoinsHand.svelte';
	const stats = [
		{
			number: '2.5x',
			description: 'Source 2.5 times faster than traditional TMCs'
		},
		{
			number: '12%',
			description: 'Save 12% on your entire T&E budget'
		},
		{
			number: '9.6',
			description: '9.6 users out of ten highly recommend our service'
		}
	];
</script>

<ModuleBase width="wide">
	<div class="border-t-1 border-grey-250 px-20">
		<div class="mt-40 flex flex-col items-center justify-center md:mt-100">
			<CoinsHand />
			<div class="mx-auto pt-12 text-center lg:w-2/5">
				<h2 class="text-32 font-medium bp:text-48">
					World-class service that generates savings
				</h2>
			</div>
			<div
				class="grid w-full grid-cols-1 divide-y-1 divide-grey-500/80 pt-20 bp:w-4/5 bp:grid-cols-3 bp:divide-x-1 bp:divide-y-0 bp:pt-40"
			>
				{#each stats as { number, description }}
					<div class="flex flex-col items-center py-20 lg:py-0">
						<h2
							class="rounded-12 bg-blue-500/10 p-12 text-60 font-medium text-blue-500"
						>
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
