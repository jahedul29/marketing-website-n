<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { t } from '$lib/translations/global';
	import {
		Shares,
		SharesButton,
		SharesList,
		CopyOnClick,
		FacebookShare,
		TwitterShare
	} from '$com/ui/shares';
	import ButtonPrimaryInner from '$com/buttons/ButtonPrimaryInner.svelte';

	export let dark = false;
</script>

<Shares>
	<SharesButton class="_primary">
		<ButtonPrimaryInner color={dark ? 'white' : 'black'} type={dark ? 'outlined' : 'filled'}>
			{t('socialShares.share')}
		</ButtonPrimaryInner>
	</SharesButton>
	<SharesList
		gap="16"
		shares={[FacebookShare, TwitterShare, CopyOnClick]}
		classShares="flex h-32 w-32 items-center justify-center rounded-full border-2 border-grey-900 transition-colors hover:bg-grey-900 hover:text-white"
	>
		<p
			transition:fly={{ easing: expoOut, y: 20, duration: 300 }}
			slot="message"
			let:message
			class="text-100 absolute bottom-full left-1/2 mb-12 -translate-x-1/2 whitespace-nowrap rounded-8 bg-greentea-500 px-12 py-8 font-medium leading-10 shadow-700"
		>
			{message}
		</p>
	</SharesList>
</Shares>
