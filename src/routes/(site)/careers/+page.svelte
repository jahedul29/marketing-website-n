<script lang="ts">
	import type { PageData } from './$types';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderCareers from '$com/headers/HeaderCareers.svelte';
	import ComponentSelector from '$lib/ComponentSelector.svelte';
	import Benefits from '$com/careers/Benefits.svelte';
	import JobsList from '$com/careers/JobsList.svelte';
	import TeamStories from '$com/careers/TeamStories.svelte';
	import { parallax } from '$lib/actions/parallax';

	export let data: PageData;

	const { entry, jobs } = data || {};
	const {
		surtitle,
		displayTitle,
		modules,
		benefitsTitle,
		benefits,
		jobsTitle,
		teamStoriesTitle,
		teamStories
	} = entry || {};
</script>

<div class="relative">
	<div class="absolute -top-72 left-0 h-screen w-full bp:-top-64">
		<div
			class="absolute right-0 top-48 w-1/2 overflow-hidden bp:w-1/3"
			use:parallax={{ speed: 0.1 }}
		>
			<img src="/img/careers-squiggle-right.svg" alt="" class="w-full translate-x-1/3" />
		</div>
		<div class="absolute left-0 top-3/4 w-1/2 bp:w-1/3" use:parallax={{ speed: 0.2 }}>
			<img src="/img/careers-squiggle-left.svg" alt="" class="w-full -translate-x-1/2" />
		</div>
	</div>
	<div class="relative">
		<DefaultRythm>
			<HeaderCareers {surtitle} {displayTitle} {jobs} />
			<ComponentSelector entries={modules} />
			<Benefits title={benefitsTitle} {benefits} />
			<JobsList title={jobsTitle} {jobs} />
			<TeamStories title={teamStoriesTitle} {teamStories} />
		</DefaultRythm>
	</div>
</div>
