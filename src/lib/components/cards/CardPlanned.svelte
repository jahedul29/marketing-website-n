<script lang="ts">
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	const button = {
		__typename: 'buttons_default_Entry',
		label: 'Button',
		externalUrl: 'https://meetings.hubspot.com/david1616',
		siteEntry: [],
		siteCategory: [],
		modalEmbed: []
	};
</script>

<div
	class="dark:bg-gray-800 dark:border-gray-700 max-w-[550px] cursor-pointer rounded-12 bg-white shadow-lg transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-4 hover:shadow-600"
>
	<a href="#">
		<img class="rounded-t-lg" src="/img/switchToPlanned/plan-event.png" alt="" />
	</a>
	<div class="p-5 pb-52">
		<p class="text-24 max-w-720 text-center font-medium bp:text-40">Planned vs TMCs</p>
		<div class="mt-20 flex justify-center">
			<ButtonPrimary {button} color={'black'} size="lg" />
		</div>
	</div>
</div>
