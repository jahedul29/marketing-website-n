# Shares

This is a set of independent and flexible shares component that, put together, provide a good
default for social shares.

If all components are used together, a native share button will be shown on mobile and share links
on desktop. If native shares aren't supported, the button will be removed and the share links will
be displayed in stead.

## Shares.svelte

This is the component that you should wrap the others with if you want the full behavior described
above.

## SharesButton.svelte

A native share button, very useful on mobile. If native shares are not supported, the button is
removed. The button container `div` is also hidden on desktop.

### Props

-   class (`string`): Optional button classes.

### Slots

**Default**

The default slot.

## SharesList.svelte

This component is used to output a shares links list. If used together with `ShareButton.svelte`
inside `Shares.svelte`, it will only be displayed on desktop, unless native shares are not
supported, in which case it will serve as a fallback to the native share button.

### Props

-   orientation (`'horizontal' | 'vertical'`): The orientation of the list. Default: `'horizontal'`.
-   gap: (`TW.Spacing`): The spacing between each links.
-   shares (`SvelteComponent[]`): An array of shares component to be included in the list.
-   classShares (`string`): Optional shares classes. Forwarded to shares components.
-   iconWidth (`TW.Width`): The width of the icon. Forwarded to shares components. Default:
    `1.6rem`.
-   messageDelay (`number`): The delay in ms before the message disappears. Forwarded to shares
    components. Default: `10000`.

### Slots

**message**

The `CopyOnClick.svelte` forwarded message slot.

Slot Props:

-   `readonly` message (`string`): The default message.

## CopyOnClick.svelte

A copy-on-click button that displays a message when the url is successfully copied. It can be used
in a standalone fashion or passed to `SharesList.svelte`. If the `clipboard` API is not supported,
the button will be removed.

NOTE: The message `<slot />` is mounted and unmounted from the DOM, which mean you can use svelte
transitions inside it.

### Props

-   url (`string`): The url to copy. Default: the current page's url.
-   icon: (`SvelteComponent`): An svg icon component to display. Default: `svg/CopyUrl.svelte`.
-   iconWidth (`TW.Width`): The width of the icon. Default: `1.6rem`.
-   messageDelay (`number`): The delay in ms before the message disappears. Default: `10000`.
-   class (`string`): Optional classes. Note that the classes will be applied to a `<span />`
    element inside the button. This allows for more consistency with the other share components,
    which are link elements.

### Slots

**Default**

The default slot.

Slot Props:

-   `readonly` label (`string`): The default screen-reader label.
-   `readonly` icon (`SvelteComponent`): The default icon.

**message**

The message slot.

Slot Props:

-   `readonly` message (`string`): The default message.

## TwitterShare.svelte, FacebookShare.svelte and MailShare.svelte

These components are share links that can be used in a standalone fashion or passed to
`SharesList.svelte`. They all have the same properties, the only difference is the platform they
support.

### Props

-   url (`string`): The url to share. Default: the current page's url.
-   icon: (`SvelteComponent`): An svg icon component to display. Default: `svg/[platform].svelte`.
-   iconWidth (`TW.Width`): The width of the icon. Default: `1.6rem`.
-   class (`string`): Optional link classes.

### Slots

**Default**

The default slot.

Slot Props:

-   `readonly` label (`string`): The default screen-reader label.
-   `readonly` icon (`SvelteComponent`): The default icon.

## Example usage

```svelte
<Shares>
	<SharesButton>
		<ButtonPrimaryInner>Share this article</ButtonPrimaryInner>
	</SharesButton>
	<SharesList
		orientation="horizontal"
		gap="20|32"
		shares={[FacebookShare, TwitterShare, MailShare, CopyOnClick]}
		classShares="rounded-full w-32 h-32 border-1 border-black"
	>
		<p
			transition:fly={{ easing: expoOut, y: 30, duration: 500 }}
			slot="message"
			let:message
			class="bg-black p-12 text-16 text-white"
		>
			{message}
		</p>
	</SharesList>
</Shares>
```
