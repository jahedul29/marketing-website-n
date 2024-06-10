<script lang="ts">
	import type { PageData } from './$types';
	import DefaultRythm from '$com/rythms/DefaultRythm.svelte';
	import HeaderSimple from '$com/headers/HeaderSimple.svelte';
	import ContactFormSection from '$com/contact/ContactFormSection.svelte';
	import Offices from '$com/contact/Offices.svelte';

	export let data: PageData;

	const { entry } = data || {};
	const { surtitle, displayTitle, plainText, sideCtas, offices, privacyPolicyText } = entry || {};
</script>

<DefaultRythm>
	<div class="space-y-60 bp:space-y-80">
		<HeaderSimple {surtitle} {displayTitle} {plainText} />
		<ContactFormSection {sideCtas} text={privacyPolicyText} />
	</div>
	<Offices {offices} />
</DefaultRythm>
