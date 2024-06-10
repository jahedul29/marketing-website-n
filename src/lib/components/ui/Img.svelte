<script lang="ts">
	export let src: Maybe<string>;
	export let srcset: Maybe<string> = null;
	export let alt: Maybe<string> = null;
</script>

<img srcset={srcset || null} src={!srcset ? src : null} alt={alt || ''} {...$$restProps} />
