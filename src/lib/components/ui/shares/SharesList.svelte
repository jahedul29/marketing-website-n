<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getSharesContext } from './Shares.svelte';
	import { tailwindify } from '$lib/tailwind/tailwind';

	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export let gap: TW.Spacing | string = '0';
	export let shares: (typeof SvelteComponent)[] = [];
	export let classShares = '';
	export let iconWidth: TW.Width | string = '16';
	export let messageDelay = 10000;

	const sharesApi = getSharesContext();

	const gapClass = tailwindify('gap', gap);

	let nativeSharesSupported = true;

	sharesApi?.nativeSharesSupported?.subscribe((sharesSupported) => {
		nativeSharesSupported = sharesSupported;
	});
</script>

<ul
	class="{sharesApi && nativeSharesSupported ? 'hidden bp:flex' : 'flex'} {gapClass}"
	class:flex-col={orientation === 'vertical'}
>
	{#each shares as share}
		<li class="flex">
			<svelte:component this={share} class={classShares} {iconWidth} {messageDelay}>
				<svelte:fragment slot="message" let:message>
					<slot name="message" {message} />
				</svelte:fragment>
			</svelte:component>
		</li>
	{/each}
</ul>
