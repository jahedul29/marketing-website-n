<script>
	import { onMount } from 'svelte';
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '$lib/components/ui/tabs';
	import Airplane from '$com/svg/Airplane.svelte';
	import Bed from '$com/svg/Bed.svelte';
	import Clock from '$com/svg/Clock.svelte';
	import Uptrend from '$com/svg/Uptrend.svelte';

	let tabs = [
		{
			label: 'Source faster',
			text: 'From event brief to contract sent in 7 days, with white glove service',
			icon: Clock,
			active: true,
			tabImage: 'https://cms.planned.com/uploads/home/source-faster-v2.mp4'
		},
		{
			label: 'Negotiate room blocks',
			text: 'Source, negotiate and manage guests from the same platform',
			icon: Bed,
			tabImage: 'https://cms.planned.com/uploads/home/negotiate-room-blocks-v2.mp4'
		},
		{
			label: 'Manage group travel',
			text: 'Let guests chose from the largest global inventory',
			icon: Airplane,
			tabImage: 'https://cms.planned.com/uploads/home/manage-group-travel-v2.mp4'
		},
		{
			label: 'Gain visibility',
			text: 'Get access to your sourcing data for your entire T&E spend',
			icon: Uptrend,
			tabImage: 'https://cms.planned.com/uploads/home/gain-visibility-v2.mp4'
		}
	];
	let tabs_lazy = [];

	onMount( async () => {
		tabs_lazy = await tabs.slice(1,4);
	})
</script>

<section class="mx-auto max-w-max px-20">
	<div class="bp:px-20">
		<div
			class="pb-40 mx-auto rounded-[20px] border-0 bg-[#EBF5FF] px-20 pt-40 shadow-lg sm:pt-60 bp:pt-60"
		>
			<h3
				class="mx-auto text-800 bp:px-60 bp:text-center px-0"
			>
				Drive adoption, generate savings
			</h3>

			<p
				class="mx-auto px-0 pb-12 pt-20 text-300 bp:px-60 bp:w-3/5 bp:pb-20 bp:text-center"
			>
				Planned’s end-to-end platform makes planners and travelers’ lives easier. Avoid
				leakage with an end-to-end platform that everyone loves.
			</p>

			<TabGroup id="tabs">
				<TabList
					class="space-x-2 space-y-2 pt-10 grid divide-grey-500/80 grid-cols-1 bp:px-100 sm:pt-60 bp:grid-cols-4 lg:divide-x-1"
				>
					{#each tabs as tab}
						<Tab class="px-0 py-20 bp:px-20 bp:py-20" let:selected>
							<div class="flex flex-row items-center gap-8">
								<svelte:component
									this={tab.icon}
									color={selected ? '#0C74DB' : '#7B8589'}
								/>
								<p
									class="text-20 font-medium"
									class:text-[#41494D]={!selected}
									class:text-blue-500={selected}
								>
									{tab.label}
								</p>
							</div>
							<p class="pt-12 text-left text-16 text-[#0A1013]">
								{tab.text}
							</p>
						</Tab>
					{/each}
				</TabList>
				<TabPanels class="border-30 grid overflow-hidden mt-20 bp:px-100 border-solid grid-stack">
					<TabPanel class="py-10 px-10">
						<video
							class="h-full w-full object-cover tab-content"
							src={tabs[0].tabImage}
							autoplay
							loop
							muted
						>
						</video>
					</TabPanel>
					{#each tabs_lazy as tab, i}
						<TabPanel class="py-10 px-10">
							<video
								class="h-full w-full object-cover tab-content"
								src={tab.tabImage}
								autoplay
								loop
								muted
							>
							</video>
						</TabPanel>
					{/each}
				</TabPanels>
			</TabGroup>
		</div>
	</div>
</section>
