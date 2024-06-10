<script lang="ts">
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import ArrowExternal from '$com/svg/ArrowExternal.svelte';

	export let title: Maybe<string> = null;
	export let jobs: LeverJob[] = [];

	const jobsQty = jobs?.length || 0;

	const jobGroups = jobs?.reduce<{ [key: string]: LeverJob[] }>((groups, job) => {
		const category = job.categories.team;
		const group = groups[category];
		groups[category] = [...(group || []), job];
		return groups;
	}, {});
</script>

<section id="jobs" class="scroll-mt-120 px-20">
	<div
		class="mx-auto max-w-max space-y-60 rounded-24 bg-grey-900 px-20 pb-60 pt-40 text-white bp:space-y-120 bp:p-80"
	>
		{#if title}
			<h2 class="text-800 font-medium leading-10">
				{title}<sup class="text-500 align-super text-grey-500">({jobsQty})</sup>
			</h2>
		{/if}
		{#if jobsQty > 0}
			<ul class="space-y-60">
				{#each Object.entries(jobGroups) as [group, jobs]}
					<li
						class="grid gap-20 border-t-2 border-white pt-20 bp:grid-cols-2 bp:gap-32 bp:pb-120 bp:pt-40"
					>
						<h3 class="text-700 font-medium leading-10">{group}</h3>
						<ul class="space-y-16 bp:space-y-32">
							{#each jobs as job}
								{@const href = job.hostedUrl}
								<li>
									<HtmlLink
										{href}
										class="flex items-center justify-between space-x-20 rounded-20 bg-white p-12 bp:px-24 bp:py-20"
									>
										<div class="flex flex-col items-start space-y-4">
											<div
												class="text-400 font-medium leading-20 text-grey-900"
											>
												{job.text}
											</div>
											<div class="text-300 leading-20 text-black-500-alpha">
												<span>{job.categories.commitment}</span>
												<span>&middot;</span>
												<span>{job.categories.location}</span>
											</div>
										</div>
										<div
											class="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-grey-900 bp:h-40 bp:w-40"
										>
											<div class="h-1/2 w-1/2 text-white">
												<ArrowExternal />
											</div>
										</div>
									</HtmlLink>
									<!--  -->
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
