<script lang="ts">
	import CardWhatWeDo from '$com/cards/CardWhatWeDo.svelte';
	import BannerSlider from '$com/ui/BannerSlider.svelte';

	const cardEntries = [
		{
			id: '15318',
			url: '/online-booking-tool',
			sectionHandle: 'customerStories',
			__typename: 'customerStories_default_Entry',
			thumbnail: [
				{
					url: '/img/home/transient-card.png',
					width: 6000,
					height: 4000,
					alt: null,
					srcset: '/img/home/transient-card.png',
					kind: 'image',
					hasFocalPoint: false,
					focalPoint: [0.5, 0.5]
				}
			],
			logo: [],
			displayTitle: 'Transient & <br />Group Travel'
		},
		{
			id: '15318',
			url: '/events-venues-vendors',
			sectionHandle: 'customerStories',
			__typename: 'customerStories_default_Entry',
			thumbnail: [
				{
					url: '/img/home/hotel-booking-card.png',
					width: 6000,
					height: 4000,
					alt: null,
					srcset: '/img/home/hotel-booking-card.png',
					kind: 'image',
					hasFocalPoint: false,
					focalPoint: [0.5, 0.5]
				}
			],
			logo: [],
			displayTitle: 'Hotel, Venue & <br />Vendor Booking'
		},
		{
			id: '15318',
			url: '/events-small-simple',
			sectionHandle: 'customerStories',
			__typename: 'customerStories_default_Entry',
			thumbnail: [
				{
					url: '/img/home/meeting-card.png',
					width: 6000,
					height: 4000,
					alt: null,
					srcset: '/img/home/meeting-card.png',
					kind: 'image',
					hasFocalPoint: false,
					focalPoint: [0.5, 0.5]
				}
			],
			logo: [],
			displayTitle: 'Small & Simple <br /> Meetings'
		},
		{
			id: '15318',
			url: '/workplace',
			sectionHandle: 'customerStories',
			__typename: 'customerStories_default_Entry',
			thumbnail: [
				{
					url: '/img/home/workplace-card.png',
					width: 6000,
					height: 4000,
					alt: null,
					srcset: '/img/home/workplace-card.png',
					kind: 'image',
					hasFocalPoint: false,
					focalPoint: [0.5, 0.5]
				}
			],
			logo: [],
			displayTitle: 'Workplace <br />Events'
		},
		{
			id: '15318',
			url: '/guest-management',
			sectionHandle: 'customerStories',
			__typename: 'customerStories_default_Entry',
			thumbnail: [
				{
					url: '/img/home/management-card.png',
					width: 6000,
					height: 4000,
					alt: null,
					srcset: '/img/home/management-card.png',
					kind: 'image',
					hasFocalPoint: false,
					focalPoint: [0.5, 0.5]
				}
			],
			logo: [],
			displayTitle: 'Event <br />management'
		}
	];
</script>

<section class="mt-40 mx-60">
	<BannerSlider items={cardEntries} viewAllButton={null}>
		<svelte:fragment slot="item" let:item>
			<CardWhatWeDo url={item.url} title={item.displayTitle} image={item.thumbnail[0]} />
		</svelte:fragment>
	</BannerSlider>
</section>
