<script lang="ts">
	import type { Modules_ImageMarquee_Entry } from 'src/craft';
	import Marquee from '$com/ui/Marquee.svelte';
	import Image from '$com/ui/Image.svelte';
	import { randomIndexGenerator } from '$lib/utils/ui/randomIndexGenerator';

	export let entry: Modules_ImageMarquee_Entry;

	const { images } = entry || {};

	const getRandomIndex = randomIndexGenerator(images?.length);
</script>

{#if images?.length}
	<section class="space-y-40">
		{#each new Array(2) as _, i}
			<Marquee gap="20|32" direction={i === 0 ? 'inverted' : 'natural'} speed={60000}>
				<div class="flex space-x-20 bp:space-x-32">
					{#each images as image}
						{#if image}
							<div
								class="_scroll-fade-in aspect-[17/20] w-[70vw] flex-shrink-0 bp:w-300"
								style="--i: {getRandomIndex()};"
							>
								<Image
									class="h-full w-full rounded-20 bg-grey-100 object-cover"
									{image}
									sizes={[{ width: '30rem' }]}
								/>
							</div>
						{/if}
					{/each}
				</div>
			</Marquee>
		{/each}
	</section>
{/if}
