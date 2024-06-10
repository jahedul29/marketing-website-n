# Medias

A set of helper components to display images and videos.

## Image.svelte

Props:

-   `image` (Craft asset): The image data provided by Craft. REQUIRED.
-   `sizes` (`{width: string, mq?: string}[]`): An array of of sizes to be rendered in the image's
    `size` html attribute. DEFAULT: `[{ width: '100vw' }]`.
-   `lazy` (boolean): If true, a `loading="lazy"` attribute will be added on the image. DEFAULT:
    true.
-   `class` (string): Optional image classes.

## Video.svelte

-   `video` (Craft asset): The video data provided by Craft. REQUIRED.
-   `poster`: (Craft asset): A Craft asset to be used as poster image.
-   `posterUrl` (string): The url of the poster image. Uses the `poster` url if not provided.
-   `autoplay` (boolean): Optional. Determines whether or not the video is immediately loaded and
    played, whitout showing the poster / play button. DEFAULT: `false`.
-   `loop` (boolean): An optional prop to loop back to start when the video is finished playing.
    DEFAULT: `false`.
-   `muted` (boolean): Optional. Video is muted on start when true. DEFAULT: `true`.
-   `controls` (boolean): Optional. If true, shows default controls allowing the user to control
    video playback. DEFAULT: `true`.
-   `playsinline` (boolean): Optional. Controls the `playsinline` video attribute. Default:
    `autoplay`.
-   `disableremoteplayback` (boolean): Optional. Controls the `disableremoteplayback` attribute.
    Default `true`.
-   `class` (string): Optional container classes.

## Media.svelte

Renders an image or video based on the `kind` property provided by Craft.

Common props:

-   `media` (Craft asset): The media data provided by Craft. REQUIRED.
-   `class` (string): Optional classes added to both the image and video.

Image props:

-   `sizes` (`{width: string, mq?: string}[]`): An array of of sizes to be rendered in the image's
    `size` html attribute. DEFAULT: `[{ width: '100vw' }]`. Video props:
-   `lazy` (boolean): If true, a `loading="lazy"` attribute will be added on the image. DEFAULT:
    true.
-   `classImg` (string): Optional classes added to the image.

Video props:

-   `poster`: (Craft asset): A Craft asset to be used as poster image.
-   `posterUrl` (string): The url of the poster image. Uses the `poster` url if not provided.
-   `autoplay` (boolean): Optional. Determines whether or not the video is immediately loaded and
    played, whitout showing the poster / play button. DEFAULT: `false`.
-   `loop` (boolean): An optional prop to loop back to start when the video is finished playing.
    DEFAULT: `false`.
-   `muted` (boolean): Optional. Video is muted on start when true. DEFAULT: `true`.
-   `controls` (boolean): Optional. If true, shows default controls allowing the user to control
    video playback. DEFAULT: `true`.
-   `playsinline` (boolean): Optional. Controls the `playsinline` video attribute. Default:
    `autoplay`.
-   `disableremoteplayback` (boolean): Optional. Controls the `disableremoteplayback` attribute.
    Default `true`.
-   `classVideo` (string): Optional classes added to the video.
