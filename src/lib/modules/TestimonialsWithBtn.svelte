<script lang="ts">
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';
	import ModuleBase from '$com/modules/ModuleBase.svelte';
	import ModuleHeading from '$com/modules/ModuleHeading.svelte';
	import Quote from '$com/testimonials/Quote.svelte';
	import Image from '$com/ui/Image.svelte';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';

	export let entry;

	const { displayTitle, quotes } = entry || {};
</script>

<ModuleBase>
	<div class="space-y-32 bp:mx-auto bp:max-w-1120 bp:space-y-60">
		<ModuleHeading title={displayTitle} maxWidth="750" />

		{#if quotes?.length}
			<div class="flex flex-col items-end space-y-20 bp:flex-row bp:space-x-48 bp:space-y-0">
				<div
					class="flex flex-col items-start space-y-20 bp:flex-row bp:items-stretch bp:space-x-48 bp:space-y-0"
				>
					<div class="grid grid-stack">
						{#each quotes as quote, i}
							{@const media = quote?.media?.[0]}
							{@const logo = quote?.logo?.[0]}
							<div
								class=" aspect-1 w-full overflow-hidden rounded-16 bg-grey-250 bp:mb-0 bp:w-400 bp:flex-shrink-0"
							>
								{#if !media || media?.kind === 'image'}
									<div class="grid h-full w-full grid-stack">
										{#if media}
											<Image
												class="h-full w-full object-cover object-top"
												image={media}
												sizes={SIZES_CARD}
											/>
										{:else}
											<img
												src="/img/quote-placeholder.svg"
												alt=""
												class="h-full w-full object-cover"
											/>
										{/if}
										{#if logo}
											<div class="self-end justify-self-start p-12">
												<div class="max-w-140 rounded-12 bg-grey-900 p-16">
													<Image image={logo} />
												</div>
											</div>
										{/if}
									</div>
								{/if}
							</div>
						{/each}
					</div>
					<div class="flex flex-col justify-between space-y-20">
						<ul class="_slide-show-content grid overflow-hidden grid-stack">
							{#each quotes as quote, i}
								<li class="flex">
									<div class="space-y-20 bp:flex bp:space-x-48 bp:space-y-0">
										<Quote {quote} />
									</div>
								</li>
							{/each}
						</ul>
						<div class="flex items-center justify-between">
							<div class="_slide-show-content grid overflow-hidden grid-stack">
								{#each quotes as quote, i}
									{@const { source, role, button } = quote || {}}
									{#if source || role}
										<div class="flex flex-col items-start text-14 bp:text-20">
											{#if source}
												<span class="font-medium">&mdash; {source}</span>
											{/if}
											{#if role}
												<span class="text-black-750-alpha">{role}</span>
											{/if}
											{#if button}
												<div class="mt-32 flex space-x-16">
													<ButtonPrimary
														{button}
														color={'black'}
														size="lg"
													/>
												</div>
											{/if}
										</div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</ModuleBase>
