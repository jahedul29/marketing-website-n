<script lang="ts">
	import { draw, fly } from 'svelte/transition';
	import { expoOut, sineOut } from 'svelte/easing';
	import { scroll } from '$lib/stores/window/scroll';
	import { t } from '$lib/translations/global';

	let small = false;

	scroll.subscribe((e) => {
		if (!e) {
			return;
		}
		small = window.scrollY > window.innerHeight / 4;
	});
</script>

<a
	class="_intro-header grid h-32 w-100 self-stretch grid-stack bp:transition-[width] bp:duration-500 bp:ease-out-expo {small
		? 'bp:w-32'
		: 'bp:w-120'}"
	href="/"
>
	{#if small}
		<div out:fly|local={{ duration: 500, easing: expoOut, y: 16 }}>
			<svg
				class="h-full w-auto"
				width="35"
				height="38"
				viewBox="0 0 35 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					in:draw|local={{ speed: 2, easing: sineOut, duration: 500 }}
					d="M1 17.9529C8.39342 14.935 9.55315 0.382184 15.5032 2.14807C24.5016 5.88877 -2.9047 31.5264 7.69377 35.1522C15.5032 37.4764 16.3399 9.77163 26.5665 9.77163C34.7478 9.77163 37.8157 26.5061 19.2219 29.0162"
					stroke="currentColor"
					stroke-width="3.71876"
				/>
			</svg>
		</div>
	{:else}
		<img
			out:fly|local={{ duration: 500, easing: expoOut, y: -16 }}
			in:fly|local={{ duration: 500, easing: expoOut, y: -16 }}
			class="h-full"
			src="/img/logo.svg"
			alt=""
		/>
	{/if}
	<span class="sr-only">{t('home')}</span>
</a>
