<script lang="ts">
	import type { Quotes_Quote_BlockType } from 'src/craft';
	import { SIZES_CARD } from '$lib/utils/ui/imageSizes';
	import PaginationInner from '$com/buttons/PaginationInner.svelte';
	import Quote from '$com/testimonials/Quote.svelte';
	import Prev from '$com/svg/Prev.svelte';
	import Next from '$com/svg/Next.svelte';
	import DefaultVideo from '$com/ui/DefaultVideo.svelte';
	import Image from '$com/ui/Image.svelte';
	import ButtonPrimary from '$com/buttons/ButtonPrimary.svelte';

	type Direction = 'next' | 'prev';

	export let quotes: Maybe<Quotes_Quote_BlockType>[];

	const first = 0;
	const last = quotes.length - 1;

	let active = 0;
	let nextActive = 0;
	let direction: Direction = 'next';

	const setActive = (index: number) => {
		nextActive = index;
		setTimeout(() => {
			active = index;
		}, 0);
	};

	const onPrev = () => {
		direction = 'prev';
		const newIndex = active - 1;
		setActive(newIndex < first ? last : newIndex);
	};

	const onNext = () => {
		direction = 'next';
		const newIndex = active + 1;
		setActive(newIndex > last ? first : newIndex);
	};
</script>

{#if quotes?.length}
	<div class="flex flex-col items-end space-y-20 bp:flex-row bp:space-x-48 bp:space-y-0">
		<div
			class="flex flex-col items-start space-y-20 bp:flex-row bp:items-stretch bp:space-x-48 bp:space-y-0"
		>
			<div class="grid grid-stack">
				{#each quotes as quote, i}
					{@const isActive = i === active}
					{@const media = quote?.media?.[0]}
					{@const logo = quote?.logo?.[0]}
					{@const poster = quote?.poster?.[0]}
					<div
						class="_slide-show-medias aspect-1 w-full overflow-hidden rounded-16 bg-grey-250 bp:mb-0 bp:w-400 bp:flex-shrink-0"
						class:opacity-0={!isActive}
						class:pointer-events-none={!isActive}
					>
						{#if media?.kind === 'video'}
							<DefaultVideo {media} {poster} />
						{:else if !media || media?.kind === 'image'}
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
						{@const isActive = i === active}
						{@const isNextActive = i === nextActive}
						<li class="flex" class:pointer-events-none={!isActive}>
							<div class="space-y-20 bp:flex bp:space-x-48 bp:space-y-0">
								<div
									class:_enter-bottom={direction === 'next'}
									class:_exit-top={direction === 'next' &&
										!isNextActive &&
										!isActive}
									class:_enter-top={direction === 'prev'}
									class:_exit-bottom={direction === 'prev' &&
										!isNextActive &&
										!isActive}
									class:_active={isActive}
								>
									<Quote {quote} />
								</div>
							</div>
						</li>
					{/each}
				</ul>
				<div class="flex items-center justify-between">
					<div class="_slide-show-content grid overflow-hidden grid-stack">
						{#each quotes as quote, i}
							{@const isActive = i === active}
							{@const isNextActive = i === nextActive}
							{@const { source, role, button } = quote || {}}
							{#if source || role}
								<div
									class="flex flex-col items-start text-14 bp:text-20"
									class:_enter-bottom={direction === 'next'}
									class:_exit-top={direction === 'next' &&
										!isNextActive &&
										!isActive}
									class:_enter-top={direction === 'prev'}
									class:_exit-bottom={direction === 'prev' &&
										!isNextActive &&
										!isActive}
									class:_active={isActive}
								>
									{#if source}
										<span class="font-medium">&mdash; {source}</span>
									{/if}
									{#if role}
										<span class="text-black-750-alpha">{role}</span>
									{/if}
									{#if button}
										<div class="mt-32 flex space-x-16">
											<ButtonPrimary {button} color={'black'} size="lg" />
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
					{#if quotes.length > 1}
						<div class="flex items-center space-x-12" aria-hidden="true">
							<button class="bp:-rotate-90" on:click={onPrev} tabindex="-1">
								<PaginationInner>
									<Prev />
								</PaginationInner>
							</button>
							<button class="bp:-rotate-90" on:click={onNext} tabindex="-1">
								<PaginationInner>
									<Next />
								</PaginationInner>
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	._slide-show-medias {
		transition: opacity 700ms cubic-bezier(0.65, 0, 0.35, 1);
	}

	._slide-show-content {
		--ease: cubic-bezier(0.65, 0, 0.35, 1);
		--transition: transform 700ms var(--ease), opacity 700ms var(--ease);
	}

	._enter-top {
		transform: translateX(-100%);
		opacity: 0;

		@screen bp {
			transform: translateY(-100%);
		}
	}

	._enter-bottom {
		transform: translateX(100%);
		opacity: 0;

		@screen bp {
			transform: translateY(100%);
		}
	}

	._exit-top,
	._exit-bottom {
		transition: var(--transition);
		opacity: 0;
	}

	._exit-top {
		transform: translateX(-100%);

		@screen bp {
			transform: translateY(-100%);
		}
	}

	._exit-bottom {
		transform: translateX(100%);

		@screen bp {
			transform: translateY(100%);
		}
	}

	._active {
		transition: var(--transition);
		transform: none;
		opacity: 1;
	}
</style>
