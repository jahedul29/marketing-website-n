<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/translations/global';
	import Pin from '$com/svg/Pin.svelte';

	const apiKey = $page.data.search?.searchApiKey;

	const mapsAutocomplete = (node: HTMLInputElement) => {
		if (!apiKey) {
			return;
		}
		const onLoad = () => {
			if (!window.google) {
				return;
			}
			new window.google.maps.places.Autocomplete(node);
		};
		const src = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=${apiKey}`;
		if (document.querySelector(`script[src="${src}"]`)) {
			return;
		}
		const script = document.createElement('script');
		script.src = src;
		script.defer = true;
		script.addEventListener('load', onLoad, { once: true });
		document.head.appendChild(script);
	};
</script>

<label
	class="flex items-center space-x-4 rounded-full py-4 pl-4 transition-colors duration-300 ease-linear focus-within:bg-grey-250 focus-within:duration-[50ms]"
>
	<span class="w-16 text-black-750-alpha" aria-hidden="true">
		<Pin />
	</span>
	<span class="sr-only">
		{t('search.city')}
	</span>
	<input
		class="text-100 appearance-none bg-transparent leading-10 focus:outline-none"
		name="city"
		type="text"
		placeholder={t('search.cityPlaceholder')}
		autocomplete="off"
		use:mapsAutocomplete
	/>
</label>
