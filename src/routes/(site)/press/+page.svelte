<script lang="ts">
	import type { PageData } from './$types';
	import HeaderSimple from '$com/headers/HeaderSimple.svelte';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import MediaInquiries from '$com/press/MediaInquiries.svelte';
	import BrandKit from '$com/press/BrandKit.svelte';
	import References from '$com/press/References.svelte';

	export let data: PageData;

	const { entry } = data || {};
	const { surtitle, displayTitle, richText, assetKits, references, referencesTotal } =
		entry || {};
</script>

<DefaultRythm>
	<HeaderSimple {surtitle} {displayTitle} />
	<MediaInquiries text={richText} />
	<BrandKit {assetKits} />
	<References {references} itemsTotal={referencesTotal} />
</DefaultRythm>
