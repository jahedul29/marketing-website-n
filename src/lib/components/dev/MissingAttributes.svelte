<!--#if dev-->
<script lang="ts">
	import Frame from '$lib/components/ui/Frame.svelte';

	export let component: string;
	export let attributes: string | string[];

	const renderMessage = () => {
		if (Array.isArray(attributes)) {
			attributes = attributes.join(', ');
		}
		const hasMany = attributes.length > 1;
		return `<code>${component}</code> is missing required attribute${
			hasMany ? 's' : ''
		} <code>${attributes}</code>`;
	};
</script>

<Frame background="[red]">
	{@html renderMessage()}
</Frame>
<!--/if-->
