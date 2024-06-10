# Youtube embed

A lite Youtube & Vimeo embed implementation based on Paul Irish's `<lite-youtube>` web component
(https://github.com/paulirish/lite-youtube-embed).

Builds an iframe from a Youtube or Vimeo URL along with customizable play button slot.

**Main component:** `VideoEmbed.svelte`

## Props

-   `url` (string): A Youtube or Vimeo video url. REQUIRED
-   `title` (string): The iframe title attribute.
-   `poster`: (Craft asset): A Craft asset to be used as poster image.
-   `posterUrl` (string): The url of the poster image. Uses the `poster` url if not provided.
    DEFAULT: The video's generated Youtube poster.
-   `posterAlt` (string): The alt of the poster image. Uses the `poster` alt if not provided.
-   `playLabel` (string): The label of the play button for assistive technologies. DEFAULT:
    `'Play'`.
-   `playing` (boolean): Wether the video is playing or not. DEFAULT: false.
-   `preconnect` (boolean): Wether the embed urls are preconnected. DEFAULT: false.
-   `autoplay` (boolean): Optional. Determines whether or not the iframe is immediately loaded,
    whitout showing the poster / play button. `autoplay` is automatically added as `true` to the
    embed parameters to prevent users from clicking twice to the play the video. DEFAULT: `false`.
-   `loop` (boolean): An optional prop to loop back to start when the video is finished playing.
    DEFAULT: `false`.
-   `muted` (boolean): Optional. Video is muted on start when true. DEFAULT: `true`.
-   `start` (number): Optional. Specifies the time the video should start at (in seconds).
-   `options` (object): An object containing any Youtube or Vimeo embed parameters available. See
    available [Youtube](https://developers.google.com/youtube/player_parameters#Parameters) or
    [Vimeo](https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Player-parameters-overview#h_01FNYA7QTNCMWXY3GV2RF8QP5A)
    params.
-   `ratio` (`AspectRatio`): The aspect ratio of the video. Default: `'16:9'`.
-   `hoverColor` (`Color`): The hover color of the play icon. You can disable the hover style
    altogether by passing `null`. Default: `'[#FF0000]'` (Youtube red).

## Slots

### Poster

Renders the poster image.

Name: "poster"

Slot props:

-   `posterSrc` (`string`): The src of the poster.
-   `posterAlt` (`string`): The alt of the poster.

### Play Icon

Renders the play icon.

Name: "playicon"

NOTE: The button element that contains the play icon has a 'group' class that you can use to apply
some hover/focus/active/etc. states to the icon itself.

## Example usage

```svelte
<VideoEmbed
	url="https://www.youtube.com/watch?v=qSfdtmcZ4d0"
	poster={img}
	autoplay="false"
	muted="true"
	loop="false"
	start="75"
	options={{ modestbranding: true, cc_load_policy: false }}
	let:playLabel
>
	<div slot="playbutton">
		<span>{playLabel}</span>
	</div>
</VideoEmbed>
```
