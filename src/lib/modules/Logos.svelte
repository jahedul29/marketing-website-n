<script lang="ts">
	import type { Modules_Logos_Entry } from 'src/craft';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import Image from '$com/ui/Image.svelte';
	import Marquee from '$com/ui/Marquee.svelte';

	export let entry: Modules_Logos_Entry;

	const { displayTitle, surtitle, plainText, logos } = entry || {};
</script>

<ModuleBase width="screen">
	<div class="mx-auto max-w-max space-y-40 bp:space-y-60 bp:px-120">
		<div class="px-20">
			<ModuleHeading {surtitle} title={displayTitle} text={plainText} />
		</div>
		{#if logos?.length}
			<div class="space-y-16 bp:hidden">
				{#each new Array(2) as _, i}
					<Marquee speed={70000} gap="20" direction={i === 0 ? 'inverted' : 'natural'}>
						<div class="flex space-x-20">
							{#each logos as logo}
								{#if logo}
									<div
										class="flex h-100 w-100 items-center justify-center rounded-12 border-1 border-grey-250 px-12"
									>
										<Image
											class="w-full"
											image={logo}
											sizes={[{ width: '10rem' }]}
										/>
									</div>
								{/if}
							{/each}
						</div>
					</Marquee>
				{/each}
			</div>
			<div class="hidden grid-cols-5 gap-32 bp:grid">
				{#each logos as logo}
					{#if logo}
						<div
							class="_scroll-fade-in aspect-1 flex items-center justify-center rounded-20 border-1 border-grey-250 px-20"
						>
							<Image class="w-full" image={logo} />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</ModuleBase>
