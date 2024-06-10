<script lang="ts">
	import { fade } from 'svelte/transition';
	import { t } from '$lib/translations/global';
	import Modal from '$com/ui/modal/Modal.svelte';
	import ModalButton from '$com/ui/modal/ModalButton.svelte';
	import PlayButton from '$com/ui/PlayButton.svelte';
	import Burger from '$com/site/header/Burger.svelte';
	import EmbedSelector from '$com/ui/video-embed/EmbedSelector.svelte';
	import ModalOverlay from '$com/ui/modal/ModalOverlay.svelte';

	export let id: string;
	export let label = t('media.play');
	export let embedVideoUrl: string;
	export let transparent = false;
</script>

<Modal {id} unmount>
	<ModalButton class="group relative h-full w-full">
		<PlayButton {label} {transparent} />
	</ModalButton>
	<svelte:fragment slot="content">
		<div
			transition:fade={{ duration: 200 }}
			class="fixed left-0 top-0 z-[200] flex h-full w-full items-center justify-center p-20"
		>
			<ModalOverlay class="absolute inset-0 bg-black-900-alpha" />
			<ModalButton class="absolute right-20 top-20 z-10 text-white">
				<span class="sr-only">
					{t('close')}
				</span>
				<Burger open />
			</ModalButton>
			<div
				class="relative mx-auto aspect-[16/9] w-full max-w-max rounded-20 bg-white p-8 shadow-100 bp:h-full bp:rounded-40 bp:p-20"
			>
				<div class="relative h-full w-full">
					<EmbedSelector url={embedVideoUrl} let:EmbedComponent>
						<svelte:component
							this={EmbedComponent}
							url={embedVideoUrl}
							autoplay
							muted={false}
						/>
					</EmbedSelector>
				</div>
			</div>
		</div>
	</svelte:fragment>
</Modal>
