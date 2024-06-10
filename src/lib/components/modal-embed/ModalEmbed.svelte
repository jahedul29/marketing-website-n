<script lang="ts">
	import type { ModalEmbed_ModalEmbed_BlockType } from 'src/craft';
	import { forceExecuteScript } from '$lib/actions/forceExecuteScript';
	import { t } from '$lib/translations/global';
	import { fade } from 'svelte/transition';
	import Burger from '$com/site/header/Burger.svelte';
	import Image from '$com/ui/Image.svelte';
	import RichText from '$com/ui/RichText.svelte';
	import { Modal, ModalButton } from '$com/ui/modal';
	import HeaderLogos from '$com/ui/HeaderLogos.svelte';

	export let modalEmbed: Maybe<ModalEmbed_ModalEmbed_BlockType> = null;
	export let buttonClasses = '_primary';

	const { id, text, logosTitle, logos, embedCode, embedSubtitle, bgWhite } = modalEmbed || {};
	const image = modalEmbed?.backgroundImage?.[0];
</script>

{#if id}
	<Modal {id} unmount>
		<ModalButton class={buttonClasses}>
			<slot />
		</ModalButton>
		<svelte:fragment slot="content">
			<div
				transition:fade={{ duration: 200 }}
				class="fixed left-0 top-0 z-[200] h-full w-full overflow-y-auto px-20 py-40 {bgWhite
					? 'bg-white'
					: 'bg-grey-900'}"
			>
				<ModalButton
					class="absolute right-20 top-20 h-32 w-32 {bgWhite
						? 'text-black'
						: 'text-white-750-alpha'}"
				>
					<span class="sr-only">
						{t('close')}
					</span>
					<span class="flex items-center justify-center">
						<Burger open />
					</span>
				</ModalButton>
				{#if image}
					<Image
						{image}
						class="absolute right-0 top-0 -z-1"
						sizes={[{ width: '10rem' }]}
					/>
				{/if}
				<div
					class="flex h-full w-full flex-col gap-60 bp:flex-row bp:items-center bp:justify-between bp:gap-120 bp:px-120 bp:pt-0"
				>
					{#if text || logos?.length}
						<div
							class="{bgWhite
								? 'text-black'
								: 'text-white-750-alpha'} width-full flex flex-col bp:flex bp:w-1/2"
						>
							{#if text}
								<RichText {text} type="block-embed" />
							{/if}
							{#if logos?.length}
								<div class="mt-80 bp:max-w-700">
									<HeaderLogos {logosTitle} {logos} />
								</div>
							{/if}
						</div>
					{/if}
					{#if embedCode}
						<div class="flex w-full flex-col justify-center space-y-20 bp:w-1/2">
							{#if embedSubtitle}
								<p class="pb-40 text-center text-20 bp:pb-0">
									{embedSubtitle}
								</p>
							{/if}
							<div use:forceExecuteScript>
								{@html embedCode}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</svelte:fragment>
	</Modal>
{/if}
