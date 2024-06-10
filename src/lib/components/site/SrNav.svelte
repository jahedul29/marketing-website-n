<script lang="ts">
	import { t } from '$lib/translations/global';

	const linkClass =
		'sr-only font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-0 focus-visible:left-0 focus-visible:z-[300] focus-visible:m-12 focus-visible:rounded-20 focus-visible:bg-white focus-visible:p-8';
</script>

<a href="#navigation" class={linkClass}>
	{t('srNav.skipToNav')}
</a>
<a href="#content" class={linkClass}>
	{t('srNav.skipToContent')}
</a>
