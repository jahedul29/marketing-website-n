<script lang="ts">
	import { t } from '$lib/translations/global';
	import ArticleShares from './ArticleShares.svelte';

	export let type: 'article' | 'resource' = 'article';

	const title = type === 'article' ? t('articles.shareArticle') : t('articles.shareResource');
</script>

<aside
	class="flex flex-col items-center space-y-20 border-t-1 border-grey-100 pt-40 text-center bp:flex-row bp:justify-between bp:space-y-0 bp:pt-48"
>
	<h2 class="text-20 font-medium leading-10">{title}</h2>
	<ArticleShares />
</aside>
