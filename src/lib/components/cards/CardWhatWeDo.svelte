<script lang="ts">
	import HtmlLink from '$com/buttons/HtmlLink.svelte';
	import Image from '$com/ui/Image.svelte';
	export let url: string;
	export let title: string;
	export let image;
</script>

<HtmlLink href={url}>
	<div class="rounded-20 bg-white hover:bg-grey-50 p-20 shadow-lg sm:p-40 lg:p-20">
		<h1 class="mb-5 text-20 text-center bp:text-20">
			{@html title}
		</h1>
		<div class="flex items-center justify-center pt-20">
			<Image {image} />
		</div>
	</div>
</HtmlLink>
