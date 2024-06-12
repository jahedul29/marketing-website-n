<script lang="ts">
	import type { Responsive } from '$lib/tailwind/units';
	import { tailwindify } from '$lib/tailwind/tailwind';

	export let surtitle: Maybe<string> | undefined = null;
	export let title: Maybe<string> | undefined = null;
	export let text: Maybe<string> | undefined = null;
	export let textAlign: Responsive<'left' | 'center'> = 'center';
	export let maxWidth: string = '660';

	const alignClasses = () => {
		const textClass = tailwindify('text', textAlign);
		const marginClass = textAlign
			.split('|')
			.map((style, i) => {
				if (style === 'left' && i === 0) {
					return '';
				}
				if (style === 'left' && i === 1) {
					return 'bp:mx-0 bp:items-start';
				}
				if (style === 'center' && i === 0) {
					return 'mx-auto items-center';
				}
				if (style === 'center' && i === 1) {
					return 'bp:mx-auto bp:items-center';
				}
			})
			.join(' ');
		return `${textClass} ${marginClass}`;
	};
</script>

<div class="flex flex-col bp:max-w-{maxWidth} {alignClasses()}">
	<slot name="surtitle">
		{#if surtitle}
			<p class="mb-12 text-16 font-medium leading-10 text-blue-500">{surtitle}</p>
		{/if}
	</slot>
	{#if title}
		<h2 class="text-700 font-medium leading-10">{title}</h2>
	{/if}
	{#if text}
		<p class="text-300 mt-24 leading-30 opacity-70">{text}</p>
	{/if}
</div>
