# Youtube embed

A lite Youtube embed implementation based on Paul Irish's `<lite-youtube>` web component
(https://github.com/paulirish/lite-youtube-embed).

**Main component:** `YTEmbed.svelte`

## Props

-   `url` (string): A Youtube video url. REQUIRED
-   `title` (string): The iframe title attribute.
-   `poster`: (Craft asset): A Craft asset to be used as poster image.
-   `posterUrl` (string): The url of the poster image. Uses the `poster` url if provided. DEFAULT:
    The video's generated Youtube poster.
-   `posterAlt` (string): The alt of the poster image. Uses the `poster` alt if provided.
-   `playLabel` (string): The label of the play button for assistive technologies. DEFAULT: `Play`.
-   `params` (object): An object containing any Youtube embed parameters available
    (https://developers.google.com/youtube/player_parameters#Parameters). `autoplay` is
    automatically enabled.
-   `class` (string): Optional container classes.
-   `classPlayBtn` (string): Optional play button classes.

## Slots

### Play Button

Renders content inside the drawer's trigger button.

Name: "playbutton"

Slot props:

-   readonly `playLabel` (string): The label of the play button for assistive technologies. DEFAULT:
    `Play`.

## Example usage

```html
<YTEmbed url="https://www.youtube.com/watch?v=qSfdtmcZ4d0" title="Rich Harris conference"
playLabel="Listen to Rich Harris" params={{ start: 10, modestbranding: '1' }} />
```
